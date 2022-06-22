import { fetchFuga, FugaError } from "./fuga"

export const getDeliveryInstructionsForProduct = async (
	productId: number
): Promise<{
	deliveryInstructions: {
		dsp: { name: string; id: number }
	}[]
}> => {
	const { data } = await fetchFuga(
		`/products/${productId}/delivery_instructions`
	)
	if (
		!data ||
		!data.delivery_instructions ||
		!Array.isArray(data?.delivery_instructions)
	) {
		console.log("data", data)
		throw new Error("Response has unexpected format.")
	}
	return {
		deliveryInstructions: data.delivery_instructions,
	}
}

const addDspsToProductDeliveryInstructions = async (
	productId: number,
	dspIds: number[]
): Promise<void> => {
	const requestBody = dspIds.map((id) => ({ dsp: id }))
	// Status of delivery instruction will change to "ADDED" after edit is called (with empty request object for each entry)
	const { statusCode, ...data } = await fetchFuga(
		`/products/${productId}/delivery_instructions/edit`,
		"PUT",
		requestBody
	)
	if (statusCode !== 200) {
		console.log("data", data)
		throw new Error("Response code is not 200!")
	}
}

const deliverProductToDspsMarkDelivery = async (
	productId: number,
	dspIds: number[]
): Promise<void> => {
	const requestBody = dspIds.map((id) => ({ dsp: id }))
	const { statusCode, ...data } = await fetchFuga(
		`/products/${productId}/delivery_instructions/deliver`,
		"POST",
		requestBody
	)
	if (statusCode !== 200) {
		console.log("data", data)
		throw new Error("Response code is not 200!")
	}
}

export const deliverProductToDsps = async (
	productId: number,
	dspIds: number[]
): Promise<void> => {
	await addDspsToProductDeliveryInstructions(productId, dspIds)
	console.log(
		new Date().toISOString(),
		"Added DSPs to product delivery instructions"
	)
	if (true) {
		//process.env.NODE_ENV !== "development") {
		await deliverProductToDspsMarkDelivery(productId, dspIds)
		console.log(
			new Date().toISOString(),
			"Delivered Product to dsps (marked for delivery)"
		)
	} else {
		console.log(
			"Not actually delivering because this is the Development environment!!!"
		)
	}
}

export const approveProductForDelivery = async (
	productId: number
): Promise<{ successful: boolean; errorMessage?: string }> => {
	try {
		const { data, statusCode } = await fetchFuga(
			`/products/${productId}/publish`,
			"POST"
		)
		return { successful: true }
	} catch (e) {
		if (e instanceof FugaError) {
			return { successful: false, errorMessage: e.fugaErrMsg }
		} else {
			throw e
		}
	}
}
