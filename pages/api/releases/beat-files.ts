import { NextApiResponse } from "next"
import { createHandler } from "../../../middleware"
import { RequestWithSession as NextRequestWithSession } from "../../../middleware/nextAuthApi"
import { unlinkSync } from "fs"

const tempUrlPrefix = process.env.TEMP_ASSET_URL_PREFIX

const MAX_USER_FOLDER_SIZE = 2000000 // in kb= 2GB
const MAX_TEMPFOLDER_SIZE = 50000000 //  in kb = 50GB
const MAX_CONCURRENT_FILE_UPLOADS = 1
const MAX_FILE_SIZE_PER_UPLOAD = 1024 * 1024 * 1024 // 1GB
const tmpDir = path.resolve(`./.temp/${process.env.STORAGE_ASSETS_DIR_NAME}/`)

import formidable from "formidable"
import { ensureFolderExists } from "../../../lib/filesystem/folders"
import path from "path"
import { getFolderSize } from "../../../lib/filesystem/getFolderSize"
import { adminUserContext } from "../../../middleware/nextAuthApi"
import { uploadLocalFileToS3 } from "@lib/s3/uploadFileFromDisk"
import {
	absoluteLocalFilePathToBucketPath,
	filePathToStorageURL,
	localFileUrlToBucketPath,
} from "@lib/assets/processing/filePaths"

export const config = {
	api: {
		bodyParser: false,
	},
}

// Beat Files are e.g. receipts of beats to prove that the user bought this beat

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
				res.status(429).send({
					message: "Storage is full. Please try again later or contact admins",
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
						const filePaths = []
						Object.keys(files).forEach((k) => {
							const name = files[k].name
							const parts = files[k].path.split("/")
							const localFileName = parts[parts.length - 1]
							const location = path.join(folder, localFileName)
							// console.log("Uploaded File:", name, "Local File Name:", localFileName,location);
							filePaths.push(location)
						})
						resolve(filePaths)
					})
				}
			)
			const paths = await parseFormPromise

			// Allow n concurrent uploads
			if (paths.length !== MAX_CONCURRENT_FILE_UPLOADS) {
				res.status(400).send({
					message:
						"Only " +
						MAX_CONCURRENT_FILE_UPLOADS +
						" concurrent uploads possible",
				})
				return
			}

			// Upload to S3
			const filePath = paths[0]
			const bucketPath = absoluteLocalFilePathToBucketPath(filePath)
			await uploadLocalFileToS3(filePath, bucketPath, "STORAGE")
			unlinkSync(filePath)

			const relativeFilePath = absoluteLocalFilePathToBucketPath(filePath) // Example: assets/users/12345/5678.png
			const newAssetUrl = filePathToStorageURL(relativeFilePath) // Example: REWAVE-STORAGE://assets/users/12345/5678.png
			res.status(200).json({ message: "Uploaded", urls: [newAssetUrl] })
		} catch (e) {
			console.log("Got Error at post Release Asset", e)
			res.status(500).json({ errorMessage: e.message })
		}
	})

export default handler
