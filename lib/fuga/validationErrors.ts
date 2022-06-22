import { fetchFuga } from "./fuga"


export const getValidationErrorsForProduct = async (productId:number):Promise<{
    validation_rules: {
        publish:{
            assets: number,
            items:{message:string}[]
        }
    }
}>=>{
    const {data} = await fetchFuga(`/products/${productId}`);
    // if(!data?.live_link||!Array.isArray(data?.live_link)){
    //     throw new Error("API returned wrong format.");
    // }
    return{validation_rules:data.validation_rules||{publish:{assets:0,items:[{message:'Error with fetching Validation Errors!'}]}}}
}