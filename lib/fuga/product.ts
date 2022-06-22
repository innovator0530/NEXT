import { manageProductGenres } from "controller/release-delivery/genres"
import { ReleaseFormatType } from "@models/fuga/releaseFormatTypes"
import { FugaCatalogTier, PriceCategory } from "@models/options/priceCategories"
import { fetchFuga } from "./fuga"

export const createProduct = async ({
	name,
	labelId,
	copyrightText,
	copyrightYear,
	publishingRightsText,
	publishingRightsYear,
	primaryGenreId,
	primarySubgenreId,
	secondaryGenreId,
	secondarySubgenreId,
	originalReleaseDate,
	digitalReleaseDate,
	artists,
	rewaveId,
	upc,
	language,
	explicit,
	catalogTier,
	releaseFormatType,
}: {
	name: string
	labelId: number
	copyrightText: string
	copyrightYear: number
	publishingRightsYear: number
	publishingRightsText: string
	primaryGenreId: string
	primarySubgenreId?: number
	secondaryGenreId?: string
	secondarySubgenreId?: number
	originalReleaseDate: string
	digitalReleaseDate: string
	artists: { id: number; primary: boolean }[]
	rewaveId: string
	upc?: string
	language: string
	explicit: boolean
	catalogTier: FugaCatalogTier
	releaseFormatType: ReleaseFormatType
}): Promise<{ coverImageId: number; productId: number }> => {
	// Construct Request Body
	const body: any = {
		name,
		label: labelId,
		c_line_year: copyrightYear,
		c_line_text: copyrightText,
		p_line_year: publishingRightsYear,
		p_line_text: publishingRightsText,
		genre: primaryGenreId,
		consumer_release_date: digitalReleaseDate,
		original_release_date: originalReleaseDate,
		artists,
		catalog_number: rewaveId,
		language,
		parental_advisory: explicit,
		catalog_tier: catalogTier,
		release_format_type: releaseFormatType,
	}
	// console.log(`body`, body)
	// Optional Parameters
	if (primarySubgenreId) body.subgenre = primarySubgenreId
	if (secondaryGenreId) body.alternate_genre = secondaryGenreId
	if (secondarySubgenreId) body.alternate_subgenre = secondarySubgenreId
	if (upc) body.upc = upc

	const { data } = await fetchFuga(`/products`, "POST", body)

	return {
		productId: data.id,
		coverImageId: data.cover_image.id,
	}
}

export const generateBarcodeForProduct = async (
	fugaProductId: number
): Promise<{ newUpc: string }> => {
	const { data } = await fetchFuga(`/products/${fugaProductId}/barcode`, "POST")
	return { newUpc: data.upc }
}

export const findProductByCatalogNumber = async (
	catalogNumber: string
): Promise<{ fugaProductId: number } | null> => {
	const { data } = await fetchFuga(
		`/products?search=${encodeURIComponent(`catalog_number=${catalogNumber}`)}`
	)
	if (data && data.product && Array.isArray(data.product) && data.product[0]) {
		return { fugaProductId: data.product[0].id }
	} else {
		return null
	}
}

export const createOrUpdateFugaProduct = async (
	{
		name,
		labelId,
		copyrightText,
		copyrightYear,
		publishingRightsText,
		publishingRightsYear,
		primaryGenreId,
		primarySubgenreId,
		secondaryGenreId,
		secondarySubgenreId,
		originalReleaseDate,
		digitalReleaseDate,
		artists,
		rewaveId,
		upc,
		language,
		explicit,
		catalogTier,
		releaseFormatType,
	}: {
		name: string
		labelId?: number
		copyrightText?: string
		copyrightYear?: number
		publishingRightsYear?: number
		publishingRightsText?: string
		primaryGenreId?: string
		primarySubgenreId?: number
		secondaryGenreId?: string
		secondarySubgenreId?: number
		originalReleaseDate?: string
		digitalReleaseDate?: string
		artists?: { id: number; primary: boolean }[]
		rewaveId?: string
		upc?: string
		language?: string
		explicit?: boolean
		catalogTier?: FugaCatalogTier
		releaseFormatType?: ReleaseFormatType
	},
	existingProductId?: number
): Promise<{ coverImageId: number; productId: number }> => {
	// Construct Request Body
	const body: any = {
		name,
		label: labelId,
		c_line_year: copyrightYear,
		c_line_text: copyrightText,
		p_line_year: publishingRightsYear,
		p_line_text: publishingRightsText,
		genre: primaryGenreId,
		consumer_release_date: digitalReleaseDate,
		original_release_date: originalReleaseDate,
		artists,
		catalog_number: rewaveId,
		language,
		parental_advisory: explicit,
		catalog_tier: catalogTier,
		release_format_type: releaseFormatType,
	}
	// console.log(`body`, body)
	// Optional Parameters
	if (primarySubgenreId) body.subgenre = primarySubgenreId
	if (secondaryGenreId) body.alternate_genre = secondaryGenreId
	if (secondarySubgenreId) body.alternate_subgenre = secondarySubgenreId
	if (upc) body.upc = upc

	Object.keys(body).forEach((k) => {
		if (body[k] === undefined) {
			delete body[k]
		}
	})

	let data: any = null
	if (existingProductId) {
		const { data: resultData } = await fetchFuga(
			`/products/${existingProductId}`,
			"PUT",
			body
		)
		data = resultData
	} else {
		const { data: resultData } = await fetchFuga(`/products`, "POST", body)
		data = resultData
	}

	return {
		productId: data.id,
		coverImageId: data.cover_image.id,
	}
}

export const getFugaProduct = async (
	id: number
): Promise<{
	id: number
	state: string
	assets: {
		id: number
	}[]
}> => {
	const { data } = await fetchFuga(`/products/${id}`)
	console.log("data", data)
	return data
}
