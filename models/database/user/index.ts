import mongoose, { Schema } from "mongoose";
import { IDBUser, IUserDocument, IUserModel } from "./interface";
import { userCreateFromNextAuth, userFindOneByEmail, userFindOneById, userGetId, userIsEmailVerified, userLogin, userRegisterDefault, userVerifyEmail } from "./services";

const MODEL_NAME = 'User';

const schema = new Schema<IDBUser, IUserModel>({
    // required
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        index: true,
        lowercase: true
     },
    createdAt: { type: Date, required: true, default:()=>Date.now() },
    type: { type: String, required: true, enum: ['ADMIN', 'USER'], default: 'USER' },
    status: { type: String, required: true, enum: ['APPROVAL_NEEDED', 'APPROVED', 'BANNED'], default: 'APPROVAL_NEEDED' },
    emailStatus: { type: String, required: true, default: 'VERIFICATION_NEEDED', enum: ['VERIFICATION_NEEDED', 'OK', 'FORCE_PASSWORD_RESET'] },
    completionStatus: { type: String, required: true, default: 'INCOMPLETE', enum: ['INCOMPLETE', 'COMPLETE'] },

    // optional
    firstName: { type: String },
    lastName: { type: String },
    passwordHash: { type: String },
    instagram: { type: String },
    paypalEmail: { type: String },
    twintPhoneNumber: { type: String },
    preferredPayment: { type: String, enum: ['PAYPAL', 'TWINT'] },
    emailVerificationCode: { type: String },
    emailVerified: { type: Date },
    image: { type: String },
    name: { type: String },
    adminContextUser:{type: Schema.Types.ObjectId}
})

// Virtuals
schema.virtual("id").get(userGetId)


// Methods

schema.statics.findOneByEmail = userFindOneByEmail;
schema.statics.findOneById = userFindOneById;
schema.statics.login = userLogin;
schema.statics.registerDefault = userRegisterDefault;
schema.statics.createFromNextAuth = userCreateFromNextAuth;
schema.statics.verifyEmail = userVerifyEmail;
schema.statics.isEmailVerified = userIsEmailVerified;


const User: IUserModel = 

(mongoose.models[MODEL_NAME] as IUserModel) 
|| mongoose.model<IUserDocument, IUserModel>(MODEL_NAME, schema);




export default User;
