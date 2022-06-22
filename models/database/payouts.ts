import mongoose, {Schema} from "mongoose";

const MODEL_NAME = 'Payout';

const schema = new Schema({
    user: {type: Schema.Types.ObjectId, required: true, index: true},
    adminUser: {type: Schema.Types.ObjectId},
    timeRequested: {type: Date, required: true, index: true},
    timeApproved: {type: Date, index: true},
    status: {type: String, enum: ['PENDING','APPROVED'],default: 'PENDING', required:true, index:true },
    paidAmountCents: {type: Number, required: true, default: 0}, // in US cents!
    paidAmountStr: {type:String, required: true, default: "0"}, // e.g. $1,045.27
    earningsCovered: [{type: Schema.Types.ObjectId}],
    lastEarningCoveredTime:{type:Date,index:true} // Filled when approved
})

const Payout = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema);


export default Payout;
