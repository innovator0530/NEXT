import {
	generateMigrationReport,
	getMostRecentMigrationReport,
} from "@controller/migration/migration"
import { createHandler } from "@middleware/index"
import { adminOnlySession, RequestWithSession } from "@middleware/nextAuthApi"
import { NextApiResponse } from "next"

const handler = createHandler()

handler
	.use(adminOnlySession)
	.post(async (req: RequestWithSession, res: NextApiResponse) => {
		try {
			generateMigrationReport()
			res.status(200).send("Started")
		} catch (e) {
			if (e.message === "Report is already running") {
				res.status(400).send("Process is already running")
			} else {
				console.log("e", e)
				res.status(500).send(e.message)
			}
		}
	})

handler
	.use(adminOnlySession)
	.get(async (req: RequestWithSession, res: NextApiResponse) => {
		try {
			let allowUnfinished = false
			if (req.query.allowunfinished === "true") {
				allowUnfinished = true
			}
			const reports = await getMostRecentMigrationReport(allowUnfinished)
			res.status(200).send({ reports })
		} catch (e) {
			console.log("e", e)
			res.status(500).send(e.message)
		}
	})

export default handler
