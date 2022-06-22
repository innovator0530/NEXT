

export interface Payout {
    user?:string; // ID
    sum?:number;
    email?:string;
    _id?:string;
    status:string;
    paidAmountCents:number;
    paidAmountStr:string;
    timeRequested:number|Date;
    timeApproved:number|Date;
}

export interface Earning{
    user:string;
    time: number|Date;
    amountCents:number;
    amountStr:string;
    spreadsheetFileName:string;
    spreadsheetFileUrl:string;
    uploaded: number | Date;
}