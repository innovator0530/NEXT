import { adminOnlySession, RequestWithSession } from "@middleware/nextAuthApi"
import { NextApiResponse } from "next"
import { createHandler } from "../../../../../middleware"
import Earning from "../../../../../models/database/earnings"
import Payout from "../../../../../models/database/payouts"

const handler = createHandler()

// GET /api/earnings/payouts/{id}/approve
// ADMINS ONLY
// APPROVE a payout or mark as paid

// provide ?sum=123 (sum in cents) to check agains db

handler
	.use(adminOnlySession)
	.put(async (req: RequestWithSession, res: NextApiResponse) => {
		try {
			const adminUser = req.session.user

			const payoutId = req.query.id as string
			const sum = parseInt(req.query.sum as string)
			if (!sum || sum === NaN) {
				res.status(400).json({
					message: "Please provide Sum to check against existing data",
				})
				return
			}

			// Get the Payout from the DB
			const payouts = await Payout.find({ _id: payoutId })
			if (payouts.length !== 1) {
				res.status(404).json({ message: "Payout not found" })
				return
			}
			const payout = payouts[0]

			// Calculate the Payout Sum
			// get the most recent approved payout, if exists
			const lastPayouts = await Payout.find({
				user: payout.user,
				status: "APPROVED",
			})
				.sort({ lastEarningCoveredTime: -1 })
				.limit(1)
			const lastPayout = lastPayouts.length > 0 ? lastPayouts[0] : {}
			// Collect all unpaid Earnings
			const newEarnings = await Earning.find(
				{ user: payout.user, time: { $gt: lastPayout.lastEarningCoveredTime || 0 } },
				{ amountCents: 1,time:1 }
			).sort({time:1})
			// Sum these earnings
			const balance = newEarnings.reduce(
				(acc, curr) => (acc += curr.amountCents),
				0
			)

			if (newEarnings.length < 1) {
				res
					.status(400)
					.json({ message: "Payout must at least cover 1 earning!" })
				return
			}

			if (balance !== sum) {
				res
					.status(400)
					.json({ message: "Provided sum does not match the calculated sum" })
				return
			}

			await Payout.updateOne(
				{ _id: payoutId },
				{
					$set: {
						status: "APPROVED",
						adminUser: adminUser.id,
						timeApproved: Date.now(),
						paidAmountCents: balance,
						paidAmountStr: "$" + balance / 100,
						earningsCovered: newEarnings.map(e=>e._id),
						lastEarningCoveredTime: newEarnings[newEarnings.length-1].time
					},
				}
			)

			res.status(200).json({ message: "Payout updated" })
		} catch (e) {
			console.log("Error at approving Payout", e)
			res.status(500).json({ errorMessage: e.message })
		}
	})

export default handler
