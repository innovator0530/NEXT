import { adminUserContext, RequestWithSession } from "@middleware/nextAuthApi"
import { NextApiResponse } from "next"
import { createHandler } from "../../../middleware"
import Earning from "../../../models/database/earnings"
import Payout from "../../../models/database/payouts"

const handler = createHandler()

handler
	.use(adminUserContext)
	.get(async (req: RequestWithSession, res: NextApiResponse) => {
		try {
			const user = req.session.user

			const lastPayouts = await Payout.find({
				user: user.id,
				status: "APPROVED",
			})
				.sort({ lastEarningCoveredTime: -1 })
				.limit(1)
			const lastPayout = lastPayouts.length > 0 ? lastPayouts[0] : {}
			const newEarnings = await Earning.find(
				{ user: user.id, time: { $gt: lastPayout.lastEarningCoveredTime || 0 } },
				{ amountCents: 1 }
			)
			const balance = newEarnings.reduce(
				(acc, curr) => (acc += curr.amountCents),
				0
			)

			res.status(200).json({ balance })
		} catch (e) {
			console.log("Error at requestPayout:", e)
			res.status(500).json({ errorMessage: e.message })
		}
	})

export default handler
