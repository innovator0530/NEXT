import { saveReleaseDraft } from "@controller/release-draft/saveReleaseDraft"
import { adminUserContext, RequestWithSession } from "@middleware/nextAuthApi"
import Release from "@models/database/release"
import { NextApiResponse } from "next"
import { createHandler } from "../../../middleware"

const handler = createHandler()

handler
	.use(adminUserContext)
	.post(async (req: RequestWithSession, res: NextApiResponse) => {
		try {
			const userId = req.session.user.id
			const body = req.body
			const existingReleaseId = req.query.existing as string
			if (typeof body !== "object") {
				console.log("body", body)
				res
					.status(400)
					.send({ message: "Invalid Body. Body must be an object" })
			}
			if (existingReleaseId) {
				try {
					await Release.updateOne(
						{ _id: existingReleaseId },
						{ $set: { isProcessing: true } }
					)
				} catch (e) {
					console.log("ERROR AT SETTING ISPROCESSING TO TRUE", e)
				}
			}
			res.status(200).send({ message: "Successful" })
			saveReleaseDraft(userId, body, existingReleaseId || undefined)
				.then(() => {
					console.log("Save Release Draft successful")
				})
				.catch((e) => {
					console.log("Error at saving draft (POST /draft)", e)
				})
		} catch (e) {
			console.log("e", e)
			res.status(500).send({ message: e })
		}
	})

export default handler
