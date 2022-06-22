import { createReleaseAction } from "@controller/notifications/createReleaseAction"
import { deliverRelease } from "@controller/release-final-delivery/deliverRelease"
import { createHandler } from "@middleware/index"
import {
	adminOnlySession,
	adminUserContext,
	RequestWithSession,
} from "@middleware/nextAuthApi"
import Release from "@models/database/release"
import { NextApiResponse } from "next"

const handler = createHandler()

handler
	.use(adminOnlySession)
	.put(async (req: RequestWithSession, res: NextApiResponse) => {
		try {
			console.log(
				"APPROVE Request PUT",
				req.url,
				"time:",
				new Date().toISOString()
			)
			const releaseId = req.query.id as string
			if (typeof releaseId !== "string") {
				res.status(400).send({ message: "Release ID required in Path" })
				return
			}
			const release = await Release.findOneById(releaseId)
			if (!release) {
				res.status(404).send({ message: "Release not found" })
				return
			}
			if (release.status !== "PENDING" && release.status !== "ACTION_NEEDED") {
				res
					.status(404)
					.send({ message: "Release status must be PENDING or ACTION_NEEDED" })
				return
			}

			console.log(
				new Date().toISOString(),
				"release.id,release.rewaveId,release.title",
				release.id,
				release.rewaveId,
				release.title,
				"Starting delivery"
			)

			const result = await deliverRelease(releaseId)

			console.log(new Date().toISOString(), "Finished delivery of", release.id)

			try {
				await createReleaseAction({
					releaseId: release.id,
					userId: release.user.toString(),
					type: "APPROVED",
				})
			} catch (e) {
				console.log("e (Create Release Action)", e)
			}
			if (result.successful === true) {
				res.status(200).send({
					message: "Successful. " + result.warningMessages.join("; "),
					warningMessages: result.warningMessages,
				})
				return
			} else {
				res.status(500).send({
					message: "Failed. " + result.warningMessages.join("; "),
					warningMessages: result.warningMessages,
				})
				return
			}
		} catch (e) {
			console.log("e", e)
			res.status(500).send({ message: e })
		}
	})

export default handler
