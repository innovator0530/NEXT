import { NextApiRequest, NextApiResponse } from "next"
import { createHandler } from "../../../middleware"
import Release from "../../../models/database/release"
import formidable from "formidable"

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")
const {
	S3Client,
	PutObjectCommand,
} = require("@aws-sdk/client-s3")
const client = new S3Client({
	region: "eu-central-1",
	credentials: {
		accessKeyId: process.env.aws_access_key_id,
		secretAccessKey: process.env.aws_secret_access_key,
	},
})

import { v4 as uuid } from "uuid"

const s3BucketName = process.env.aws_s3_bucket_name

// Only accepts wav, flac, jpg, png and tiff

const getFileExtension = (contentType: string) => {
	switch (contentType) {
		case "audio/x-flac":
		case "audio/flac":
			return "flac"
		case "audio/wave":
		case "audio/wav":
		case "audio/x-wav":
		case "audio/x-pn-wav":
			return "wav"
		case "image/jpg":
		case "image/jpeg":
			return "jpg"
		case "image/png":
			return "png"
		case "image/tiff":
			return "tiff"
		default:
			throw new Error("Unaccepted File Type")
	}
}

const handler = createHandler()

// handler
// 	.use(session)
// 	.use(adminUserContextMiddleware)
// 	.put(async ({ headers, session, ctxUser,body }: RequestWithSession, res: NextApiResponse) => {
// 		try {
// 			const user = ctxUser;
// 			if (!user || !user.isLoggedIn) {
// 				res.status(403).json({ message: "Unauthorized" })
// 				return
// 			}
// 			const id = uuid()
// 			const contentType = headers["Content-Type"] || headers["content-type"]

// 			let fileExtension: string = ""
// 			try {
// 				fileExtension = getFileExtension(contentType as string)
// 			} catch (e) {
// 				res.status(400).json({ message: "Content Type Not Accepted" })
// 				return;
// 			}

//             const formData = formidable.IncomingForm();

// 			const params = {
// 				Bucket: s3BucketName,
// 				Key: `users/${user.id}/${id}.${fileExtension}`,
//                 Body: Buffer.from(body)
// 			}

// 			const command = new PutObjectCommand(params)
//             await client.send(command)
//             console.log(params.Key)
// 			// const putUrl = await getSignedUrl(client, command, { expiresIn: 1800 })

// 			res.status(200).json({ message:'Success!' })
// 		} catch (e) {
// 			console.log("Got Error at putAsset", e)
// 			res.status(500).json({ errorMessage: e.message })
// 		}
// 	})

export default handler
