import { NextApiResponse } from "next"
import { validateAdmin } from "../../../../../lib/validateUser"
import { createHandler } from "../../../../../middleware"
import { SessionUser } from "../../../../../models/user.models"
import Release from "../../../../../models/database/release";
const handler = createHandler()

// For Admins only
// Update a release
// PUT /api/moderation/releases/[release]
// handler
// 	.use(session)
// 	.put(
// 		async (
// 			{ session, query, body }: RequestWithSession,
// 			res: NextApiResponse
// 		) => {
// 			try {
// 				const user: SessionUser = session.get("user")
// 				const checkAdminResult = validateAdmin(user)
// 				if (!checkAdminResult.authorized) {
// 					res.status(403).json({ message: checkAdminResult || "Unauthorized" })
// 					return
// 				}
// 				const sessionId: string = query.release as string
// 				if (!sessionId || sessionId === "undefined" || sessionId === "null") {
// 					res
// 						.status(400)
// 						.json({ message: `Session ID Error. cannot be:${sessionId}.` })
// 					return
// 				}

// 				if (Object.keys(body).length <= 0) {
// 					res
// 						.status(400)
// 						.json({
// 							message:
// 								"Request Object has no Keys. Forgot content-type:application/json?",
// 						})
// 					return
// 				}

// 				const {
// 					title,
// 					musicLabel,
// 					artists,
// 					genres,
// 					language,
// 					explicit,
// 					soundtracks,
// 					digitalReleaseDate,
// 					originalReleaseDate,
// 					copyrightBy,
// 					copyrightYear,
// 					publishingRightsBy,
// 					publishingRightsYear,
// 					moderationComment,
// 					rejectionReason,
// 					stores,
// 					freeBeats,
// 					upc,
// 				} = body;

// 				const setObject = {
// 					title,
// 					musicLabel,
// 					artists,
// 					genres,
// 					language,
// 					explicit,
// 					soundtracks,
// 					digitalReleaseDate,
// 					originalReleaseDate,
// 					copyrightBy,
// 					copyrightYear,
// 					publishingRightsBy,
// 					publishingRightsYear,
// 					moderationComment,
// 					rejectionReason,
// 					stores,
// 					freeBeats,
// 					upc,
// 				}

//             const result = await Release.updateOne({_id:body._id},{$set:setObject});
//             console.log("Result:",result);
			
//             res.status(200).json({message:'successful'})

// 			} catch (e) {
// 				console.log("Error at updating Release (ADMIN)", e)
// 				res.status(500).json({ message: e.message })
// 			}
// 		}
// 	)


export default handler;