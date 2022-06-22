
import mongoose, {Model, Schema} from "mongoose";
import { MongoObjectId } from "./mongodb";

export interface IDBRewaveId{
    rewaveId: string;
    releaseId?: MongoObjectId;
    createdAt?: Date;
}

export interface IRewaveIdModel extends Model<IDBRewaveId>{
    addFirstId: (id:string)=>Promise<IRewaveIdModel>
}

const MODEL_NAME = 'RewaveId';

const schema = new Schema<IDBRewaveId, IRewaveIdModel>({
    rewaveId: {type:String, required: true, index:true},
    releaseId: {type:Schema.Types.ObjectId},
    createdAt: {type:Date}
})

schema.static("addFirstId",async function(this:IRewaveIdModel,id:string){
    const count = await this.count();
    if(count > 0){
        throw new Error("Rewave ID Collection already has an ID / IDs")
    }
    else{
        const newId = new this({rewaveId:id});
        await newId.save();
        return newId;
    }
})


const RewaveId:IRewaveIdModel =(mongoose.models[MODEL_NAME] as IRewaveIdModel)|| mongoose.model<IDBRewaveId,IRewaveIdModel>(MODEL_NAME, schema);

export default RewaveId;
