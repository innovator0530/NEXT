import { NextApiResponse } from "next";
import { validateAdmin } from "../../../lib/validateUser";
import { createHandler } from "../../../middleware";
import { SessionUser, UserStatusNames } from "../../../models/user.models";
import User from "../../../models/database/user"


const handler = createHandler();

// Only admins
// List either users with status APPROVAL_NEEDED or BANNED
// GET /api/users/list?status=APPROVAL_NEEDED
// optional: add fields param for query projection

// handler.use(session).get(async ({session,query}:RequestWithSession,res:NextApiResponse)=>{
//     try{
//         const admin:SessionUser = session.get('user');
//         const checkAdminResult = validateAdmin(admin);
//         if(!checkAdminResult.authorized){
//             res.status(403).json({message:checkAdminResult.unautorizedMessage||'Unauthorized'});
//             return;
//         }
//         const status = query.status;
//         const fields = query.fields;
//         const projection = {};
//         if(query.fields){
//             if(typeof query.fields !== 'string'){throw new Error('query.fields is not string')}
//             const parts = (query.fields as string).split(',');
//             parts.forEach(p=>projection[p]=1);
//         }
//         if(Object.keys(projection).length <=0){
//             projection['passwordHash'] = 0;
//         }
//         else if(projection['passwordHash']){
//             delete projection['passwordHash']
//         }
//         if(!query.status || !(['APPROVAL_NEEDED','BANNED','APPROVED'].includes(query.status as string))){
//             res.status(400).json({message:'Please provide status as query param.'})
//             return;
//         }

//         const users = await User.find({status:query.status},projection).sort({createdAt:-1})
//         return res.status(200).json(users);

//     }
//     catch(e){
//         console.log("Error at listing Users",e);
//         res.status(500).json({errorMessage:e.message});
//     }
// })

export default handler;