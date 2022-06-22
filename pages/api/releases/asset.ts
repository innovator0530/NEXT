import { ASSETS_TMP_DIR } from "config"
import formidable from "formidable"
import { NextApiResponse } from "next"
import path from "path"
import { validateAudio } from "../../../lib/assets/validation/validate-audio"
import { validateImage } from "../../../lib/assets/validation/validate-image"
import { ensureFolderExists } from "../../../lib/filesystem/folders"
import { getFolderSize } from "../../../lib/filesystem/getFolderSize"
import { createHandler } from "../../../middleware"
import { adminUserContext, RequestWithSession as NextRequestWithSession } from "../../../middleware/nextAuthApi"

const MAX_USER_FOLDER_SIZE = 90000000 // in kb= 20GB
const MAX_TEMPFOLDER_SIZE = 90000000 //  in kb = 20GB
const MAX_CONCURRENT_FILE_UPLOADS = 1
const MAX_FILE_SIZE_PER_UPLOAD = 1024 * 1024 * 1024 // 1GB
const tmpDir = ASSETS_TMP_DIR
const allowedAudioExtensions = ["wav", "flac"]
const allowedImageExtensions = ["png", "jpg","jpeg", "gif"]

const FILE_URI_PREFIX = process.env.TEMP_ASSET_URL_PREFIX;


const allowedFileTypes = [
	"audio/vnd.wave",
	"audio/wav",
	"audio/wave",
	"audio/x-wav",
	"audio/x-flac",
	"audio/flac",
	"image/gif",
	"image/jpeg",
	"image/png",
]


export const config = {
	api: {
		bodyParser: false,
	},
}

// Only accepts wav, flac, jpg, png and tiff

const handler = createHandler()

handler
	.use(adminUserContext)
	.post(async (req: NextRequestWithSession, res: NextApiResponse) => {
		try {
			const user = req.session.user
			if (!user) {
				res.status(403).json({ message: "Unauthorized" })
				return
			}

			// Parse Files from Form Data
			const folder = `${tmpDir}/users/${user.id}`
			ensureFolderExists(folder)

			// Check if folders are full
			if (
				getFolderSize(folder) > MAX_USER_FOLDER_SIZE ||
				getFolderSize(tmpDir) > MAX_TEMPFOLDER_SIZE
			) {
				res
					.status(429)
					.send({
						message:
							"Storage is full. Please try again later or contact admins",
					})
				return
			}

			const form = new formidable.IncomingForm()
			form.keepExtensions = true
			form.uploadDir = `${folder}/`
			form.maxFileSize = MAX_FILE_SIZE_PER_UPLOAD

			const parseFormPromise: Promise<string[] | null> = new Promise(
				(resolve) => {
					form.parse(req, async (err, fields, files) => {
						if (err) {
							throw err
						}
						let unallowedFileType = null
						const filePaths = []
						Object.keys(files).forEach((k) => {
							if (!allowedFileTypes.includes(files[k].type)) {
								unallowedFileType = files[k].type
							}
							const name = files[k].name
							const parts = files[k].path.split("/")
							const localFileName = parts[parts.length - 1]
							const location = path.join(folder, localFileName)
							// console.log("Uploaded File:", name, "Local File Name:", localFileName,location);
							filePaths.push(location)
						})
						if (unallowedFileType) {
							resolve(null)
						} else {
							resolve(filePaths)
						}
					})
				}
			)
			const paths = await parseFormPromise

			// If paths returns 0, file endings are invalid
			if (!paths) {
				res
					.status(400)
					.send({ message: "Request contains invalid Files Types" })
				return
			}

			// Allow n concurrent uploads
			if (paths.length !== MAX_CONCURRENT_FILE_UPLOADS) {
				res
					.status(400)
					.send({
						message:
							"Only " +
							MAX_CONCURRENT_FILE_UPLOADS +
							" concurrent uploads possible",
					})
				return
			}

			// Validate files
			let filesValid = true
			let validationMessage = ""
			let urls = []
			let durations: number[] = []
			for (let i = 0; i < paths.length; i++) {
				const path = paths[i]
				const ending = path.split(".").slice(-1)[0]
				let validationResult: { valid: boolean; validationMessage?: string, duration?: number }
				if (allowedAudioExtensions.includes(ending.toLowerCase())) {
					validationResult = await validateAudio(path)
				} else if (allowedImageExtensions.includes(ending.toLowerCase())) {
					validationResult = await validateImage(path)
				} else {
					throw new Error("Unexpected File Extension: " + ending)
				}

				if (!validationResult.valid) {
					filesValid = false
					validationMessage += validationResult.validationMessage + " "
				} else {
					console.log(`validationResult.duration`, validationResult.duration)
					urls.push(FILE_URI_PREFIX + path)
					durations.push(validationResult.duration || -1)
				}
			}

			if (filesValid) {
				setTimeout(() => {
					res.status(200).json({ filesValid, message: "Uploaded", urls, durations })
				}, 600)
			} else {
				res
					.status(200)
					.json({
						filesValid,
						validationMessage,
						message: "Upload Failed. " + validationMessage,
					})
			}
		} catch (e) {
			console.log("Got Error at post Release Asset", e)
			res.status(500).json({ errorMessage: e.message })
		}
	})

export default handler
