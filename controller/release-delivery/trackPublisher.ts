import { fetchFuga, FugaError } from "@lib/fuga/fuga"
import {
	addPublisherToAsset,
	createPublishingHouse,
	findExistingPublishingHouseIdAtFuga,
} from "@lib/fuga/publishingHouse"
import Artist from "@models/database/artist"

const ARTIST_PUBLISHING_HOUSE_SUFFIX = " (Copyright Control)"

const getPublishingHouseId = async (artistId: string) => {
	const artist = await Artist.findOneById(artistId)
	const publishingHouseName =
		artist.name.trim() + ARTIST_PUBLISHING_HOUSE_SUFFIX
	if (
		artist.fugaPublishingHouseId &&
		typeof artist.fugaPublishingHouseId === "number"
	) {
		return artist.fugaPublishingHouseId
	} else {
		// If the Publishing house does not exist with the artist
		try {
			// Create Publishing House and save it to the user
			const { publishingHouseId } = await createPublishingHouse(
				publishingHouseName
			)
			artist.fugaPublishingHouseId = publishingHouseId
			await artist.save()
			return publishingHouseId
		} catch (e) {
			// The publishing house with this name already exists at Fuga
			// this might be e.g. because another user created an artist with the same name
			if (
				e instanceof FugaError &&
				(e as FugaError).code === "DUPLICATE_PUBLISHINGHOUSE_NAME"
			) {
				const publishingHouseId = await findExistingPublishingHouseIdAtFuga(
					publishingHouseName
				)
				artist.fugaPublishingHouseId = publishingHouseId
				await artist.save()
				return publishingHouseId
			} else {
				throw e
			}
		}
	}
}

export const addPublisherToFugaAsset = async (
	assetId: number,
	artistId: string
): Promise<void> => {
	const publishingHouseId = await getPublishingHouseId(artistId)
	await addPublisherToAsset(assetId, publishingHouseId)
}

export const removePublisherFromAsset = async (
	assetId: number,
	publisherId: number
): Promise<void> => {
	await fetchFuga(`/assets/${assetId}/publishers/${publisherId}`, "DELETE")
}

export const getAllPublishersForAsset = async (
	assetId: number
): Promise<{
	publishers: {
		id: number //...
	}[]
}> => {
	const { data } = await fetchFuga(`/assets/${assetId}/publishers`)
	console.log("publishers for asset", assetId, data)
	if (!Array.isArray(data)) {
		throw new Error("expected array as return type.")
	}
	return { publishers: data }
}

export const deleteAllPublishersFromAsset = async (assetId: number) => {
	const { publishers } = await getAllPublishersForAsset(assetId)
	for (let i = 0; i < publishers.length; i++) {
		await removePublisherFromAsset(assetId, publishers[i].id)
	}
}
