import { resolveAssetUrl } from "@lib/assets/retrieval/resolveAssetUrl"
import { IDBFreeBeat } from "@models/database/release/FreeBeat"
import {
	getReleaseForOverview,
	ReleaseOverviewAPI,
} from "../releases/getRelease"

export interface APIModerationRelease extends ReleaseOverviewAPI {
	fugaStatus: string
	userId: string
	freeBeats: (IDBFreeBeat & { resolvedUrl?: string })[]
}

export const moderationGetRelease = async (
	releaseId: string
): Promise<{ release: APIModerationRelease }> => {
	const res = await getReleaseForOverview(releaseId, null, true)
	/// ToDo: Fetch FUGA Status

	// resolve FreeBeats
	const freeBeats = []
	const release = res?.originalRelease
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

	return {
		release: {
			...res.release,
			fugaStatus: "This feature needs to be implemented",
			userId: res.originalRelease.user.toString(),
			freeBeats,
		},
	}
}
