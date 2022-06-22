import { NextApiRequest, NextApiResponse } from "next"
import { hashPassword } from "../../../../lib/password"
import { createHandler } from "../../../../middleware"
import User from "../../../../models/database/user"

const handler = createHandler()

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { email, password, token } = req.body
        console.log( email, password, token);
        
		const users = await User.find(
			{ email },
			{ emailStatus: 1, emailVerificationCode: 1 }
		)
		if (users.length !== 1) {
			res.status(404).json({ message: "User not found" })
			return
		}
		const user = users[0]
		if (user.emailStatus === "VERIFICATION_NEEDED") {
			res.status(400).json({ message: "User must verify his/her E-Mail first" })
			return
		}
		if (
			!user.emailVerificationCode ||
			typeof user.emailVerificationCode !== "string" ||
			user.emailVerificationCode.length <= 1 ||
			user.emailVerificationCode !== token
		) {
            res.status(400).json({message:'Verification Token invalid'})
            return;
		}
        const passwordHash = await hashPassword(password);
        await User.updateOne({_id:user.id},{$set:{emailStatus:'OK',passwordHash},$unset:{emailVerificationCode:""}})
        return res.status(200).json({message:'Password reset successfully'});
    } catch (e) {
		console.log("Error at Reset password", e)
		res.status(500).json({ errorMessage: e.message })
	}
})

export default handler
