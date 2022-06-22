import {
	disableEditingForAllArtists,
	getProductArtists,
} from "@controller/release-delivery/artists"
import {
	addContributorsToAsset,
	deleteAllContributorsForAsset,
} from "@controller/release-delivery/contributors"
import { manageProductGenres } from "@controller/release-delivery/genres"
import { getFugaLabelId } from "@controller/release-delivery/labels"
import {
	mapPostReleaseSoundtrackToDB,
	mapPostReleaseToDB,
} from "@controller/release-delivery/mapRelease"
import { getReleaseFormatType } from "@controller/release-delivery/releaseFormatType"
import {
	formatDate,
	getFilePath,
} from "@controller/release-delivery/submitRelease"
import {
	addPublisherToFugaAsset,
	deleteAllPublishersFromAsset,
} from "@controller/release-delivery/trackPublisher"
import { STORAGE_URL_PREFIX } from "@lib/assets/constants"
import { deleteAssetInBuckets } from "@lib/assets/deleteAsset"
import { handleAssetProcessing } from "@lib/assets/processing/handleAssetProcessing"
import {
	addAssetToProduct,
	deleteAsset,
	detachAssetFromProduct,
	uploadAsset,
} from "@lib/fuga/assets"
import { priceCategoryToFugaCatalogTier } from "@lib/fuga/catalogTier"
import { FugaError } from "@lib/fuga/fuga"
import {
	createOrUpdateFugaProduct,
	generateBarcodeForProduct,
	getFugaProduct,
} from "@lib/fuga/product"
import { reserveIsrcs } from "@lib/isrc/getIsrcs"
import { getNextRewaveId } from "@lib/rewaveId/rewaveId"
import { PostRelease } from "@models/api/PostRelease.model"
import Release from "@models/database/release"
import { IReleaseDocument } from "@models/database/release/IRelease"
import { IDBSoundtrack } from "@models/database/release/Soundtrack"
import { FEATURING_ARTIST, PRIMARY_ARTIST } from "@models/options/artistTypes"
import { unlinkSync } from "fs"

const FILE_URL_PREFIX = process.env.TEMP_ASSET_URL_PREFIX

export const isAssetUrlLocal = (url: string): boolean => {
	return url.substring(0, FILE_URL_PREFIX.length) === FILE_URL_PREFIX
}

const FILE_NAME_IDENTIFIER_LENGTH = 39

export const getFileNameIdentifierFromSignedStorageURL = (url: string) => {
	const urlObj = new URL(url)
	console.log("urlObj", urlObj)
	const fileName = urlObj.pathname.split("/").pop()
	return fileName.substring(0, FILE_NAME_IDENTIFIER_LENGTH)
}

export const getFileNameIdentifierFromStorageURL = (url: string) => {
	const prefix = STORAGE_URL_PREFIX
	if (url.substring(0, prefix.length) !== prefix) {
		console.log("url", url)
		throw new Error("Storage URL has invalid prefix")
	}
	const path = url.substring(prefix.length)
	return path.split("/").pop().substring(0, FILE_NAME_IDENTIFIER_LENGTH)
}

const handleCover = async (
	releaseDb: IReleaseDocument,
	assetUrl: string
): Promise<{ deletePaths: string[] }> => {
	console.log("assetUrl", assetUrl)
	if (isAssetUrlLocal(assetUrl)) {
		const { newAssetUrl: newCoverUrl, filesToDelete: coverToDeletePaths } =
			await handleAssetProcessing(assetUrl, "IMAGE")
		const oldAssetUrl = releaseDb.coverUrl
		console.log("oldAssetUrl", oldAssetUrl)
		releaseDb.coverUrl = newCoverUrl
		console.log("newCoverUrl", newCoverUrl)
		await releaseDb.save()
		try {
			await deleteAssetInBuckets(oldAssetUrl)
		} catch (e) {
			console.log("e", e)
		}
		return { deletePaths: coverToDeletePaths }
	} else {
		// Nothing to do. Asset is already uploaded to storage, archive and FUGA
		return { deletePaths: [] }
	}
}

