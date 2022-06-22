import { FormData } from "formdata-node"
import { fileFromPath } from "formdata-node/file-from-path"

import { ensureFugaLogin, fetchFuga } from "./fuga"

declare var global
const FUGA_BASE_URL = process.env.FUGA_BASE_URL
const UPLOAD_CHUNK_SIZE = 1024 * 1024 // 1MB

import { FormDataEncoder } from "form-data-encoder"
import fetch from "cross-fetch"
import { Readable } from "stream"
import fs from "fs"
import childProcess from "child_process"

// see https://next.fugamusic.com/wiki/product.md#uploading-product-cover-art
// Asset ID is asset.id or cover_image.id
export const uploadAsset = async (
	filePath: string,
	fugaAssetId: number,
	type: "image" | "audio"
) => {
	// console.log(`filePath`, filePath)

	let filename = "some-filename"
	try {
		filename = filePath.split("/").pop()
	} catch (e) {}

	const { data } = await fetchFuga(`/upload/start`, "POST", {
		id: fugaAssetId,
		type,
	})
	if (!data?.id) {
		console.log(`data`, data)
		throw new Error("No upload session id from /upload/start")
	}
	const uploadToken = data.id

	// Split files into chunks
	const chunksFolderPath = filePath + "-chunks/"
	if (fs.existsSync(chunksFolderPath)) {
		fs.rmdirSync(chunksFolderPath, { recursive: true })
	}
	fs.mkdirSync(chunksFolderPath)
	childProcess.execSync(
		`split "${filePath}" -b ${UPLOAD_CHUNK_SIZE} "${chunksFolderPath}chunk"`
	)
	const chunkFileNames = fs.readdirSync(chunksFolderPath)
	const chunkFilePaths = chunkFileNames.map((c) => `${chunksFolderPath}${c}`)
	const totalFileSize = fs.statSync(filePath).size

	// Upload the chunks
	let byteOffset = 0
	for (let i = 0; i < chunkFilePaths.length; i++) {
		const filePath = chunkFilePaths[i]
		const fileSize = fs.statSync(filePath).size

		const formData = new FormData()
		formData.set("uuid", uploadToken)
		formData.set("filename", filename)
		formData.set("file", await fileFromPath(filePath)),
			formData.set("totalfilesize", "" + totalFileSize)
		formData.set("partindex", i)
		formData.set("partbyteoffset", "" + byteOffset)
		formData.set("chunksize", "" + fileSize)
		byteOffset += fileSize

		const encoder = new FormDataEncoder(formData)

		const headers = {
			...encoder.headers,
			"x-csrf-token": global.fugaCsrfToken,
			cookie: `connect.sid=${global.fugaCookieVal}`,
		}

		await fetch(`${FUGA_BASE_URL}/upload`, {
			method: "POST",
			headers,
			body: Readable.from(encoder) as any,
		})
		fs.unlinkSync(filePath)
	}
	fs.rmdirSync(chunksFolderPath, { recursive: true })

	await fetchFuga(`/upload/finish`, "POST", {
		uuid: uploadToken,
		filename,
	})
}

export const addAssetToProductMinimal = async ({
	fugaProductId,
}: {
	fugaProductId: number
}): Promise<{ assetId: number }> => {
	const body = {}
	const { data } = await fetchFuga(`/assets`, "POST", body)

	const assetId = data.id
	await fetchFuga(`/products/${fugaProductId}/assets/`, "POST", {
		id: assetId,
	})
	console.log(`data`, data)
	return { assetId }
}

export const addAssetToProduct = async (
	{
		fugaProductId,
		name,
		p_line_year,
		p_line_text,
		labelId,
		isrc,
		primaryGenreId,
		primarySubgenreId,
		secondaryGenreId,
		secondarySubgenreId,
		explicit,
		artists,
		language,
		metadataLanguage,
	}: {
		fugaProductId: number
		name: string
		p_line_year?: number
		p_line_text?: string
		// c_line_year:number,
		// c_line_text:string,
		labelId: number
		primaryGenreId: string
		primarySubgenreId?: number
		secondaryGenreId?: string
		secondarySubgenreId?: number
		isrc: string
		explicit: boolean
		artists: {
			id: number
			primary: boolean
		}[]
		language: string
		metadataLanguage: string
	},
	existingAssetId?: number
): Promise<{ assetId: number }> => {
	const body: any = {
		name,
		label: labelId,
		genre: primaryGenreId,
		isrc,
		parental_advisory: explicit,
		artists,
		audio_locale: language, // This is the correct key ("Audio Language"), For "Metadata Language", use key "language",
		language: metadataLanguage,
	}
	if (primarySubgenreId) body.subgenre = primarySubgenreId
	if (secondaryGenreId) body.alternate_genre = secondaryGenreId
	if (secondarySubgenreId) body.alternate_subgenre = secondarySubgenreId
	if (p_line_text) body.p_line_text = p_line_text
	if (p_line_year) body.p_line_year = p_line_year

	// console.log(`body`, body)
	let assetId = existingAssetId
	console.log("existingAssetId", existingAssetId)
	if (!existingAssetId) {
		const { data } = await fetchFuga(`/assets`, "POST", body)
		assetId = data.id
	} else {
		await fetchFuga(`/assets/${assetId}`, "PUT", body)
	}
	try {
		await fetchFuga(`/products/${fugaProductId}/assets/`, "POST", {
			id: assetId,
		})
	} catch (e) {
		console.log("e", e)
	}
	// console.log(`data`, data)
	return { assetId }
}

export const detachAssetFromProduct = async (
	productId: number,
	assetId: number
): Promise<void> => {
	console.log(`Detaching asset ${assetId} from Product ${productId}`)
	const { data } = await fetchFuga(
		`/products/${productId}/assets/${assetId}`,
		"DELETE"
	)
	console.log("data", data)
}

export const deleteAsset = async (assetId: number): Promise<void> => {
	console.log(`Deleting asset ${assetId}`)
	const { data } = await fetchFuga(`/assets/${assetId}`, "DELETE")
	console.log("data", data)
}
