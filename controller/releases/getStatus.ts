import { getFugaProduct } from "@lib/fuga/product"
import Release from "@models/database/release"

export const getFugaStatusForRelease = async (
	releaseId: string
): Promise<{ status: string }> => {
	const release = await Release.findOneById(releaseId)
	if (!release.fugaProductId) {
		return { status: "Error" }
	} else {
		try {
			const { state: status } = await getFugaProduct(release.fugaProductId)
			return { status }
		} catch (e) {
			console.log("e", e)
			return { status: "Error" }
		}
	}
}
