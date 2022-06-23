import Earning from "@models/database/earnings";
import Payout from "@models/database/payouts";
import Release from "@models/database/release";
import User from "@models/database/user"
import { IUserDocument } from "@models/database/user/interface";

const USER_PAGE_LIMIT = 15

const searchQueryUsers = async ({searchTerm,exclusiveStartEmail}:{searchTerm:string,exclusiveStartEmail?:string}):Promise<Pick<IUserDocument,'id'|'email'|'firstName'|'lastName'|'createdAt'|'status'>[]> =>{
        const searchTermLowerCase = searchTerm.toLowerCase();
        const allUsers = await User.find({type:'USER'},{email:1,firstName:1,lastName:1,createdAt:1,status:1}).sort({email:1}); 
        const releases = await Release.find({status:{$ne:'DRAFT'}},{user:1,upc:1});
        const foundUsers = allUsers.filter((u)=>{
            const email = u.email.toLowerCase();
           
            if(email.includes(searchTermLowerCase)){return true;}
            if(releases.reduce((acc,curr)=>(String(curr.user)==u.id && curr.upc===searchTerm)?++acc:acc,0)){
                return true;}  
            const fullName = `${u.firstName} ${u.lastName}`; 
            if(fullName.includes(searchTermLowerCase)){return true;}
        });
        if(exclusiveStartEmail){
            let index = 0;
            foundUsers.forEach((u,i)=>{
                if(u.email===exclusiveStartEmail){
                    index = i;
                }
            })
            return foundUsers.slice(index+1,Math.min(foundUsers.length,index+USER_PAGE_LIMIT))
        }
        else{
            return foundUsers.slice(0,Math.min(foundUsers.length,USER_PAGE_LIMIT));
        }
}

export interface IUserQueryResult{
    id:string,
    firstName:string,
    lastName:string,
    email:string,
    createdAt:string,
    earningsAmountCents:number,
    payoutsCount:number,
    releasesCount:number,
    trackCount:number,
    rejectedCount:number,
    status:string
}

export const queryUsers = async({searchTerm,exclusiveStartEmail}:{searchTerm?:string,exclusiveStartEmail?:string}):Promise<{
    users:IUserQueryResult[]  
}>=>{

    // Query users
    let users:Pick<IUserDocument,'id'|'email'|'firstName'|'lastName'|'createdAt'|'status'>[];
    if(searchTerm){
        users = await searchQueryUsers({searchTerm,exclusiveStartEmail});
        console.log('users', users);
    }
    else{
        const filterQuery:any = exclusiveStartEmail ? {type:'USER',email:{$gt:exclusiveStartEmail}} : {type:'USER'};
        users = await User.find(filterQuery,{email:1,firstName:1,lastName:1,createdAt:1,status:1}).sort({email:1}).limit(USER_PAGE_LIMIT)
    }
    // Add metadata
    const resultList:IUserQueryResult[] = []
    for(let i = 0; i<users.length;i++){
        const user = users[i];
        // Add up all earnings
        const earnings = await Earning.find({user:user.id},{amountCents:1});
        const totalEarnings = earnings.reduce((acc,curr)=>acc+curr.amountCents,0);
        const payouts = await Payout.find({user:user.id},{});
        const releases = await Release.find({user:user.id,status:{$ne:'DRAFT'}},{soundtracks:1,status:1});
        const trackCount = releases.reduce((acc,curr)=>acc+(curr.soundtracks?curr.soundtracks.length:0),0);
        const rejectedCount = releases.reduce((acc,curr)=>curr.status==='REJECTED'?++acc:acc,0);
        resultList.push({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: user.createdAt.toISOString(),
            earningsAmountCents: totalEarnings,
            payoutsCount: payouts.length,
            releasesCount: releases.length,
            trackCount,
            rejectedCount,
            status:user.status
        })
    }

    return{users:resultList}
}