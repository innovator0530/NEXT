import { adminOnlySession, RequestWithSession } from "@middleware/nextAuthApi"
import { makeObjectId } from "@models/database/mongodb"
import { NextApiResponse } from "next"
import { createHandler } from "@middleware/index"
import User from "@models/database/user"


const handler = createHandler();

handler.use(adminOnlySession).put(async(req:RequestWithSession,res:NextApiResponse)=>{
    try{
        const adminUserId = req.session.user.id;
        const user = await User.findOneById(adminUserId);
        const targetUserId = req.query?.id as string;
        if(!user){
            res.status(404).send({message:'User not found'});
            return;
        }
        if(user.type !=='ADMIN'){
            res.status(403).send({message:'User is not an admin'});
            return;
        }
        const targetUser = await User.findOneById(targetUserId);
        if(!targetUser){
            res.status(404).send({message:`Target User with ID ${targetUserId} not found`});
            return;
        }
        user.adminContextUser = makeObjectId(targetUserId);
        await user.save();
        
        res.status(200).send({message:'Successful'});
    }
    catch(e){
        console.log(e);
        res.status(500).send({message:e});
    }
})

// handler
// 	.use(session)
// 	.put(async (req: RequestWithSession, res: NextApiResponse) => {
// 		try {
// 			const user: SessionUser = req.session.get("user")
// 			const vr = validateAdmin(user)
// 			if (!vr.authorized) {
// 				res
// 					.status(403)
// 					.json({ message: vr.unautorizedMessage || "Unauthorized" })
// 				return
// 			}

// 			const userId = req.query.id as string
// 			const users = await User.find({ _id: userId })
// 			if (users.length !== 1) {
// 				res.status(404).json({ message: "User not found" })
// 				return
// 			}

// 			user.userContext = userId
// 			req.session.set("user", user)

// 			await req.session.save()
// 			res.status(200).json({ message: "Set user context successfully" })
// 		} catch (e) {
// 			console.log("Error at useUser:")
// 			res.status(500).json({ message: e.message })
// 		}
// 	})

export default handler
