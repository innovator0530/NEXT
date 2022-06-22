import { NextApiRequest, NextApiResponse } from "next"
import { createHandler } from "../../../middleware"
import Release from "../../../models/database/release"

const handler = createHandler()

// handler.use(session).get(async ({ session }: any, res: NextApiResponse) => {
// 	const user = session.get("user")
// 	if (!user || !user.isLoggedIn) {
// 		res.status(403).json({ message: "Unauthorized" })
// 		return
// 	}
// 	const releases = await Release.find({ user: user.id, status: "DRAFT" })
// 	console.log(releases)
// 	res.status(200).json(releases)
// })

export default handler
