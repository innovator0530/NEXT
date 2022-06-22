import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { createHandler } from "../../../middleware"
import User from "../../../models/database/user"

const handler = createHandler()


// Complete profile (e.g. Google Signup)
handler.put(
	async (
		req: NextApiRequest,
		res: NextApiResponse
	) => {
        
        const  { firstName, lastName, instagram } = req.body;
		try {
            const session = await getSession({req});
            const user = session.user;
            const existingUser = await User.findOne({email:user.email})
            if(existingUser.completionStatus === 'COMPLETE'){
                res.status(400).send({message:'User is already completed'});
                return;
            }
            console.log('existingUser :>> ', existingUser);
			const userUpdate = {
				firstName,
				lastName,
				instagram,
				createdAt: new Date(),
                completionStatus: 'COMPLETE'
			}
			await User.findOneAndUpdate({_id:existingUser._id},{$set:userUpdate});
			// await sendVerificationEmail(result._id,email);
			
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


export default handler
