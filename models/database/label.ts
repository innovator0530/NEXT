
import mongoose, {Document, Model, Schema} from "mongoose";
import { MongoObjectId } from "./mongodb";

export interface IDBLabel{
    name: string;
    user: MongoObjectId,
    editable: boolean;
    submitted?: Date;
    fugaId?:number;
}

export interface ILabelDocument extends IDBLabel, Document{
    id: string;
}

export interface ILabelModel extends Model<ILabelDocument>{
    getLabelsForUser: (id:string)=>Promise<ILabelDocument[]>,
    findOneById: (id:string)=>Promise<ILabelDocument>
}

const MODEL_NAME = 'Label';

const schema = new Schema<IDBLabel, ILabelModel>({
    // required
    name: {type:String, required: true},
    user: {type: Schema.Types.ObjectId, required: true, index: true},
    // Is editable when no relase has been submitted yet with this label
    editable: {type: Boolean, required:true, default: true},
    submitted: {type: Date, required:true, default:() => Date.now()},
    fugaId: {type:Number}
    
})
schema.index({user:1,name:1})


// virtuals
schema.virtual("id").get(function(this:ILabelDocument){
    return this._id.toString();
})

//methods

//statics
schema.statics.getLabelsForUser = function(this:ILabelModel,userId:string){
    return this.find({user:userId});
}

schema.static("findOneById",async function(this:ILabelModel,id:string){
    return await this.findOne({_id:id});
})




const Label:ILabelModel = 
(mongoose.models[MODEL_NAME] as ILabelModel) 
|| mongoose.model<ILabelDocument,ILabelModel>(MODEL_NAME, schema);

export default Label;