export const submitDraftRelease = async (
	existingReleaseId: string,
	releaseInput: PostRelease,
	userId: string,
	skipFileUpload?: boolean
): Promise<{ releaseId: string }> => {
	const dbRelease = mapPostReleaseToDB(releaseInput, "PENDING", userId, true)

	const releaseDb = await Release.findOneById(existingReleaseId)
	const updateStatement = { ...dbRelease }
	console.log("updateStatement", updateStatement)
	delete updateStatement.coverUrl
	delete updateStatement.soundtracks
	await Release.updateOne({ _id: releaseDb._id }, { $set: updateStatement })
	releaseDb.isProcessing = true
	await releaseDb.save()
	
	// Will disable editing artists later at delivery to stores
	// await disableEditingForAllArtists(releaseDb)

	const deletePaths = []
	const { deletePaths: coverDeletePaths } = await handleCover(
		releaseDb,
		releaseInput.coverUrl
	)
	deletePaths.push(...coverDeletePaths)
	console.log("releaseDb.coverUrl", releaseDb.coverUrl)
	if (!releaseDb.rewaveId) {
		releaseDb.rewaveId = await getNextRewaveId(releaseDb.id)
	}

	// Bring the Label to FUGA
	const fugaLabelId = await getFugaLabelId(releaseInput.labelId)

	// CREATE FUGA PRODUCT
	let existingFugaProductId = null
	if (releaseDb.fugaProductId) {
		existingFugaProductId = releaseDb.fugaProductId
	}
	const { coverImageId, productId } = await createOrUpdateFugaProduct(
		{
			name: releaseInput.title,
			labelId: fugaLabelId,
			copyrightText: releaseInput.copyright.owner,
			copyrightYear: releaseInput.copyright.year,
			publishingRightsYear: releaseInput.publishingRights.year,
			publishingRightsText: releaseInput.publishingRights.owner,
			artists: await getProductArtists(releaseInput.artists), //Artists
			...(await manageProductGenres(
				releaseInput.genres.primaryGenre,
				releaseInput.genres.secondaryGenre
			)), // genres
			digitalReleaseDate: formatDate(releaseInput.releaseDates.digital), // yyyy-mm-dd
			originalReleaseDate: formatDate(releaseInput.releaseDates.original), // yyyy-mm-dd
			rewaveId: releaseDb.rewaveId,
			upc: releaseInput.upc === "auto" ? null : releaseInput.upc,
			language: releaseInput.language.code.toUpperCase(),
			explicit: releaseInput.explicitLyrics,
			catalogTier: priceCategoryToFugaCatalogTier(releaseInput.priceCategory),
			releaseFormatType: getReleaseFormatType(releaseInput.tracks),
		},
		existingFugaProductId
	)

	// Upload Cover
	if (isAssetUrlLocal(releaseInput.coverUrl)) {
		const coverPath = getFilePath(releaseInput.coverUrl)
		await uploadAsset(coverPath, coverImageId, "image")
		console.log("coverPath,coverImageId", coverPath, coverImageId)
	}

	// Automatic Barcode Generation
	if (releaseInput.upc === "auto") {
		try {
			const { newUpc } = await generateBarcodeForProduct(productId)
			releaseDb.upc = newUpc
		} catch (e) {
			console.log(`e`, e)
		}
	}

	// Create Assets: An Asset per Track
	const requiredIsrcsAmount = releaseInput.tracks.filter(
		(t) => t.isrc === "auto"
	).length

	const isrcs = await reserveIsrcs(
		requiredIsrcsAmount,
		releaseDb._id.toString()
	)

	let isrcCounter = 0

	const alreadyUploadedFileNames = releaseDb.soundtracks.reduce(
		(acc, curr) => (curr.fugaAssetId ? [...acc, curr.fileUrl] : acc),
		[]
	)

	// There are multiple scenarios
	// 1 - soundtrack is already deployed to FUGA: 	releaseInput.tracks[i].fileUrl: ASSETS; releaseDb.soundtracks[j].fileUrl: ASSETS
	// 2 - soundtrack is new:						releaseInput.tracks[i].fileUrl: LOCAL;	releaseDb.soundtracks[j] might exist
	// 3 - soundtrack is deleted					releaseInput.tracks[i] is REMOVED;		releaseDb.soundtracks[j].fileUrl: ASSETS
	// Attention: Order of releaseInput.tracks and releaseDb.soundtracks can be different!

	// Delete Removed tracks
	for (let i = 0; i < releaseDb.soundtracks.length; i++) {
		const soundtrack = releaseDb.soundtracks[i]
		// determine soundtrack in releaseInput by comparing File URLs
		const releaseInputSoundtrack = releaseInput.tracks.find(
			(st) =>
				getFileNameIdentifierFromSignedStorageURL(st.fileUrl) ===
				getFileNameIdentifierFromStorageURL(soundtrack.fileUrl)
		)
		if (!releaseInputSoundtrack) {
			try {
				// Detach asset from fuga product, delete asset and delete files in buckets
				await detachAssetFromProduct(
					releaseDb.fugaProductId,
					soundtrack.fugaAssetId
				)
				await deleteAsset(soundtrack.fugaAssetId)
				await deleteAssetInBuckets(soundtrack.fileUrl)
			} catch (e) {
				console.log("e", e)
				if (process.env.NODE_ENV === "development") {
					throw e
				}
			}
		}
	}

	const fugaProduct = await getFugaProduct(releaseDb.fugaProductId)
	const assetsIds = fugaProduct.assets.map((a) => a.id)
	for (let i = 0; i < assetsIds.length; i++) {
		try {
			await detachAssetFromProduct(releaseDb.fugaProductId, assetsIds[i])
		} catch (e) {
			if (
				e instanceof FugaError &&
				e.code === "PRODUCT_DOES_NOT_CONTAIN_ASSET"
			) {
				//ignore
			} else {
				throw e
			}
		}
	}

	// Go through each of the submitted soundtracks
	const newSoundtracksDb: IReleaseDocument["soundtracks"] = []
	for (let i = 0; i < releaseInput.tracks.length; i++) {
		const trackInput = releaseInput.tracks[i]
		const artists = trackInput.artists.filter(
			(a) => a.type === PRIMARY_ARTIST || a.type === FEATURING_ARTIST
		) // only primary and featuring
		const contributors = trackInput.artists.filter(
			(a) => !(a.type === PRIMARY_ARTIST || a.type === FEATURING_ARTIST)
		) // every other artist type (=contributors)

		// Creating NEW Soundtrack:
		if (isAssetUrlLocal(trackInput.fileUrl)) {
			console.log(i, "NEW Soundtrack trackInput.name", trackInput.title)
			// Get the db-compatible object for this soundtrack
			const newDbSoundtrack: IDBSoundtrack =
				mapPostReleaseSoundtrackToDB(trackInput)
			// If needed, take a ISRC code from the previously generated ones
			if (newDbSoundtrack.isrc === "auto") {
				newDbSoundtrack.isrc = isrcs[isrcCounter]
				isrcCounter++
			}

			const trackFugaLabelId = await getFugaLabelId(
				newDbSoundtrack.musicLabelId.toString()
			)

			const { assetId } = await addAssetToProduct({
				fugaProductId: productId,
				name: newDbSoundtrack.name,
				p_line_year: newDbSoundtrack.publishingRightsYear || null,
				p_line_text: newDbSoundtrack.publishingRightsBy || null,
				labelId: trackFugaLabelId,
				...(await manageProductGenres(
					newDbSoundtrack.primaryGenre,
					newDbSoundtrack.secondaryGenre
				)),
				isrc: newDbSoundtrack.isrc,
				explicit: newDbSoundtrack.explicit,
				artists: await getProductArtists(artists),
				language: newDbSoundtrack.language.code.toUpperCase(),
				metadataLanguage: newDbSoundtrack.metadataLanguage.code.toUpperCase(),
			})
			await addContributorsToAsset(assetId, contributors)
			const primaryArtist = trackInput.artists.find(
				(a) => a.type === PRIMARY_ARTIST
			)
			if (primaryArtist) {
				await addPublisherToFugaAsset(assetId, primaryArtist.id)
			} else {
				console.log("[WARNING] Track has no primary Artist")
			}
			// Upload audio file to FUGA
			await uploadAsset(getFilePath(newDbSoundtrack.fileUrl), assetId, "audio")
			const { newAssetUrl, filesToDelete } = await handleAssetProcessing(
				trackInput.fileUrl,
				"AUDIO"
			)
			deletePaths.push(...filesToDelete)
			console.log("assetId", assetId)
			newDbSoundtrack.fileUrl = newAssetUrl
			newDbSoundtrack.fugaAssetId = assetId

			newSoundtracksDb.push(newDbSoundtrack)
		}

		// Asset already exists at Fuga -> Soundtrack File stays the same but all metadata is updated
		else {
			console.log(i, "existing! Soundtrack trackInput.name", trackInput.title)
			// determine existing soundtrack in releaseDb by comparing File URLs
			const dbTrack = releaseDb.soundtracks.find(
				(st) =>
					getFileNameIdentifierFromSignedStorageURL(trackInput.fileUrl) ===
					getFileNameIdentifierFromStorageURL(st.fileUrl)
			)

			// Get the db-compatible object for this soundtrack
			const newDbSoundtrack: IDBSoundtrack =
				mapPostReleaseSoundtrackToDB(trackInput)

			console.log("dbTrack", dbTrack)
			// throw new Error('Not implemented!!!')

			// If needed, take a ISRC code from the previously generated ones
			if (newDbSoundtrack.isrc === "auto") {
				newDbSoundtrack.isrc = isrcs[isrcCounter]
				isrcCounter++
			}

			const trackFugaLabelId = await getFugaLabelId(
				newDbSoundtrack.musicLabelId.toString()
			)
			console.log("dbTrack.fugaAssetId", dbTrack.fugaAssetId)
			const { assetId } = await addAssetToProduct(
				{
					fugaProductId: productId,
					name: newDbSoundtrack.name,
					p_line_year: newDbSoundtrack.publishingRightsYear || null,
					p_line_text: newDbSoundtrack.publishingRightsBy || null,
					labelId: trackFugaLabelId,
					...(await manageProductGenres(
						newDbSoundtrack.primaryGenre,
						newDbSoundtrack.secondaryGenre
					)),
					isrc: newDbSoundtrack.isrc,
					explicit: newDbSoundtrack.explicit,
					artists: await getProductArtists(artists),
					language: newDbSoundtrack.language.code.toUpperCase(),
					metadataLanguage: newDbSoundtrack.metadataLanguage.code.toUpperCase(),
				},
				dbTrack.fugaAssetId
			)
			if (assetId !== dbTrack.fugaAssetId) {
				console.log(
					"UNEQUAL!!!: assetId, dbTrack.fugaAssetId",
					assetId,
					dbTrack.fugaAssetId
				)
				if (process.env.NODE_ENV === "development") {
					throw new Error("Something went wrong. Asset Ids are not equal")
				}
			}
			// Update contributors by deleting all of them and adding them again
			await deleteAllContributorsForAsset(assetId)
			await addContributorsToAsset(assetId, contributors)
			// Update publisher by removing publisher and add it again
			const primaryArtist = trackInput.artists.find(
				(a) => a.type === PRIMARY_ARTIST
			)
			if (primaryArtist) {
				await deleteAllPublishersFromAsset(assetId)
				await addPublisherToFugaAsset(assetId, primaryArtist.id)
			} else {
				console.log("[WARNING] Track has no primary Artist")
			}
			newDbSoundtrack.fileUrl = dbTrack.fileUrl
			newDbSoundtrack.fugaAssetId = assetId
			newSoundtracksDb.push(newDbSoundtrack)
		}
	}
	console.log(
		"releaseDb.soundtracks.map(s=>s.fugaAssetId)",
		releaseDb.soundtracks.map((s) => s.fugaAssetId)
	)

	releaseDb.soundtracks = newSoundtracksDb

	// Update Release in DB
	releaseDb.isProcessing = false
	releaseDb.fugaProductId = productId
	releaseDb.status = "PENDING"
	await releaseDb.save()

	// Delete all local files
	deletePaths.forEach((d) => {
		unlinkSync(d)
	})

	console.log("Finished Release DRAFT Delivery!")
	return { releaseId: releaseDb.id }
}
