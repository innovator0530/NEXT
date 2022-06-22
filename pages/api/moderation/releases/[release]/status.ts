import { NextApiResponse } from "next"
import { validateAdmin } from "../../../../../lib/validateUser"
import { createHandler } from "../../../../../middleware"
import { SessionUser } from "../../../../../models/user.models"
import Release from "../../../../../models/database/release"
import ReleaseAction from "../../../../../models/database/releaseAction"

const handler = createHandler()

function pad(n, width, z) {
	z = z || "0"
	n = n + ""
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
}

// handler
// 	.use(session)
// 	.put(
// 		async (
// 			{ session, query, body }: RequestWithSession,
// 			res: NextApiResponse
// 		) => {
// 			try {
// 				console.log("body:", body)

// 				if (!body.status) {
// 					res.status(400).json({ message: "No status in Body" })
// 					return
// 				}
// 				const releaseId = query.release
// 				if (releaseId === "undefinded" || releaseId === "null") {
// 					res
// 						.status(400)
// 						.json({ message: "Release ID cannot be null or undefined" })
// 					return
// 				}
// 				const user: SessionUser = session.get("user")
// 				const checkUserResult = validateAdmin(user)
// 				if (!checkUserResult.authorized) {
// 					res
// 						.status(403)
// 						.json({
// 							message: checkUserResult.unautorizedMessage || "Unauthorized",
// 						})
// 					return
// 				}
// 				const existingReleases = await Release.find(
// 					{ _id: releaseId },
// 					{ status: 1, user: 1, rewaveId: 1 }
// 				)
// 				if (existingReleases.length !== 1) {
// 					res.status(404).json({ message: "Release Not found" })
// 					return
// 				}
// 				const existingRelease = existingReleases[0]
// 				if (existingRelease.status === body.status) {
// 					res.status(400).json({ message: "Status is the same" })
// 					return
// 				}

// 				const setObj:any = { status: body.status }
// 				if (body.status === "APPROVED" && !existingRelease.rewaveId) {
//                     const highestIds = await Release.find({rewaveId:{$exists:true}},{rewaveId:1}).sort({rewaveId:-1}).limit(1);
//                     if(highestIds.length > 0){
//                         const highestId = highestIds[0].rewaveId;
//                         let number = parseInt(highestId.substring(6));
//                         number++;
//                         setObj.rewaveId = 'REWAVE'+pad(number,8,null);
//                     }
//                     else{
//                         setObj.rewaveId = 'REWAVE00000001';
//                     }
// 				}

// 				await Release.updateOne({ _id: existingRelease._id }, { $set: setObj })
// 				try {
// 					await ReleaseAction.create({
// 						release: existingRelease._id,
// 						user: existingRelease.user,
// 						time: new Date(),
// 						type: body.status,
// 					})
// 				} catch (e) {
// 					console.log("Error at creating Release Action:", e)
// 				}

// 				res.status(200).json({ message: "Successful" })
// 			} catch (e) {
// 				console.log("Error at Moderation set Release Status:", e)
// 				res.status(500).json({ errorMessage: e.message })
// 			}
// 		}
// 	)

export default handler
