import { getValidationErrorsForProduct } from "@lib/fuga/validationErrors";
import Release from "@models/database/release"


export const getValidationErrorsForRelease = async (releaseId:string):Promise<{
    validationErrors:string
}>=>{
    const release = await Release.findOneById(releaseId);
    if(!release.fugaProductId) {return ({validationErrors:'Error with fetching validation errors'})}
    else {
        try{
            const {validation_rules} = await getValidationErrorsForProduct(release.fugaProductId);
            let valString = '';
            if(validation_rules.publish.assets> 0 || validation_rules.publish.items.length>0){
                if(validation_rules.publish.assets>0){
                    valString += `Error with ${validation_rules.publish.assets} asset(s) - Please check the assets at FUGA.\n`;
                }
                if(validation_rules.publish.items.length>0){
                    valString += validation_rules.publish.items.map((m,i)=>`Validation Error ${i+1}: "${m.message}"`).join('\n');
                }
            }
            else{
                valString = 'No validation errors';
            }
            return {
                validationErrors:valString
            }
        }
        catch(e){
            console.log('e', e);
            return {validationErrors:'Error with fetching validation errors'}
        }
    }
}