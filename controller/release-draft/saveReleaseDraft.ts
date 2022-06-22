import { mapPostReleaseSoundtrackToDB } from "@controller/release-delivery/mapRelease"
import { getFilePath } from "@controller/release-delivery/submitRelease"
import { deleteAssetInBuckets } from "@lib/assets/deleteAsset"
import { handleAssetProcessing } from "@lib/assets/processing/handleAssetProcessing"
import {
	addAssetToProduct,
	addAssetToProductMinimal,
	deleteAsset,
	detachAssetFromProduct,
	uploadAsset,
} from "@lib/fuga/assets"
import { createOrUpdateFugaProduct, createProduct } from "@lib/fuga/product"
import { PostReleaseDraft } from "@models/api/ReleaseDraft.model"
import { makeObjectId } from "@models/database/mongodb"
import Release from "@models/database/release"
import { IReleaseDocument } from "@models/database/release/IRelease"
import { IDBSoundtrack } from "@models/database/release/Soundtrack"
import { FEATURING_ARTIST, PRIMARY_ARTIST } from "@models/options/artistTypes"
import { unlinkSync } from "fs"
import {
	getFileNameIdentifierFromSignedStorageURL,
	getFileNameIdentifierFromStorageURL,
	isAssetUrlLocal,
} from "./submitDraft"

