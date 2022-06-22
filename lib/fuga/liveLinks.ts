import { fetchFuga } from "./fuga"

export const getLiveLinksForProduct = async (
	productId: number
): Promise<{
	liveLinks: {
		dspId: number
		dspName: string
		url: string
	}[]
}> => {
	const { data } = await fetchFuga(`/products/${productId}/live_links`)
	if (!data?.live_link || !Array.isArray(data?.live_link)) {
		throw new Error("API returned wrong format.")
	}
	// console.log('data.live_link', data.live_link)
	return {
		liveLinks: data.live_link.map((l) => ({
			dspId: l?.dsp?.id,
			dspName: l?.dsp?.name,
			url: l?.url,
		})),
	}
}
