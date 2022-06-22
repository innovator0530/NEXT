import { createHandler } from "@middleware"
import { NextApiRequest, NextApiResponse } from "next"
import User from "@models/database/user"

const handler = createHandler()

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const emailRaw = req.query?.email as string
		const password = req.query?.password as string
		if (!emailRaw || !password) {
			res
				.status(400)
				.send({ message: "email and password required in Query string" })
			return
		}
		const email = emailRaw.toLowerCase()

		const result = await User.isEmailVerified(
			decodeURIComponent(email),
			decodeURIComponent(password)
		)

		res.status(200).send(result)
	} catch (e) {
		console.log("e", e)
		res.status(500).send({ message: "Error" + e })
	}
})

export default handler
