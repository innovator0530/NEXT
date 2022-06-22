import { fetchFuga } from "./fuga"


export const createSubgenre = async (name:string) :Promise<{subgenreId:number}>=>{
    const {data} = await fetchFuga(`/miscellaneous/subgenres`,'POST',{
        name
    })
    if(!data || !data.id){
        console.log(`data`, data)
        throw new Error('Invalid response at creating subgenre');
    }
    return{subgenreId: data.id};
}

export const ensureSubgenreExists = async (name:string):Promise<{subgenreId:number}> =>{
    const {data} = await fetchFuga(`/miscellaneous/subgenres`);
    const existingSubgenre = Array.isArray(data) && data.find(g=>g.name===name);
    if(existingSubgenre && existingSubgenre.id){
        return {
            subgenreId: existingSubgenre.id
        }
    }
    else{
        return await createSubgenre(name);
    }
}