export const saveReleaseDraft = async (
	userId: string,
	releaseData: PostReleaseDraft,
	existingReleaseId?: string
): Promise<void> => {
	let release: IReleaseDocument
	if (existingReleaseId) {
		release = await Release.findOneById(existingReleaseId)
		if (!release) {
			throw new Error("Not found")
		} else if (
			release.status !== "DRAFT" &&
			release.status !== "ACTION_NEEDED" &&
			release.status !== "ACTION_NEEDED_DRAFT"
		) {
			throw new Error("Not a draft or action needed")
		}
	} else {
		release = new Release()
	}
	if (!releaseData.title) {
		throw new Error("No Title")
	}
	release.title = releaseData.title

	// ACTION_NEEDED turns to ACTION_NEEDED_DRAFT
	// everything else turns to DRAFT
	if (
		release.status === "ACTION_NEEDED" ||
		release.status === "ACTION_NEEDED_DRAFT"
	) {
		release.status = "ACTION_NEEDED_DRAFT"
	} else {
		release.status = "DRAFT"
	}

	release.artists = (releaseData.artists || []).map((a) => ({
		artistId: makeObjectId(a.id),
		type: a.type,
	}))
	release.user = makeObjectId(userId)
	release.submitted = new Date()

	// release.coverUrl = releaseData.coverUrl || undefined // -> Cover URL should not be updated if it is the same, see below
	release.musicLabelId = releaseData.labelId
		? makeObjectId(releaseData.labelId)
		: undefined
	release.primaryGenre = releaseData.genres?.primaryGenre || undefined
	release.secondaryGenre = releaseData.genres?.secondaryGenre || undefined
	release.language = releaseData.language?.code
		? { code: releaseData.language.code, name: releaseData.language.name }
		: undefined
	release.explicit =
		typeof releaseData.explicitLyrics === "boolean"
			? releaseData.explicitLyrics
			: undefined

	release.digitalReleaseDate = releaseData.releaseDates.digital
		? new Date(releaseData.releaseDates.digital)
		: undefined
	release.originalReleaseDate = releaseData.releaseDates.original
		? new Date(releaseData.releaseDates.original)
		: undefined
	release.copyrightBy = releaseData.copyright?.owner || undefined
	release.copyrightYear = releaseData.copyright?.year || undefined
	release.publishingRightsBy = releaseData.publishingRights?.owner || undefined
	release.publishingRightsYear = releaseData.publishingRights?.year || undefined
	release.stores =
		releaseData.stores && Array.isArray(releaseData.stores)
			? releaseData.stores.map((s) => ({ id: s.id, name: s.name }))
			: undefined
	release.freeBeats =
		releaseData.beatLinksOrFiles && Array.isArray(releaseData.beatLinksOrFiles)
			? releaseData.beatLinksOrFiles.map((b) =>
					b.type === "LINK"
						? { name: b.link, type: "LINK" }
						: { name: b.name, url: b.url, type: "FILE" }
			  )
			: undefined
	release.upc = releaseData.upc || undefined
	release.lastActionTime = new Date()
	release.priceCategory = releaseData.priceCategory || undefined
	release.isProcessing = false

	const { coverImageId, productId } = await createOrUpdateFugaProduct(
		{
			name: release.title,
		},
		release.fugaProductId
	)
	release.fugaProductId = productId

	const deletePaths = []
	// Handle Cover
	if (releaseData.coverUrl && isAssetUrlLocal(releaseData.coverUrl)) {
		console.log("Cover is local!", releaseData.coverUrl)
		const { newAssetUrl: newCoverUrl, filesToDelete: coverToDeletePaths } =
			await handleAssetProcessing(releaseData.coverUrl, "IMAGE")
		deletePaths.push(...coverToDeletePaths)
		release.coverUrl = newCoverUrl
		const coverPath = getFilePath(releaseData.coverUrl)
		await uploadAsset(coverPath, coverImageId, "image")
	}

	// There are multiple scenarios
	// 1 - soundtrack is already deployed to FUGA: 	releaseInput.tracks[i].fileUrl: ASSETS; releaseDb.soundtracks[j].fileUrl: ASSETS
	// 2 - soundtrack is new:						releaseInput.tracks[i].fileUrl: LOCAL;	releaseDb.soundtracks[j] might exist
	// 3 - soundtrack is deleted					releaseInput.tracks[i] is REMOVED;		releaseDb.soundtracks[j].fileUrl: ASSETS
	// Attention: Order of releaseInput.tracks and releaseDb.soundtracks can be different!

	// Delete Removed tracks
	for (let i = 0; i < (release?.soundtracks || []).length; i++) {
		const soundtrack = (release?.soundtracks || [])[i]
		// determine soundtrack in releaseInput by comparing File URLs
		const releaseInputSoundtrack = releaseData.tracks.find(
			(st) =>
				getFileNameIdentifierFromSignedStorageURL(st.fileUrl) ===
				getFileNameIdentifierFromStorageURL(soundtrack.fileUrl)
		)
		if (!releaseInputSoundtrack) {
			try {
				console.log("Deleting soundtrack:", soundtrack.name)
				// Detach asset from fuga product, delete asset and delete files in buckets
				await detachAssetFromProduct(
					release.fugaProductId,
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

	// Go through each of the submitted soundtracks
	const newSoundtracksDb: IReleaseDocument["soundtracks"] = []
	for (let i = 0; i < releaseData.tracks.length; i++) {
		const trackInput = releaseData.tracks[i]

		// Creating NEW Soundtrack:
		if (isAssetUrlLocal(trackInput.fileUrl)) {
			console.log(i, "ADDING a NEW soundtrack  name", trackInput.title)
			// Get the db-compatible object for this soundtrack
			const newDbSoundtrack: IDBSoundtrack =
				mapPostReleaseSoundtrackToDB(trackInput)

			const { assetId } = await addAssetToProductMinimal({
				fugaProductId: productId,
			})

			// Upload audio file to FUGA
			await uploadAsset(getFilePath(newDbSoundtrack.fileUrl), assetId, "audio")
			const { newAssetUrl, filesToDelete } = await handleAssetProcessing(
				trackInput.fileUrl,
				"AUDIO"
			)
			console.log("assetId", assetId)
			deletePaths.push(...filesToDelete)
			newDbSoundtrack.fileUrl = newAssetUrl
			newDbSoundtrack.fugaAssetId = assetId

			newSoundtracksDb.push(newDbSoundtrack)
		}

		// Asset already exists at Fuga -> Soundtrack File stays the same
		else {
			console.log(i, "KEEPING an existing track  name", trackInput.title)
			// determine existing soundtrack in releaseDb by comparing File URLs
			const dbTrack = release.soundtracks.find(
				(st) =>
					getFileNameIdentifierFromSignedStorageURL(trackInput.fileUrl) ===
					getFileNameIdentifierFromStorageURL(st.fileUrl)
			)

			// Get the db-compatible object for this soundtrack
			const newDbSoundtrack: IDBSoundtrack =
				mapPostReleaseSoundtrackToDB(trackInput)
			newDbSoundtrack.fileUrl = dbTrack.fileUrl
			newDbSoundtrack.fugaAssetId = dbTrack.fugaAssetId

			newSoundtracksDb.push(newDbSoundtrack)
		}
	}

	release.soundtracks = newSoundtracksDb

	release.isProcessing = false
	await release.save()

	deletePaths.forEach((d) => {
		unlinkSync(d)
	})
}
