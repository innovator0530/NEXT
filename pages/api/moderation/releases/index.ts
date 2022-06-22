import { moderationGetReleases } from "controller/moderation/getReleases"
import { adminOnlySession, RequestWithSession } from "@middleware/nextAuthApi"
import {
	ReleaseStatus,
	ReleaseStatuses,
} from "@models/database/release/IRelease"
import { NextApiResponse } from "next"
import { createHandler } from "@middleware"

const handler = createHandler()

handler
	.use(adminOnlySession)
	.get(async (req: RequestWithSession, res: NextApiResponse) => {
		try {
			const exclusiveStartTime: string =
				req.query.exclusive_start_time &&
				decodeURIComponent(req.query.exclusive_start_time as string)
			let limit = req.query.limit && parseInt(req.query.limit as string)
			if (isNaN(limit)) {
				limit = 10
			}
			const releaseStatus: string = req.query.status as string
			if (!releaseStatus) {
				res.status(400).send({ message: "Must provide status as query param!" })
			}
			if (
				![...ReleaseStatuses, "APPROVAL_CHECKED_OFF"].includes(releaseStatus)
			) {
				res
					.status(400)
					.send({ message: "Invalid Release Status:" + releaseStatus })
			}
			const r: ReleaseStatus | "APPROVAL_CHECKED_OFF" = releaseStatus as
				| ReleaseStatus
				| "APPROVAL_CHECKED_OFF"
			const releases = await moderationGetReleases(r, limit, exclusiveStartTime)
			return res.status(200).send({ releases })
		} catch (e) {
			console.log(`e`, e)
			res.status(500).send({ message: "Something went wrong" })
		}
	})

export default handler
