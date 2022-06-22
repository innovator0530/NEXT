import { queryUsers } from "@controller/user-database/queryUsers"
import { adminOnlySession, RequestWithSession } from "@middleware/nextAuthApi"
import { NextApiResponse } from "next"
import { createHandler } from "../../../../middleware"

const handler = createHandler()

handler
	.use(adminOnlySession)
	.get(async (req: RequestWithSession, res: NextApiResponse) => {
		try {
			const searchTerm = req?.query?.search
				? decodeURIComponent(req?.query?.search as string)
				: null
			const exclusiveStartEmail = req?.query?.exclusive_start_email
				? decodeURIComponent(req.query.exclusive_start_email as string)
				: null
			const params: { searchTerm?: string; exclusiveStartEmail?: string } = {}
			if (searchTerm) {
				params.searchTerm = searchTerm
			}
			if (exclusiveStartEmail) {
				params.exclusiveStartEmail = exclusiveStartEmail
			}
			if (searchTerm) {
				params.searchTerm = searchTerm
			}
			// console.log('exclusiveStartEmail,searchTerm', exclusiveStartEmail,searchTerm);
			const users = (await queryUsers(params)).users

			res.status(200).send({ users })
		} catch (e) {
			console.log("e", e)
			res.status(500).send({ message: e })
		}
	})

// Only admins
// Detailed List about all users
// GET /api/users/database
// optional: add fields param for query projection

// handler.use(session).get(async ({session,query}:RequestWithSession,res:NextApiResponse)=>{
//     try{
//         const admin:SessionUser = session.get('user');
//         const checkAdminResult = validateAdmin(admin);
//         if(!checkAdminResult.authorized){
//             res.status(403).json({message:checkAdminResult.unautorizedMessage||'Unauthorized'});
//             return;
//         }

//         // Users
//         const users = await User.find({type:'USER'},{
//             firstName: 1,
//             lastName: 1,
//             email: 1,
//             createdAt: 1,

//         }).sort({email:1})

//         const resultUsers = [];

//         // Add additional data for each user
//         for(let i = 0; i<users.length; i++){
//             // Find total Earnings
//             const user = {...users[i]._doc};
//             const earnings = await Earning.find({user:user._id},{amountCents:1});
//             user.totalEarnings = earnings.reduce((acc,curr)=>acc+curr.amountCents,0);

//             // Count amount of payouts
//             const payouts = await Payout.find({user:user._id},{});
//             user.payoutRequestCount = payouts.length;

//             // Count releases
//             const releases = await Release.find({user:user._id},{soundtracks:1,status:1});
//             user.releaseCount = releases.length;
//             user.trackCount = releases.reduce((acc,curr)=>acc+(curr.soundtracks?curr.soundtracks.length:0),0)
//             user.rejectedCount = releases.reduce((acc,curr)=>curr.status==='REJECTED'?++acc:acc,0);

//             resultUsers.push(user);
//         }

//         return res.status(200).json(resultUsers);

//     }
//     catch(e){
//         console.log("Error at listing Users",e);
//         res.status(500).json({errorMessage:e.message});
//     }
// })

export default handler
