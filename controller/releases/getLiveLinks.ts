import { getLiveLinksForProduct } from "@lib/fuga/liveLinks"
import Release from "@models/database/release"

export const getLiveLinksForRelease = async (
	releaseId: string
): Promise<{ platform: string; link: string }[]> => {
	const release = await Release.findOneById(releaseId)
	if (!release.fugaProductId) {
		return []
	} else {
		try {
			const { liveLinks } = await getLiveLinksForProduct(release.fugaProductId)
			// console.log('liveLinks', liveLinks)
			return liveLinks.map((l) => ({
				platform: l.dspName,
				link: l.url,
			}))
		} catch (e) {
			console.log("e", e)
			return []
		}
	}
}
