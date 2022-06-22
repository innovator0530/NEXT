import { resolveAssetUrl } from "@lib/assets/retrieval/resolveAssetUrl"
import Label from "@models/database/label"
import Release from "@models/database/release"
import {
	IReleaseDocument,
	ReleaseStatus,
} from "@models/database/release/IRelease"
import { Store } from "@models/options/stores"
import { getArtistsStringForRelease } from "../../lib/releases/getArtistsString"

function nullify<T>(obj: T): T {
	Object.keys(obj).forEach((key) => {
		if (obj[key] === undefined) obj[key] = null
	})
	return obj
}

interface ReleaseOverviewSoundtrack {
	title: string
	soundtrackUrl: string
	artistString: string
	isrc: string
}

export interface ReleaseOverviewAPI {
	id: string
	rewaveId: string
	title: string
	coverUrl: string
	status: ReleaseStatus
	upc: string
	soundtracks: ReleaseOverviewSoundtrack[]
	musicLabelName: string
	primaryGenre: string
	secondaryGenre: string
	originalReleaseDate: string
	digitalReleaseDate: string
	languageName: string
	explicitLyrics: boolean
	copyrightYear: number
	copyrightOwner: string
	publishingRightsYear: number
	publishingRightsOwner: string
	moderationComment: string
	artistsString: string
	stores: Store[]
	isProcessing: boolean
}

export const getReleaseForOverview = async (
	releaseId: string,
	userId?: string,
	addOriginalRelease?: boolean
): Promise<{
	release: ReleaseOverviewAPI
	originalRelease?: IReleaseDocument
}> => {
	const release = await Release.findOneById(releaseId)

	if (!release) {
		return null
	}
	const {
		id,
		title,
		coverUrl: sourceCoverUrl,
		status,
		upc,
		soundtracks: sourceSoundtracks,
		musicLabelId,
		primaryGenre,
		secondaryGenre,
		originalReleaseDate,
		digitalReleaseDate,
		language,
		explicit,
		copyrightYear,
		copyrightBy,
		publishingRightsBy,
		publishingRightsYear,
		user,
		rewaveId,
		moderationComment,
		stores,
		isProcessing,
	} = release

	if (userId && user.toString() !== userId) {
		return null
	}

	const coverUrl = await resolveAssetUrl({
		assetUrl: sourceCoverUrl,
		imageThumbnail: "large_thumb",
	})

	const soundtracks: ReleaseOverviewSoundtrack[] = []
	for (let i = 0; i < sourceSoundtracks.length; i++) {
		const sourceSoundtrack = sourceSoundtracks[i]
		const { isrc } = sourceSoundtrack

		soundtracks.push({
			title: sourceSoundtrack.name,
			soundtrackUrl: await resolveAssetUrl({
				assetUrl: sourceSoundtrack.fileUrl,
				soundFilePreview: "mp3_preview",
			}),
			artistString: await getArtistsStringForRelease(sourceSoundtrack.artists),
			isrc,
		})
	}
	const musicLabelName = (await Label.findOneById(musicLabelId.toString())).name

	const artistsString = await getArtistsStringForRelease(release.artists)

	const result = {
		id,
		title,
		coverUrl,
		status,
		upc,
		soundtracks,
		musicLabelName,
		primaryGenre,
		secondaryGenre,
		originalReleaseDate: originalReleaseDate.toISOString(),
		digitalReleaseDate: digitalReleaseDate.toISOString(),
		languageName: language.name,
		explicitLyrics: !!explicit,
		copyrightYear,
		copyrightOwner: copyrightBy,
		publishingRightsOwner: publishingRightsBy,
		publishingRightsYear,
		rewaveId,
		moderationComment,
		artistsString,
		stores: stores.map((s) => ({ id: s.id, name: s.name })),
		isProcessing,
	}

	const returnObj: {
		release: ReleaseOverviewAPI
		originalRelease?: IReleaseDocument
	} = { release: nullify(result) }

	if (addOriginalRelease) {
		returnObj.originalRelease = release
	}

	return returnObj
}
