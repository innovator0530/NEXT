import { ImageThumbnailType } from "@lib/assets/constants"
import { resolveAssetUrl } from "@lib/assets/retrieval/resolveAssetUrl"
import Artist from "@models/database/artist"
import Release from "@models/database/release"
import {
	IReleaseDocument,
	ReleaseStatus,
} from "@models/database/release/IRelease"

export interface OverviewRelease {
	id: string
	title: string
	submittedDate: string
	lastActionTime: string
	status: ReleaseStatus
	isProcessing?: boolean
	coverUrl: string
	primaryArtistName: string
}

export const getReleasesOverview = async (
	userId: string,
	thumbnails: ImageThumbnailType,
	limit: number,
	exclusiveStartLastActionTimeStr?: string,
	releaseStatuses?: string[]
): Promise<OverviewRelease[]> => {
	const filter: any = { user: userId }
	if (releaseStatuses?.length > 0 && releaseStatuses[0].length) {
		filter.releaseStatus = { $in: releaseStatuses }
	}
	if (exclusiveStartLastActionTimeStr) {
		filter.lastActionTime = { $lt: exclusiveStartLastActionTimeStr }
	}
	const releases: Pick<
		IReleaseDocument,
		| "title"
		| "id"
		| "submitted"
		| "status"
		| "isProcessing"
		| "coverUrl"
		| "artists"
		| "lastActionTime"
	>[] = await Release.find(filter, {
		title: 1,
		id: 1,
		submitted: 1,
		status: 1,
		isProcessing: 1,
		coverUrl: 1,
		artists: 1,
		lastActionTime: 1,
	})
		.sort({
			lastActionTime: -1,
		})
		.limit(limit)
	let resultReleases: OverviewRelease[] = []
	for (let i = 0; i < releases.length; i++) {
		const {
			id,
			title,
			lastActionTime,
			submitted,
			status,
			isProcessing,
			coverUrl,
			artists,
		} = releases[i]
		let artistsString: string = "-"
		try {
			const primaryArtists = artists.filter((a) => a.type === "primary")
			let artistNames: string[] = []
			for (let i = 0; i < primaryArtists.length; i++) {
				const a = await Artist.findById(primaryArtists[i].artistId, { name: 1 })
				if (a && a.name) artistNames.push(a.name)
			}
			artistsString = artistNames.join(", ") || "-"
		} catch (e) {
			console.log(`e`, e)
		}
		resultReleases.push({
			id,
			title,
			status,
			isProcessing,
			submittedDate: submitted.toISOString(),
			primaryArtistName: artistsString,
			coverUrl: coverUrl
				? await resolveAssetUrl({
						assetUrl: coverUrl,
						imageThumbnail: thumbnails,
				  })
				: "",
			lastActionTime: lastActionTime.toISOString(),
		})
	}
	return resultReleases
}
