import mongoose, {Schema, ObjectId} from "mongoose";

const MODEL_NAME = 'ReleaseAction';

const schema = new Schema({
    release: { type: Schema.Types.ObjectId, required: true },
    user: {type:Schema.Types.ObjectId, required: true},
    time: {type: Date, required: true},
    type: {type: String, enum: ['APPROVED','REJECTED','ACTION_NEEDED']}
})
schema.index({user:1,time:-1})

const ReleaseAction = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema);

export default ReleaseAction;
