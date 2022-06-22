import { makeObjectId, MongoObjectId } from "@models/database/mongodb";
import RewaveId, { IDBRewaveId } from "@models/database/rewaveId";
import { ObjectId } from "mongoose";
const PREFIX = 'REWAVE';
const REWAVE_ID_DIGITS = 8;

export const MIN_REWAVE_ID_INDEX = 777;

export const getLastRewaveId = async():Promise<string>=>{
    const objs = await RewaveId.find({},{rewaveId:1}).sort({rewaveId:-1}).limit(1);
    const obj = objs[0];
    if((typeof obj?.rewaveId !== 'string') || obj.rewaveId.length !== PREFIX.length+REWAVE_ID_DIGITS){
        throw new Error('Last Rewave ID Invalid');
    }
    return obj.rewaveId;
}

export const getNextRewaveId = async(releaseId?:string):Promise<string>=>{
    const lastRewaveId = await getLastRewaveId();
    const lastIdNumber = parseInt(lastRewaveId.substring(PREFIX.length));
    const newNumber = lastIdNumber +1;
    const newId = PREFIX+(String(newNumber).padStart(REWAVE_ID_DIGITS,'0'));
    const params:any = {
        rewaveId: newId,
        createdAt: new Date()   
    };
    if(releaseId){
        params.releaseId = releaseId
    }
    await RewaveId.create(params);
    return newId;
}

