import { resolveAssetUrl } from "@lib/assets/retrieval/resolveAssetUrl"
import Release from "@models/database/release"
import { IDBRelease, ReleaseStatus } from "@models/database/release/IRelease"
import { getArtistsStringForRelease } from "../../lib/releases/getArtistsString"

const OMIT_PROCESSING_RELEASES = true

export interface APIModerationReleasesOverview {
	id: string
	title: string
	rewaveId: string
	resubmitted: boolean
	coverUrl: string
	status: ReleaseStatus
	upc: string
	primaryGenre: string
	artistsString: string
	trackCount: number
	dateSubmitted: string
	approvalCheckedOff: boolean
	lastActionTime: string
	timesSubmitted: number
}

// Exclusive Start Time: If next page desired, pass the lastActionTime of the last element of the current page
export const moderationGetReleases = async (
	status: ReleaseStatus | "APPROVAL_CHECKED_OFF",
	limit = 20,
	exclusiveStartTime?: string
): Promise<APIModerationReleasesOverview[]> => {
	const projection = {
		rewaveId: 1,
		title: 1,
		timesSubmitted: 1,
		coverUrl: 1,
		status: 1,
		upc: 1,
		primaryGenre: 1,
		artists: 1,
		soundtracks: { title: 1 },
		submitted: 1,
		approvalCheckedOff: 1,
		lastActionTime: 1,
		isProcessing: 1,
	}
	const date = exclusiveStartTime ? new Date(exclusiveStartTime) : null
	const dbReleases = await Release.findLatestByStatus<typeof projection>(
		status,
		limit,
		projection,
		date
	)
	const releases: APIModerationReleasesOverview[] = []
	for (let i = 0; i < dbReleases.length; i++) {
		const { id } = dbReleases[i]
		const {
			title,
			rewaveId,
			timesSubmitted,
			coverUrl: sourceCoverUrl,
			status,
			upc,
			primaryGenre,
			artists,
			soundtracks,
			submitted,
			approvalCheckedOff,
			lastActionTime,
			isProcessing,
		} = dbReleases[i].toObject()
		if (isProcessing) {
			continue
		}
		const obj = {
			id,
			title,
			rewaveId,
			resubmitted: timesSubmitted > 1,
			coverUrl: await resolveAssetUrl({
				assetUrl: sourceCoverUrl,
				imageThumbnail: "small_thumb",
			}),
			status,
			upc,
			primaryGenre,
			artistsString: await getArtistsStringForRelease(artists),
			trackCount: soundtracks.length,
			dateSubmitted: submitted.toString(),
			approvalCheckedOff: !!approvalCheckedOff,
			lastActionTime: lastActionTime.toISOString(),
			timesSubmitted,
		}
		Object.keys(obj).forEach((k) => {
			if (obj[k] === undefined) {
				delete obj[k]
			}
		})
		releases.push(obj)
	}

	return releases
}
