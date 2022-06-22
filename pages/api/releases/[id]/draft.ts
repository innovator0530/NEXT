import { saveReleaseDraft } from "@controller/release-draft/saveReleaseDraft"
import { createHandler } from "../../../../middleware/"
import { adminUserContext, RequestWithSession } from "@middleware/nextAuthApi"
import { NextApiResponse } from "next"
import Release from "@models/database/release"
import { GetReleaseDraft } from "@models/api/ReleaseDraft.model"
import { resolveAssetUrl } from "@lib/assets/retrieval/resolveAssetUrl"
import { getReleaseDraft } from "@controller/release-draft/getReleaseDraft"

const handler = createHandler()

handler
	.get(adminUserContext)
	.get(async (req: RequestWithSession, res: NextApiResponse) => {
		try {
			const releaseId = req.query.id as string
			const userId = req.session.user.id
			if (!userId || releaseId) {
				res.status(400).send({
					message:
						"Invalid request. User must be logged in (valid session) and a release id must be provided",
				})
				return
			}

			const result = await getReleaseDraft(userId, releaseId)
			if (result.successful) {
				res.status(200).send({ release: result.release })
			} else if (result.successful === false) {
				res.status(result.statusCode).send({ message: result.message })
			}
		} catch (e) {
			console.log("e", e)
			res.status(500).send({ message: e })
		}
	})

handler
	.use(adminUserContext)
	.put(async (req: RequestWithSession, res: NextApiResponse) => {
		try {
			const userId = req.session.user.id
			const existingReleaseId = req.query.id as string
			console.log("existingReleaseId", existingReleaseId)
			const body = req.body
			if (typeof body !== "object") {
				console.log("body", body)
				res
					.status(400)
					.send({ message: "Invalid Body. Body must be an object" })
			}
			saveReleaseDraft(userId, body, existingReleaseId)
				.then(() => {
					console.log("Save Release Draft successful")
				})
				.catch((e) => {
					console.log(
						"Error at saving release or draft as draft PUT /releases/[id]/draft",
						e
					)
				})
		} catch (e) {
			console.log("e", e)
			res.status(500).send({ message: e })
		}
	})

handler
	.use(adminUserContext)
	.delete(async (req: RequestWithSession, res: NextApiResponse) => {
		try {
			const releaseId = (await req.query.id) as string
			const userId = req.session.user.id

			const release = await Release.findOneById(releaseId)
			if (!release) {
				res.status(404).send({ message: "Release was not found" })
				return
			}
			if (release.status !== "DRAFT") {
				res.status(400).send({ message: "Release is not a draft" })
				return
			}
			if (release.user.toString() !== userId) {
				res
					.status(403)
					.send({ message: "Release does not belong to current user" })
				return
			}
			await release.delete()
			res.status(200).send({ message: "Successfully deleted" })
		} catch (e) {
			console.log("e", e)
			res.status(500).send({ message: e })
		}
	})

export default handler
