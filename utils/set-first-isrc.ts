
console.log(`process.argv`, process.argv)
if (process.argv.length !== 4) {
    console.error("Usage: npm run config-app -- <ISRC>");
    process.exit(1);
}
require('dotenv').config({ path: process.argv[2] })
import Isrc from '@models/database/isrc';
import mongoose from 'mongoose';


const isrc = process.argv[3];

; (async () => {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    const newIsrc = await Isrc.setFirstIsrc(isrc);
    console.log("Set First ISRC: ",newIsrc);
    await mongoose.disconnect()
})()