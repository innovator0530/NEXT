import Release from "../../models/database/release";
import {deliverRelease} from "./deliverRelease"

describe('Test Final Release Delivery',()=>{
    

    test('deliver test release', async ()=>{
        
        const release = await Release.findOne({rewaveId:'REWAVE00000949'});
        const result = await deliverRelease(release.id)
        console.log('result', result);
    })

})