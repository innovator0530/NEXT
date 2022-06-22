
console.log(`process.argv`, process.argv)
if (process.argv.length !== 4) {
    console.error("Usage: npm run config-app -- <REWAVE ID>");
    process.exit(1);
}
require('dotenv').config({ path: process.argv[2] })
import RewaveId from '@models/database/rewaveId';
import mongoose from 'mongoose';


const rewaveId = process.argv[3];

; (async () => {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    const newId = await RewaveId.addFirstId(rewaveId);
    console.log("Set First ID: ",newId);
    await mongoose.disconnect()
})()