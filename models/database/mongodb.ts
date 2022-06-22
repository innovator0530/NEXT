import mongoose from "mongoose";

export type MongoObjectId = mongoose.Types.ObjectId;

export const makeObjectId:(hexString:string)=>mongoose.Types.ObjectId =mongoose.Types.ObjectId.createFromHexString;