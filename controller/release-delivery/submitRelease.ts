import { handleAssetProcessing } from "@lib/assets/processing/handleAssetProcessing"
import { addAssetToProduct, uploadAsset } from "@lib/fuga/assets"
import { priceCategoryToFugaCatalogTier } from "@lib/fuga/catalogTier"
import { createProduct, generateBarcodeForProduct } from "@lib/fuga/product"
import { reserveIsrcs } from "@lib/isrc/getIsrcs"
import { getNextRewaveId } from "@lib/rewaveId/rewaveId"
import { PostRelease } from "@models/api/PostRelease.model"
import Release from "@models/database/release"
import { FEATURING_ARTIST, PRIMARY_ARTIST } from "@models/options/artistTypes"
import fs from "fs"
import { getProductArtists, disableEditingForAllArtists } from "./artists"
import { addContributorsToAsset } from "./contributors"
import { manageProductGenres } from "./genres"
import { getFugaLabelId } from "./labels"
import { mapPostReleaseToDB } from "./mapRelease"
import { getReleaseFormatType } from "./releaseFormatType"
import { addPublisherToFugaAsset } from "./trackPublisher"

const FILE_URL_PREFIX = process.env.TEMP_ASSET_URL_PREFIX

export const getFilePath = (uri: string): string => {
	if (uri.substring(0, FILE_URL_PREFIX.length) !== FILE_URL_PREFIX) {
		console.log("uri", uri)
		throw new Error("File Uri has invalid Prefix!")
	}
	const path = uri.substring(FILE_URL_PREFIX.length)
	// console.log(`path`, path)
	if (!fs.existsSync(path)) {
		throw new Error("File does not exist")
	}
	return path
}

// @param input: ISO-String yyyy-mm-dd....
export const formatDate = (input: string) => {
	if (input[4] !== "-" || input[7] !== "-") {
		throw new Error("Date must begin with yyyy-mm-dd")
	}
	return input.substring(0, 10)
}

// Skip File Upload: For testing purposes only
export const submitRelease = async (
	releaseInput: PostRelease,
	userId: string,
	skipFileUpload?: boolean
): Promise<{ releaseId: string }> => {
	try {
		const dbRelease = mapPostReleaseToDB(releaseInput, "PENDING", userId, true)

		const releaseDb = await Release.create(dbRelease)
		const { newAssetUrl: newCoverUrl, filesToDelete: coverToDeletePaths } =
			await handleAssetProcessing(releaseInput.coverUrl, "IMAGE")
		const deletePaths = [...coverToDeletePaths]
		releaseDb.coverUrl = newCoverUrl
		releaseDb.timesSubmitted = 1
		await releaseDb.save()

		// Will disable editing artists later at delivery to stores
		// await disableEditingForAllArtists(releaseDb)

		const rewaveId = await getNextRewaveId(releaseDb.id)

		// Bring the Label to FUGA
		const fugaLabelId = await getFugaLabelId(releaseInput.labelId)

		// CREATE FUGA PRODUCT
		const { coverImageId, productId } = await createProduct({
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
			rewaveId,
			upc: releaseInput.upc === "auto" ? null : releaseInput.upc,
			language: releaseInput.language.code.toUpperCase(),
			explicit: releaseInput.explicitLyrics,
			catalogTier: priceCategoryToFugaCatalogTier(releaseInput.priceCategory),
			releaseFormatType: getReleaseFormatType(releaseInput.tracks),
		})

		// Upload Cover
		const coverPath = getFilePath(releaseInput.coverUrl)
		if (!skipFileUpload) {
			await uploadAsset(coverPath, coverImageId, "image")
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
		for (let i = 0; i < releaseInput.tracks.length; i++) {
			const track = releaseInput.tracks[i]
			const trackFugaLabelId =
				track.labelId === releaseInput.labelId
					? fugaLabelId
					: await getFugaLabelId(track.labelId)
			let isrc = track.isrc
			if (isrc === "auto") {
				isrc = isrcs[isrcCounter]
				isrcCounter++
			}
			releaseDb.soundtracks[i].isrc = isrc
			const artists = track.artists.filter(
				(a) => a.type === PRIMARY_ARTIST || a.type === FEATURING_ARTIST
			) // only primary and featuring
			const contributors = track.artists.filter(
				(a) => !(a.type === PRIMARY_ARTIST || a.type === FEATURING_ARTIST)
			) // every other artist type (=contributors)
			const { assetId } = await addAssetToProduct({
				fugaProductId: productId,
				name: track.title,
				p_line_year: track.publishingRights?.year || null,
				p_line_text: track.publishingRights?.owner || null,
				labelId: trackFugaLabelId,
				...(await manageProductGenres(
					track.genres.primary,
					track.genres.secondary
				)),
				isrc,
				explicit: track.explicitLyrics,
				artists: await getProductArtists(artists),
				language: track.language.code.toUpperCase(),
				metadataLanguage: track.metadataLanguage.code.toUpperCase(),
			})
			await addContributorsToAsset(assetId, contributors)
			const primaryArtist = track.artists.find((a) => a.type === PRIMARY_ARTIST)
			if (primaryArtist) {
				await addPublisherToFugaAsset(assetId, primaryArtist.id)
			} else {
				console.log("[WARNING] Track has no primary Artist")
			}
			// if(process.env.NODE_ENV!=='development')
			if (!skipFileUpload) {
				await uploadAsset(getFilePath(track.fileUrl), assetId, "audio")
			}

			// Upload to S3
			if (!skipFileUpload) {
				const { newAssetUrl, filesToDelete } = await handleAssetProcessing(
					track.fileUrl,
					"AUDIO"
				)
				deletePaths.push(...filesToDelete)
				releaseDb.soundtracks[i].fileUrl = newAssetUrl
			}

			releaseDb.soundtracks[i].fugaAssetId = assetId
		}

		// Update Release in DB
		releaseDb.rewaveId = rewaveId
		releaseDb.isProcessing = false
		releaseDb.fugaProductId = productId
		await releaseDb.save()

		// Delete all local files
		deletePaths.forEach((d) => {
			fs.unlinkSync(d)
		})

		console.log("Finished Release Delivery!")
		return { releaseId: releaseDb.id }
	} catch (e) {
		console.log("Error with submitting Release:", e)
		throw e
	}
}
