import mongoose, {Schema} from "mongoose";

const MODEL_NAME = 'AuthAccount';

const schema = new Schema({},{strict:false})

const AuthAccount = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema);

export default AuthAccount;
