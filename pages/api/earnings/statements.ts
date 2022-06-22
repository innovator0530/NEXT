import { adminUserContext, RequestWithSession } from "@middleware/nextAuthApi"
import { NextApiResponse } from "next"
import { resolveS3Url } from "../../../lib/s3/resolveS3Url"
import { createHandler } from "../../../middleware"
import Earning from "../../../models/database/earnings"

const handler = createHandler()

// For users
// GET /api/earnings/statements

handler
.use(adminUserContext)
	.get(async (req: RequestWithSession, res: NextApiResponse) => {
		try {
			const user = req.session.user;


            const earnings = await Earning.find({user:user.id}).sort({time:-1});

            for(let i = 0; i<earnings.length; i++){
                try{
                    earnings[i].spreadsheetFileUrl = await resolveS3Url(earnings[i].spreadsheetFileUrl);
                }
                catch(e){
                    console.log("Error at resolving Statement S3 URL:",e);
                }
            }

			res.status(200).json({ earnings })
		} catch (e) {
			console.log("Error at get Earnings Statements:", e)
			res.status(500).json({ errorMessage: e.message })
		}
	})

export default handler
