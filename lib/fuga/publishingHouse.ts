// Publishing Houses cannot be duplicate on FUGA

import { fetchFuga } from "./fuga"

export const findExistingPublishingHouseIdAtFuga = async (
	name: string
): Promise<number> => {
	const { data } = await fetchFuga(
		`/publishing_houses?page=0&page_size=100&search=${encodeURIComponent(
			name.trim()
		)}`,
		"GET",
		null,
		false,
		{},
		"v2"
	)
	console.log("data", data)
	const publishingHouses: any[] = data?.publishing_house

	const publishingHouse = publishingHouses?.find(
		(p) => p.name.toLowerCase().trim() === name.toLowerCase().trim()
	)
	if (!publishingHouse) {
		throw new Error("Publishing House not found")
	}
	return publishingHouse.id
}

export const addPublisherToAsset = async (
	assetId: number,
	publisherId: number
): Promise<void> => {
	await fetchFuga(`/assets/${assetId}/publishers`, "POST", {
		publishing_house: publisherId,
	})
}

export const createPublishingHouse = async (
	name: string
): Promise<{ publishingHouseId: number }> => {
	const { data } = await fetchFuga(`/publishing_houses`, "POST", { name })
	if (typeof data?.id !== "number") {
		console.log(`data`, data)
		throw new Error(
			"Publishing House create endpoint return value did not return a valid ID!"
		)
	}
	return { publishingHouseId: data.id }
}
