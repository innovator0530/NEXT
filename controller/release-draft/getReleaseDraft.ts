import { resolveAssetUrl } from "@lib/assets/retrieval/resolveAssetUrl"
import { GetReleaseDraft } from "@models/api/ReleaseDraft.model"
import Release from "@models/database/release"

export const getReleaseDraft = async (
	userId: string,
	releaseId: string,
	allowAnyUser?: boolean
): Promise<
	| { successful: true; release: GetReleaseDraft; releaseUserId?: string }
	| { successful: false; statusCode: number; message: string }
> => {
	const release = await Release.findOneById(releaseId)
	if (!release) {
		return { successful: false, statusCode: 404, message: "Draft not found" }
	}
	// if (release.status !== "DRAFT") {
	// 	return {
	// 		successful: false,
	// 		statusCode: 400,
	// 		message: "Release is not a draft",
	// 	}
	// }
	if (release.status === "APPROVED" || release.status === "REJECTED") {
		return {
			successful: false,
			statusCode: 400,
			message: "cannot edit approved or rejected releases",
		}
	}
	if (!allowAnyUser && release.user.toString() !== userId) {
		return {
			successful: false,
			statusCode: 403,
			message: "Release does not belong to current user",
		}
	}
	const freeBeats = []
	if (release.freeBeats) {
		for (let i = 0; i < release.freeBeats.length; i++) {
			const f = release.freeBeats[i]
			if (f.type === "LINK") {
				freeBeats.push({ link: f.name, type: f.type })
			} else if (f.type === "FILE") {
				freeBeats.push({
					name: f.name,
					type: f.type,
					url: f.url,
					resolvedUrl: await resolveAssetUrl({ assetUrl: f.url }),
				})
			}
		}
	}
	const releaseObject = release.toObject()
	const allowEditUpcAndIsrc = release.status === "DRAFT"
	const responseObj: GetReleaseDraft = {
		id: release.id,
		title: release.title,
		coverUrl: release.coverUrl
			? await resolveAssetUrl({
					assetUrl: release.coverUrl,
					imageThumbnail: "large_thumb",
			  })
			: undefined,

		primaryGenre: release.primaryGenre,
		secondaryGenre: release.secondaryGenre || "",
		language:
			release.language && release.language.code
				? { code: release.language.code, name: release.language.name }
				: null,
		explicit: release.explicit,
		copyrightBy: release.copyrightBy,
		copyrightYear: release.copyrightYear,
		publishingRightsBy: release.publishingRightsBy,
		publishingRightsYear: release.publishingRightsYear,
		stores: releaseObject.stores.map((s) => ({ name: s.name, id: s.id })),
		freeBeats,
		upc: release.upc,
		rewaveId: release.rewaveId,
		priceCategory: release.priceCategory,

		artists: releaseObject.artists?.map((a) => ({
			artistId: a.artistId.toString(),
			type: a.type,
		})),
		musicLabelId: release.musicLabelId?.toString(),
		digitalReleaseDate:
			typeof release.digitalReleaseDate === "object"
				? release.digitalReleaseDate.toString()
				: undefined,
		originalReleaseDate:
			typeof release.originalReleaseDate === "object"
				? release.originalReleaseDate.toString()
				: undefined,
		soundtracks: releaseObject.soundtracks?.map((s) => ({
			...s,
			musicLabelId: s.musicLabelId.toString(),
			artists: s.artists?.map((a) => ({
				artistId: a?.artistId?.toString() || null,
				type: a?.type,
			})),
			primaryGenre: s.primaryGenre || "",
			secondaryGenre: s.secondaryGenre || "",
		})),
		allowEditIsrc: allowEditUpcAndIsrc,
		allowEditUpc: allowEditUpcAndIsrc,
	}
	for (let i = 0; i < responseObj?.soundtracks?.length || 0; i++) {
		if (responseObj?.soundtracks[i]?.fileUrl) {
			responseObj.soundtracks[i].fileUrl = await resolveAssetUrl({
				assetUrl: responseObj.soundtracks[i].fileUrl,
				soundFilePreview: "mp3_preview",
			})
		}
	}
	Object.keys(responseObj).forEach((k) => {
		if (responseObj[k] === undefined) {
			delete responseObj[k]
		}
	})
	return {
		successful: true,
		release: responseObj,
		releaseUserId: release.user.toString(),
	}
}
