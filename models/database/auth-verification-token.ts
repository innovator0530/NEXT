import mongoose, {Schema} from "mongoose";

const MODEL_NAME = 'AuthVerficationToken';

const schema = new Schema({
    identifier:{type:String},
    expires: {type:Date},
    token: {type:String},
})

const AuthVerificationToken = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema);

export default AuthVerificationToken;
