import { NextApiResponse } from "next"
import { validateAdmin } from "../../../../../lib/validateUser"
import { createHandler } from "../../../../../middleware"
import { SessionUser } from "../../../../../models/user.models"
import Release from "../../../../../models/database/release"
import { adminOnlySession, RequestWithSession } from "@middleware/nextAuthApi"

const handler = createHandler()

handler
	.use(adminOnlySession)
	.put(async ({ session, query }: RequestWithSession, res: NextApiResponse) => {
		try {
			const releaseId = query.release
			if (releaseId === "undefinded" || releaseId === "null") {
				res
					.status(400)
					.json({ message: "Release ID cannot be null or undefined" })
				return
			}
			const user = session.user

			let targetCheckedOff = true
			if (query.target_checked_off) {
				const val = query.target_checked_off
				if (val !== "true" && val !== "false") {
					res.status(400).send({
						message: "Parameter 'target_checked_off' must be true or false",
					})
					return
				}
				if (val === "false") {
					targetCheckedOff = false
				}
			}

			const existingReleases = await Release.find(
				{ _id: releaseId },
				{ status: 1, user: 1, rewaveId: 1 }
			)
			if (existingReleases.length !== 1) {
				res.status(404).json({ message: "Release Not found" })
				return
			}
			const existingRelease = existingReleases[0]

			if (existingRelease.status !== "APPROVED") {
				res
					.status(400)
					.json({ message: "Release must be approved to be checked off" })
				return
			}

			await Release.updateOne(
				{ _id: existingRelease._id },
				{ $set: { approvalCheckedOff: targetCheckedOff } }
			)

			res.status(200).json({ message: "Successful" })
		} catch (e) {
			console.log("Error at Moderation set Release checkedOff:", e)
			res.status(500).json({ errorMessage: e.message })
		}
	})

export default handler
