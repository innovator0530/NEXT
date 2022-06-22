import mongoose, {ObjectId, Schema} from "mongoose";

const MODEL_NAME = 'UserAccountAction';

export interface IDBUserAccountAction{
    user: ObjectId,
    type: 'APPROVED' | 'BANNED',
    time: Date;
}

const schema = new Schema<IDBUserAccountAction>({
    user: {type: Schema.Types.ObjectId, required: true, index: true},
    type: {type: String, required: true, enum:['APPROVED','BANNED']},
    time: {type: Date, required: true, index: true},
})

const UserAccountAction = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema);

export default UserAccountAction;
