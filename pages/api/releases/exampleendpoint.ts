import { NextApiResponse } from "next"
import { createHandler } from "../../../middleware"
import { RequestWithSession } from "../../../middleware/nextAuthApi"
import { adminUserContext } from "../../../middleware/nextAuthApi";


const handler = createHandler()


handler
.use(adminUserContext)
	.post(async (
		req: RequestWithSession,
		res: NextApiResponse
	) => {
		try {
			const user = req.session.user
			

            res.status(200).json({message:'Successful'})

		} catch (e) {
			console.log("Got Error at POST ...", e)
			res.status(500).json({ errorMessage: e.message })
		}
	})

export default handler
