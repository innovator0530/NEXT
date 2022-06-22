import { FugaCatalogTier, FugaCatalogTiers, PriceCategory } from "@models/options/priceCategories";


export const priceCategoryToFugaCatalogTier = (priceCategory:PriceCategory):FugaCatalogTier =>{
    const ct = priceCategory.toUpperCase();
    if(!FugaCatalogTiers.includes(ct)){
        console.log(`ct`, ct)
        throw new Error("This FUGA CATALOG TIER does not exist");
    }
    return ct as FugaCatalogTier;
}