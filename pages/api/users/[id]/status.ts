import { NextApiResponse } from "next"
import { createHandler } from "../../../../middleware"
import { SessionUser, UserStatusNames } from "../../../../models/user.models"
import User from "../../../../models/database/user"
import UserAccountAction from "../../../../models/database/userAccountAction"
import { validateAdmin } from "../../../../lib/validateUser"
import { adminOnlySession, RequestWithSession } from "@middleware/nextAuthApi"

const handler = createHandler()

// PUT /api/users/[id]/status?status=APPROVED

handler
	.use(adminOnlySession)
	.put(
		async (
			{ query, body, session }: RequestWithSession,
			res: NextApiResponse
		) => {
			try {
				const userId = query.id
				const newStatus = body.status
				const allowedNewStatuses = ["APPROVED", "BANNED"]
				if (process.env.NODE_ENV === "development") {
					allowedNewStatuses.push("APPROVAL_NEEDED")
				}
				if (!newStatus || !allowedNewStatuses.includes(newStatus)) {
					res.status(400).json({
						message:
							"Must provide status in Body. Must be either APPROVED or BANNED",
					})
					return
				}

				const users = await User.find({ _id: userId })
				if (users.length !== 1) {
					res.status(404).json({ message: "User not found" })
					return
				}
				const user = users[0]
				if (user.type === "ADMIN") {
					res
						.status(400)
						.json({ message: "Currently, admins status cannot be changed" })
					return
				}
				if (user.status === newStatus) {
					res.status(400).json({ message: "User already has this status" })
					return
				}
				if (
					process.env.NODE_ENV !== "development" ||
					newStatus !== "APPROVAL_NEEDED"
				) {
					await UserAccountAction.create({
						user: userId,
						type: newStatus,
						time: new Date(),
					})
				}

				await User.updateOne({ _id: userId }, { $set: { status: newStatus } })
				res.status(200).json({ message: "User updated" })
			} catch (e) {
				console.log("Error at approving User", e)
				res.status(500).json({ message: e.message })
				return
			}
		}
	)

export default handler
