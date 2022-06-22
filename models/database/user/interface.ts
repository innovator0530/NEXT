
import { Document, Model } from "mongoose";
import { MongoObjectId } from "../mongodb";

export interface FailedResult{
    successful: false;
    exceptionMessage: string;
    exceptionCode:string;
}

export interface SuccessfulResult{
    successful: true;
}

export type UserMethodResult = SuccessfulResult | FailedResult;

export interface IDBUser {
    email:string;
    createdAt: Date;
    type: 'USER' | 'ADMIN',
    status: 'APPROVAL_NEEDED' | 'APPROVED' | 'BANNED',
    emailStatus: 'VERIFICATION_NEEDED' | 'OK' | 'FORCE_PASSWORD_RESET',
    completionStatus: 'INCOMPLETE' | 'COMPLETE',
    firstName?: string;
    lastName?: string;
    passwordHash?: string;
    instagram?:string;
    paypalEmail?:string;
    twintPhoneNumber?:string;
    preferredPayment?: 'PAYPAL' | 'TWINT';
    emailVerificationCode?: string;
    emailVerified?:Date;
    image?:string;
    name?:string;
    adminContextUser?:MongoObjectId
}

// Define Methods and Virtuals here
export interface IUserDocument extends IDBUser, Document{
    id:string;
    forcePasswordReset: ()=>Promise<void>;
    resetPassword: (code:string, newPassword:string)=>Promise<UserMethodResult>;
    fullName: string|null;
}

export type EmailVerifiedStatusResult = 'INVALID_CREDENTIALS'|'VERIFIED'|'FORCE_RESET_PASSWORD'|'VERIFICATION_NEEDED'|'UNEXPECTED_ERROR'

// Define Statics here
export interface IUserModel extends Model<IUserDocument>{
    findOneById: (id:string,projection?:any)=>Promise<IUserDocument|null>;
    findOneByEmail: (email:string, projection?:any)=>Promise<IUserDocument|null>;
    login: (email:string, password:string)=>Promise<UserMethodResult&{user:IUserDocument|null}>;
    registerDefault: (
        firstName:string,
        lastName:string,
        email:string,
        password:string,
        instagram?:string,
    )=>Promise<UserMethodResult>;
    createFromNextAuth:(email:string, name:string,emailVerified?:Date,image?:string)=>Promise<IUserDocument>;
    verifyEmail: (email:string, token:string)=>Promise<UserMethodResult>,
    isEmailVerified: (email:string,password)=>Promise<{status:EmailVerifiedStatusResult}>
}

