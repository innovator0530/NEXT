import { SessionUser } from "../models/user.models";


export const validateUser = (user:SessionUser):{authorized:boolean, unautorizedMessage?:string}=>{
    if(!user || !user.isLoggedIn){
        return {authorized:false, unautorizedMessage:'No User Session or User not logged in'};
    }
    if(user.emailStatus !== 'OK'){
        return {authorized: false, unautorizedMessage: 'Email not verified or Password Reset required'};
    }
    if(user.status !== 'APPROVED'&&user.status!=='APPROVAL_NEEDED'){
        return {authorized: false, unautorizedMessage: 'User is probably banned'};
    }
    
    return {authorized: true};
}

export const validateAdmin = (user:SessionUser):{authorized:boolean, unautorizedMessage?:string}=>{
    if(!user || !user.isLoggedIn){
        return {authorized:false, unautorizedMessage:'No User Session or User not logged in'};
    }
    if(user.type !== 'ADMIN'){
        return {authorized:false, unautorizedMessage:'User must be an admin to perform this action'}
    }
    else return validateUser(user);
}