import {
	deliverProductToDsps,
	getDeliveryInstructionsForProduct,
} from "@lib/fuga/delivery"
import {
	BEATPORT,
	FACEBOOK_AUDIO_LIBRARY,
	FACEBOOK_FINGERPRINTING,
	FACEBOOK_INSTAGRAM,
	HUNGAMA_AND_WYNK,
	Store,
	YOUTUBE_CONTENT_ID,
	YOUTUBE_MUSIC,
	YOUTUBE_MUSIC_AND_CONTENT_ID,
} from "@models/options/stores"

const transformStoreListAccordingToSpecialRules = (
	stores: Store[]
): Store[] => {
	let resultStores = [...stores]
	// Remove 'Beatport' if it exists
	resultStores = resultStores.filter((s) => s.id !== BEATPORT.id)

	// Replace Facebook/Instagram with "Facebook Fingerprinting" and "Facebook Audio Library
	if (resultStores.some((s) => s.id === FACEBOOK_INSTAGRAM.id)) {
		resultStores = resultStores.filter((s) => s.id !== FACEBOOK_INSTAGRAM.id)
		resultStores.push(FACEBOOK_FINGERPRINTING)
		resultStores.push(FACEBOOK_AUDIO_LIBRARY)
	}

	// It is illegal to only select "Youtube Content ID" without selecting "YouTube Music"
	// In Development, throw an error; in production, just add "YouTube Music anyway"
	const hasYoutubeMusic = resultStores.some((s) => s.id === YOUTUBE_MUSIC.id)
	const hasYoutubeContentId = resultStores.some(
		(s) => s.id === YOUTUBE_CONTENT_ID.id
	)
	if (hasYoutubeMusic || hasYoutubeContentId) {
		if (
			!hasYoutubeMusic &&
			hasYoutubeContentId &&
			process.env.NODE_ENV === "development"
		) {
			throw new Error(
				"Release does not have YouTube Music but has Youtube Content ID (ILLEGAL!)"
			)
		}
		resultStores = resultStores.filter(
			(s) => s.id !== YOUTUBE_CONTENT_ID.id && s.id !== YOUTUBE_MUSIC.id
		)
		resultStores.push(YOUTUBE_MUSIC_AND_CONTENT_ID)
	}

	// Transform the name of Hungama & Wynk to just "Hungama"
	if (resultStores.some((s) => s.id === HUNGAMA_AND_WYNK.id)) {
		resultStores.find((s) => s.id === HUNGAMA_AND_WYNK.id).name = "Hungama"
	}

	return resultStores
}

export const deliverProductToStores = async (
	fugaProductId: number,
	stores: Store[]
): Promise<{
	nonExistentStores: string[]
}> => {
	const storesToDeliver = transformStoreListAccordingToSpecialRules(stores)
	const storeNamesLowerCase = storesToDeliver.map((s) => s.name.toLowerCase())
	const { deliveryInstructions } = await getDeliveryInstructionsForProduct(
		fugaProductId
	)
	// console.log("deliveryInstructions", deliveryInstructions)
	const dspIdsToDeliver = deliveryInstructions
		.filter((d) => storeNamesLowerCase.includes(d.dsp.name.toLowerCase()))
		.map((d) => d.dsp.id)
	console.log("dspIdsToDeliver", dspIdsToDeliver)

	await deliverProductToDsps(fugaProductId, dspIdsToDeliver)

	return {
		nonExistentStores: storesToDeliver
			.filter(
				(s) =>
					!deliveryInstructions.some(
						(d) => d.dsp.name.toLowerCase() === s.name.toLowerCase()
					)
			)
			.map((s) => s.name),
	}
}
