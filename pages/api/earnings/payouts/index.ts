import { adminUserContext, RequestWithSession } from "@middleware/nextAuthApi"
import { NextApiResponse } from "next"
import { createHandler } from "../../../../middleware"
import Payout from "../../../../models/database/payouts"

const handler = createHandler()

handler
	.use(adminUserContext)
	.post(async (req: RequestWithSession, res: NextApiResponse) => {
		try {
			const user = req.session.user;
		
			const payouts = await Payout.find({ user: user.id, status: "PENDING" })
			if (payouts.length > 0) {
				res.status(400).json({ message: "a pending payout already exists" })
				return
			}

			const payout = {
				user: user.id,
				timeRequested: new Date(),
			}
			await Payout.create(payout)

			res.status(200).json({ message: "created" })
		} catch (e) {
			console.log("Error at requestPayout:", e)
			res.status(500).json({ errorMessage: e.message })
		}
	})

handler
	.use(adminUserContext)
	.get(async (req: RequestWithSession, res: NextApiResponse) => {
		try {
			const user = req.session.user;
			

			const dbQuery: any = {}
			if (user.type === "USER") {
				dbQuery.user = user.id
			} else if (req.query.user) {
				dbQuery.user = req.query.user as string
			}
			if (req.query.status) {
				dbQuery.status = req.query.status
			}
			const payouts = await Payout.find(dbQuery)

			res.status(200).json(payouts)
		} catch (e) {
			console.log("Error at requestPayout:", e)
			res.status(500).json({ errorMessage: e.message })
		}
	})

export default handler
