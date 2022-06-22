const {v4:uuid} = require('uuid');
import Label from "../../models/database/label";

test("Submitting A release",async()=>{
    const title = `An Example Release (Automated Test #${uuid()})`
    const label = await Label.findOne();

    const release = {
        title,

    }
})