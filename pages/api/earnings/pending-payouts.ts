import { adminOnlySession, RequestWithSession } from "@middleware/nextAuthApi";
import { NextApiResponse } from "next";
import { validateAdmin } from "../../../lib/validateUser";
import { createHandler } from "../../../middleware";
import Earning from "../../../models/database/earnings";
import Payout from "../../../models/database/payouts";
import User from "../../../models/database/user";
import { SessionUser } from "../../../models/user.models";

const handler = createHandler();


// Only for ADMINS
// GET /api/earnings/pending-payouts
// retrieve all pending payouts with their sum.

handler
.use(adminOnlySession)
.get(async(req:RequestWithSession,res:NextApiResponse)=>{
    try{

        const payouts = await Payout.find({status:'PENDING'});

        const payoutsResult = [];
        for(let i = 0; i<payouts.length; i++){
            const payout = payouts[i];
            const users = await User.find({_id:payout.user},{email:1});
            const email = users.length>0 ? users[0].email : null;
            const lastPayouts = await  Payout.find({user:payout.user,status:'APPROVED'}).sort({lastEarningCoveredTime:-1}).limit(1);
            const lastPayout = lastPayouts.length > 0 ? lastPayouts[0] : {};
            const newEarnings = await Earning.find({user:payout.user, time:{$gt:lastPayout.lastEarningCoveredTime||0}},{amountCents:1,time:1});
            const sum = newEarnings.reduce((acc,curr)=>acc+=curr.amountCents,0)            
            payoutsResult.push({sum,email,...payout._doc});
        }

        res.status(200).json(payoutsResult)
    }
    catch(e){
        console.log("Error at requestPayout:",e);
        res.status(500).json({errorMessage:e.message})
    }
})

export default handler;