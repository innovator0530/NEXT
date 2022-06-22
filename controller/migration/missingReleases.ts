import { fetchFuga } from "@lib/fuga/fuga"
import { ReleaseErrorReport, ReleaseReportError } from "./migration"
import Release from "@models/database/release"

export const getMissingReleases = async (): Promise<{
	errors: ReleaseErrorReport[]
}> => {
	const errors: ReleaseErrorReport[] = []
	let pageIndex = 0
	let pageSize = 50
	let totalProducts = 50
	while (pageIndex * pageSize < totalProducts) {
		const {
			data: { page, page_size, total, product: products },
		} = await fetchFuga(`/products?page=${pageIndex}&page_size=${pageSize}`)
		pageIndex = page
		pageIndex++
		// console.log("pageIndex", pageIndex)
		pageSize = page_size
		totalProducts = total
		for (let i = 0; i < products.length; i++) {
			const product = products[i]
			const byUpc = await Release.find({ upc: product.upc }, { _id: 1 })
			if (byUpc.length < 1) {
				errors.push({
					fugaProductId: product.id || null,
					releaseId: `FUGA-${product.id}`,
					message: `Release with UPC ${product.upc} is present at FUGA but missing at REWAVE`,
					migrationErrors: [],
				})
			} else if (byUpc.length > 1) {
				errors.push({
					fugaProductId: product.id || null,
					releaseId: `FUGA-${product.id}`,
					message: `There are multiple Releases with the UPC ${product.upc} at REWAVE`,
					migrationErrors: [],
				})
			}
		}
	}
	if (errors.length > 0) {
		return {
			errors: [
				{
					releaseId: "multiple",
					message: `There are ${errors.length} releases missing`,
					migrationErrors: [],
				},
				...errors,
			],
		}
	} else {
		return { errors: [] }
	}
}
