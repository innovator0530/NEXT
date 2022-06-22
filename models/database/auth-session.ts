import mongoose, {Schema} from "mongoose";

const MODEL_NAME = 'AuthSession';

const schema = new Schema({
    // required
    id:{type:String},
    sessionToken: {type:String},
    userId: {type:String},
    expires:{type:Date},
    // opt
    adminContextUser: {type: Schema.Types.ObjectId},
})

const AuthSession = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema);

export default AuthSession;
