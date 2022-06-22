import { fetchFuga } from "@lib/fuga/fuga"
import { getFugaProduct } from "@lib/fuga/product"
import {
	Store,
	YOUTUBE_CONTENT_ID,
	YOUTUBE_MUSIC,
} from "@models/options/stores"

type RightsClaimType = "MONETIZE" | "NONE"
const setRightsClaimForAsset = async (
	fugaAssetId: number,
	rightsClaim: RightsClaimType
): Promise<void> => {
	await fetchFuga(`/assets/${fugaAssetId}`, "PUT", {
		rights_claim: rightsClaim,
	})
}

export const setRightsClaimForAllProductsAssets = async (
	fugaProductId: number,
	rightsClaim: RightsClaimType
): Promise<void> => {
	const product = await getFugaProduct(fugaProductId)
	const assetIds = product.assets.map((a) => a.id)
	for (let i = 0; i < assetIds.length; i++) {
		await setRightsClaimForAsset(assetIds[i], rightsClaim)
	}
}

// Special Rule: If Stores include YouTube Music, set all assets to rights_claim: 'MONETIZE'
export const setRightsClaimAccordingToYoutubeContentId = async (
	fugaProductId: number,
	stores: Store[]
) => {
	if (
		!stores.some((s) => s.id === YOUTUBE_MUSIC.id) &&
		stores.some((s) => s.id === YOUTUBE_CONTENT_ID.id) &&
		process.env.NODE_ENV === "development"
	) {
		throw new Error(
			"Stores include Youtube Content ID but not YouTube Music (ILLEGAL)"
		)
	}
	let rightsClaim: RightsClaimType = stores.some(
		(s) => s.id === YOUTUBE_CONTENT_ID.id
	)
		? "MONETIZE"
		: "NONE"
	// if (process.env.NODE_ENV === "development") {
	// 	rightsClaim = "MONETIZE"
	// }
	await setRightsClaimForAllProductsAssets(fugaProductId, rightsClaim)
}
