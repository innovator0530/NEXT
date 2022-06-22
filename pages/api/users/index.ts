import { sendVerificationEmail } from "@lib/email/sendVerificationEmail"
import { IDBUser } from "@models/database/user/interface"
import { NextApiRequest, NextApiResponse } from "next"
import { generateVerficationToken, hashPassword } from "../../../lib/password"
import { createHandler } from "../../../middleware"
import {
	adminUserContext,
	RequestWithSession,
} from "../../../middleware/nextAuthApi"
import User from "../../../models/database/user"

const handler = createHandler()

// Sign up a user (Regular Password Auth)
handler.post(
	async (
		{
			body: { email: rawEmail, password, firstName, lastName, instagram },
		}: NextApiRequest,
		res: NextApiResponse
	) => {
		// validation:
		if (typeof password !== "string" || password.length < 8) {
			res.status(400).json({
				message: "Password not given or too short",
			})
			return
		}
		try {
			const passwordHash = await hashPassword(password)
			const verificationToken = generateVerficationToken()
			const email = rawEmail.trim().toLowerCase()
			const user: Partial<IDBUser> = {
				email,
				firstName,
				lastName,
				passwordHash,
				instagram,
				createdAt: new Date(),
				completionStatus: "COMPLETE",
				emailVerificationCode: verificationToken,
			}
			const usersWithThisEmail = await User.find({
				email: { $regex: `^${email}$`, $options: "i" },
			})
			if (usersWithThisEmail.length > 0) {
				res.status(409).json({ message: "email already exists" })
				return
			}
			await User.create(user)
			await sendVerificationEmail(user.email, user.emailVerificationCode)

			res.status(200).json({ message: "User created" })
		} catch (e) {
			if (e.code === 11000 && e.keyPattern.email) {
				res.status(409).json({ message: "email already exists" })
			} else {
				res.status(500).json({ message: "Error at createUser", error: e })
				return
			}
		}
	}
)

handler
	.use(adminUserContext)
	.get(async ({ session }: RequestWithSession, res: NextApiResponse) => {
		const user = session.user
		try {
			if (user) {
				const usersFromDb = await User.find(
					{ _id: user.id },
					{
						email: 1,
						firstName: 1,
						lastName: 1,
						instagram: 1,
						status: 1,
						type: 1,
						preferredPayment: 1,
						paypalEmail: 1,
						twintPhoneNumber: 1,
					}
				)
				if (usersFromDb.length !== 1) {
					res.status(404).json({ message: "User not found in DB" })
					return
				}
				res.status(200).json({
					isLoggedIn: true,
					...user,
					...(usersFromDb[0] as any)._doc,
				})
			} else {
				res.json({
					isLoggedIn: false,
				})
			}
		} catch (e) {
			console.log(e)
			res.status(500).json({ message: "Unknown error" + e?.message })
		}
	})

export default handler
