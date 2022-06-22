import { fetchFuga } from "./fuga"
import { uploadAsset } from "./assets"

test("Fuga request", async () => {
	const productResult = await fetchFuga("/products")
	expect(Array.isArray(productResult?.data?.product)).toBe(true)
})

test("Fuga Asset Upload", async () => {
	const result = await uploadAsset(
		"/home/florian/code/rewave-assets/Khat Main Sajan Likhyo Aa Pohnjo (3 Hal Dil Moti Tha Halaon) - Master Manzoor.flac",
		5405227606,
		"audio"
	)
	console.log("result", result)
})
