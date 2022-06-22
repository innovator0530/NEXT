import { NextApiResponse } from "next";
import { validateAdmin } from "../../../../lib/validateUser";
import { createHandler } from "../../../../middleware";
import { SessionUser, UserStatusNames } from "../../../../models/user.models";
import User from "../../../../models/database/user"
import Earning from "../../../../models/database/earnings"
import Payout from "../../../../models/database/payouts"
import Release from "../../../../models/database/release"
import { adminOnlySession, RequestWithSession } from "@middleware/nextAuthApi";

const handler = createHandler();

// Only admins
// Details about one user
// GET /api/users/database
// optional: add fields param for query projection

handler.use(adminOnlySession).get(async ({session,query}:RequestWithSession,res:NextApiResponse)=>{
    try{

        // User
        const users = await User.find({_id:(query.userid as string)},{
            firstName: 1,
            lastName: 1,
            email: 1,
            createdAt: 1,
            instagram: 1,
            paypalEmail: 1,
            twintPhoneNumber: 1,
            status: 1,
            emailStatus: 1,
            preferredPayment: 1,
        }).sort({email:1})

        if(users.length !== 1){
            res.status(404).json({message:'User not found'});
            return;
        }

        // Add additional data for each user
        // Find total Earnings
        const user:any = {...users[0].toObject()};
        const userId = users[0].id;
        const earnings = await Earning.find({user:userId},{amountCents:1});
        user.totalEarnings = earnings.reduce((acc,curr)=>acc+curr.amountCents,0);
        
        // Count amount of payouts
        const payouts = await Payout.find({user:user._id},{});
        user.payoutRequestCount = payouts.length;

        // Count releases
        const releases = await Release.find({user:user._id},{soundtracks:1,status:1});
        user.releaseCount = releases.length;
        user.trackCount = releases.reduce((acc,curr)=>acc+(curr.soundtracks?curr.soundtracks.length:0),0)
        user.rejectedCount = releases.reduce((acc,curr)=>curr.status==='REJECTED'?++acc:acc,0);


        return res.status(200).json(user);

    }
    catch(e){
        console.log("Error at listing Users",e);
        res.status(500).json({errorMessage:e.message});
    }
})

export default handler;