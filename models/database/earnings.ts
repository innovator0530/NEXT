import mongoose, {Schema} from "mongoose";

const MODEL_NAME = 'Earning';

const schema = new Schema({
    user: {type: Schema.Types.ObjectId, required: true, index: true},
    time: {type: Date, required: true, index: true},
    amountCents: {type: Number, required: true}, // in US cents!
    amountStr: {type:String, required: true}, // e.g. $1,045.27 from xlsx spreadsheet
    spreadsheetFileUrl:{type:String, required: true},
    spreadsheetFileName:{type:String, required:true},
    uploaded: {type: Date, required: true}
})

const Earning = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema);

export default Earning;
