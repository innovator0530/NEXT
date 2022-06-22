import { createReleaseAction } from "@controller/notifications/createReleaseAction"
import { deliverRelease } from "@controller/release-final-delivery/deliverRelease"
import { createHandler } from "@middleware/index"
import {
	adminOnlySession,
	adminUserContext,
	RequestWithSession,
} from "@middleware/nextAuthApi"
import Release from "@models/database/release"
import ReleaseAction from "@models/database/releaseAction"
import { NextApiResponse } from "next"

const handler = createHandler()

handler
	.use(adminOnlySession)
	.put(async (req: RequestWithSession, res: NextApiResponse) => {
		try {
			const releaseId = req.query.id as string
			const moderationComment = decodeURIComponent(
				(req.query.moderation_comment as string) || ""
			)
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

			release.status = "ACTION_NEEDED"
			release.moderationComment = moderationComment
			await release.save()

			await createReleaseAction({
				releaseId: release.id,
				userId: release.user.toString(),
				type: "ACTION_NEEDED",
			})

			res.status(200).send({ message: "Successful" })
		} catch (e) {
			console.log("e", e)
			res.status(500).send({ message: e })
		}
	})

export default handler
