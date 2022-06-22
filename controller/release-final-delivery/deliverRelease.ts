import { disableEditingForAllArtists } from "@controller/release-delivery/artists"
import { approveProductForDelivery } from "@lib/fuga/delivery"
import { findProductByCatalogNumber } from "@lib/fuga/product"
import Release from "@models/database/release"
import { deliverProductToStores } from "./addDeliveryInstructions"
import { setRightsClaimAccordingToYoutubeContentId } from "./setAssetsRightsClaim"

export const deliverRelease = async (
	releaseId: string
): Promise<{
	successful: boolean
	warningMessages: string[]
}> => {
	const warningMessages: string[] = []
	// get release from database
	const releaseDb = await Release.findById(releaseId)

	await disableEditingForAllArtists(releaseDb)

	// retrieve fuga product id for release
	let fugaProductId = releaseDb.fugaProductId
	if (!fugaProductId) {
		const { fugaProductId: id } = await findProductByCatalogNumber(
			releaseDb.rewaveId
		)
		if (id) {
			fugaProductId = id
			releaseDb.fugaProductId = id
			await releaseDb.save()
		} else {
			throw new Error(
				"Could not find Fuga Product ID of Release" + releaseDb.id
			)
		}
	}

	console.log(
		new Date().toISOString(),
		"releaseId,fugaProductId",
		releaseId,
		fugaProductId
	)

	// Special Rule (Setting All Assets rights_claim)
	await setRightsClaimAccordingToYoutubeContentId(
		fugaProductId,
		releaseDb.stores
	)

	console.log(
		new Date().toISOString(),
		"RightsClaim for all assets has been set. fugaProductId:",
		fugaProductId
	)

	// Publish or approve product
	await approveProductForDelivery(fugaProductId)

	console.log(
		new Date().toISOString(),
		"Approved Product for Delivery. fugaProductId:",
		fugaProductId
	)

	// Deploy to stores
	const { nonExistentStores } = await deliverProductToStores(
		fugaProductId,
		releaseDb.stores
	)
	console.log(new Date().toISOString(), "nonExistentStores", nonExistentStores)
	warningMessages.push(
		...nonExistentStores.map(
			(s) =>
				`Could not deliver to store ${s} since it is not an available option at FUGA.`
		)
	)
	releaseDb.status = "APPROVED"
	await releaseDb.save()

	console.log(
		new Date().toISOString(),
		"Finished Delivering Release. fugaProductId",
		fugaProductId
	)
	return {
		successful: true,
		warningMessages,
	}
}
