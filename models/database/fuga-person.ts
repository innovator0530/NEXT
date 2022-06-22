
import mongoose, {Document, Model, Schema} from "mongoose";

export interface IDBFugaPerson{
    name: string;
    fugaPersonId:number;
}

const MODEL_NAME = 'FugaPerson';

export interface IFugaPersonDocument extends Document, IDBFugaPerson{
    id:string;
}

export interface IFugaPersonModel extends Model<IFugaPersonDocument>{
    createOne: (name:string, fugaPersonId:number)=>Promise<void>
}

const schema = new Schema<IDBFugaPerson,IFugaPersonModel>({
    // required
    name: {type:String, required: true, index:true},
    fugaPersonId:{type:Number, required: true},
})


schema.virtual("id").get(function(this:IFugaPersonDocument){
    return this._id.toString();
})

schema.static('createOne',async function(this:IFugaPersonModel,name:string,fugaPersonId:number){
    const p = new this();
    p.name = name;
    p.fugaPersonId = fugaPersonId;
    await p.save();
})

const FugaPerson:IFugaPersonModel = 
(mongoose.models[MODEL_NAME] as IFugaPersonModel)
|| mongoose.model<IFugaPersonDocument,IFugaPersonModel>(MODEL_NAME, schema);

export default FugaPerson;
