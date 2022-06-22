
import mongoose, {Model, Schema} from "mongoose";
import { MongoObjectId } from "./mongodb";

export interface IDBIsrc{
    isrc: string;
    releaseId?: MongoObjectId;
    trackIndex?: number;
    createdAt: Date;
}

export interface IIsrcModel extends Model<IDBIsrc>{
    setFirstIsrc:(isrc:string)=>Promise<IIsrcModel>
}

const MODEL_NAME = 'Isrc';

const schema = new Schema<IDBIsrc,IIsrcModel>({
    isrc: {type:String, required: true, index:true},
    releaseId: {type:Schema.Types.ObjectId },
    trackIndex: {type:Number },
    createdAt: {type:Date }
})

schema.static("setFirstIsrc",async function(this:IIsrcModel,isrc:string){
    if(await this.count() > 0){
        throw new Error("The DB already has ISRCs.");
    }
    else{
        const newEntry = new this({isrc});
        await newEntry.save();
        return newEntry;
    }
})

const Isrc:IIsrcModel = (mongoose.models[MODEL_NAME] as IIsrcModel) || mongoose.model<IDBIsrc,IIsrcModel>(MODEL_NAME, schema);

export default Isrc;
