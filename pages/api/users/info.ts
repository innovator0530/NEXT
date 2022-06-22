import { NextApiResponse } from "next"
import { createHandler } from "../../../middleware"
import User from "../../../models/database/user"
import { RequestWithSession, userSession } from "../../../middleware/nextAuthApi"

const handler = createHandler()

// PUT /api/users/info

// Sets Info (firstName, lastName,  instagram, paypalEmail, twintPhoneNumber, preferredPayment) of a user
// Email not supported currently
handler
	.use(userSession)
	.put(async ({ session, query,body }: RequestWithSession, res: NextApiResponse) => {
		try {
			const user = session.user;

            if(Object.keys(body).length<=0){
                res.status(400).send({message:'No Attributes in Body. Did you forget content-type?'})
                return;
            }

            const setQuery:any = {};
            if(body.firstName){setQuery.firstName = body.firstName};
            if(body.lastName){setQuery.lastName = body.lastName};
            //if(body.email){setQuery.email = body.email};
            if(body.instagram){setQuery.instagram = body.instagram};
            if(body.paypalEmail){setQuery.paypalEmail = body.paypalEmail};
            if(body.twintPhoneNumber){setQuery.twintPhoneNumber = body.twintPhoneNumber};
            if(body.preferredPayment){setQuery.preferredPayment = body.preferredPayment};
            
			const result = await User.updateOne({ _id: user.id }, { $set: setQuery})
            
			res.status(200).json({ message: "User updated" })
		} catch (e) {
			console.log("Error at setting User Info", e)
			res.status(500).json({ errorMessage: e.message })
			return
		}
	})

export default handler
