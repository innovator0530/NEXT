
export enum UserType{
    USER,
    ADMIN
}

export enum UserStatus{
    APPROVAL_NEEDED,
    APPROVED,
    BANNED
}

export const UserStatusNames = ['APPROVAL_NEEDED','APPROVED','BANNED']

export interface User {
    _id: string;
    email?: string;
    type: string;
    firstName:string;
    lastName: string;
    instagram: string;
    paypalEmail: string;
    twintPhoneNumber: string; // For payments via TWINT
    preferredPayment: string; // TWINT, PAYPAL
    status?: string; // APPROVAL_NEEDED, BANNED, APPROVED
    emailStatus?: string; //OK, VERIFICATION_NEEDED, FORCE_PASSWORD_RESET
    createdAt?:number | Date;
}

export interface SessionUser {
    id: string;
    isLoggedIn: boolean,
    status: string; // APPROVAL_NEEDED, BANNED, APPROVED
    type: string; // ADMIN, USER
    emailStatus: string; //OK, VERIFICATION_NEEDED, FORCE_PASSWORD_RESET
    userContext?: string;
}