import { submitDraftRelease } from "@controller/release-draft/submitDraft"
import { validatePostRelease } from "@controller/releases/submitRelease"
import { createHandler } from "@middleware/index"
import { adminUserContext, RequestWithSession } from "@middleware/nextAuthApi"
import Release from "@models/database/release"
import { NextApiResponse } from "next"

const handler = createHandler()

handler
	.use(adminUserContext)
	.post(async (req: RequestWithSession, res: NextApiResponse) => {
		try {
			const userId = req.session.user.id
			const releaseId = req.query.id as string
			const body = req.body
			const validationResult = validatePostRelease(body)
			console.log("Submitting Draft! releaseId", releaseId)
			if (!releaseId || typeof body !== "object") {
				res.status(400).send({
					message: "Release ID in Path required! Body must be object!",
				})
				return
			}
			if (!validationResult.valid) {
				console.log("validationResult", validationResult)
				console.log(validationResult.errors)
				res
					.status(400)
					.send({ errorMessage: validationResult.errors.toString() })
				return
			}
			const release = await Release.findOneById(releaseId)

			if (
				release.user.toString() !== userId &&
				req.session.user.type !== "ADMIN"
			) {
				res
					.status(403)
					.send({ message: "Relase does not belong to this user!" })
				return
			}
			if (process.env.NODE_ENV !== "development" && release.isProcessing) {
				res.status(400).send({
					message: "Relase cannot be modified as it is currently processing",
				})
				return
			}
			// if (
			// 	process.env.NODE_ENV !== "development" &&
			// 	release.status !== "DRAFT" &&
			// 	release.status !== "ACTION_NEEDED" &&
			//     release.s
			// ) {
			// 	res.status(400).send({ message: "Release is not a draft!" })
			// 	return
			// }
			release.isProcessing = true
			if (release.timesSubmitted) {
				release.timesSubmitted += 1
			} else {
				release.timesSubmitted = 1
			}

			await release.save()
			res.status(200).send({ message: "processing" })
			const releaseUserId = release.user.toString()
			submitDraftRelease(releaseId, body, releaseUserId)
				.then(() => {
					console.log("Submitted Draft-Release successful")
				})
				.catch((e) => {
					console.log("e", e)
				})
		} catch (e) {
			console.log("e", e)
			res.status(500).send({ message: e })
		}
	})

export default handler
