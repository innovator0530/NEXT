import mongoose, {Schema} from "mongoose";

// This is a MongoDB collection that has only one entry, which contains the App Config (moderator-controllable)

const MODEL_NAME = 'Config';

const schema = new Schema({
    loginEnabled: {type:Boolean, required: true },
    signupEnabled: {type:Boolean, required: true },
    newReleasesEnabled: {type:Boolean, required: true }
})

const AppConfig = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema);


export interface GlobalAppConfig{
    loginEnabled:boolean;
    signupEnabled:boolean;
    newReleasesEnabled:boolean;
}

export default AppConfig;
