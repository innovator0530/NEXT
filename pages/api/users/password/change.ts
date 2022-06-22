import { NextApiRequest, NextApiResponse } from "next"
import { createHandler } from "../../../../middleware"
import User from "../../../../models/database/user"
import bcrypt from "bcrypt"
import { hashPassword, validatePasswordHash } from "../../../../lib/password"
import { RequestWithSession, userSession } from "@middleware/nextAuthApi"
const saltRounds = 10

const handler = createHandler()

// PUT /api/users/password/change?old_password=abc&new_password=def
// Change Password
// handler.use(session).put(async({session,query}:any,res:NextApiResponse)=>{
//     try{
//         const user = session.get('user');
//         if (!user || !user.isLoggedIn) {
//             res.status(403).json({message:'Must be logged in to change passwords'});
//             return
//         }
//         if( !query.old_password || !query.new_password){
//             res.status(400).json({message:'Please provide old_password and new_password as query param!'});
//             return
//         }
//         if( query.old_password === query.new_password){
//             res.status(400).json({message:'New password must be different!'})
//             return;
//         }
//         const usersFromDb = await User.find({_id:user.id});
//         if(usersFromDb.length!==1){
//             res.status(404).json({message:'User not found in DB'})
//             return
//         }

//         const userEntry = usersFromDb[0]._doc;
//         const oldPasswordHash = userEntry.passwordHash;
//         if(!validatePasswordHash(query.old_password,oldPasswordHash)){
//             res.status(400).json({message:'Old Password Wrong', code:'OLD_PASSWORD_WRONG'});
//             return;
//         }

//         const newPasswordHash = await hashPassword(query.new_password);
//         await User.updateOne({_id:user.id},{passwordHash:newPasswordHash});

//         res.status(200).json({message:'Password changed successfully'})
//     }
//     catch(e){
//         console.log("Error at Change Password",e);
//         res.status(500).json({errorMessage:e.message});
//     }
// })

handler
	.use(userSession)
	.put(
		async (
			{ session, query, body }: RequestWithSession,
			res: NextApiResponse
		) => {
			try {
				const user = session.user

				if (!query.old_password || !query.new_password) {
					res.status(400).json({
						message:
							"Please provide old_password and new_password as query param!",
					})
					return
				}
				if (query.old_password === query.new_password) {
					res.status(400).json({ message: "New password must be different!" })
					return
				}
				const userFromDb = await User.findOneById(user.id)
				if (!userFromDb) {
					res.status(404).send({ message: "User not found" })
					return
				}

				const oldPasswordHash = userFromDb.passwordHash
				if (
					!validatePasswordHash(query.old_password as string, oldPasswordHash)
				) {
					res
						.status(400)
						.json({ message: "Old Password Wrong", code: "OLD_PASSWORD_WRONG" })
					return
				}

				const newPasswordHash = await hashPassword(query.new_password as string)
				await User.updateOne(
					{ _id: user.id },
					{ passwordHash: newPasswordHash }
				)

				res.status(200).json({ message: "Password updated successfully" })
			} catch (e) {
				console.log("Error at setting User Info", e)
				res.status(500).json({ errorMessage: e.message })
				return
			}
		}
	)

export default handler
