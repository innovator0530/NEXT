import { addContributorToAsset, artistTypeToContributorType, createPerson, findPersonIdByName } from "@lib/fuga/contributors";
import { fetchFuga, FugaError } from "@lib/fuga/fuga";
import Artist from "@models/database/artist";
import FugaPerson from "@models/database/fuga-person";
import { ArtistType } from "context/CreateReleaseState/models/ArtistState.model";

export const addContributorsToAsset = async (assetId:number,artists:{type:ArtistType,id:string}[]):Promise<void>=>{
    for(let i=0; i<artists.length;i++){
        const type = artists[i].type;
        const id = artists[i].id;
        const artistDb = await Artist.findOne({_id:id});
        const fugaPersonsDb = await FugaPerson.find({name:artistDb.name});
        let personId;
        if(fugaPersonsDb.length < 1){
            let artistPersonId:number;
            try{
                const {personId:fugaArtistPersonId} = await createPerson(artistDb.name);
                artistPersonId = fugaArtistPersonId;
            }
            catch(e){
                if( e instanceof FugaError && e.code === 'DUPLICATE_PERSON_NAME'){
                    const result = await findPersonIdByName(artistDb.name);
                    if(result){
                        artistPersonId = result.personId;
                    }   
                    else{
                        throw new Error("Person is duplicate but finding existing person at FUGA failed?!")
                    }
                }
                else{
                    throw e;
                }
            }
            
            await Artist.updateOne({_id:id},{$set:{fugaPersonId:artistPersonId}});
            await FugaPerson.createOne(artistDb.name,artistPersonId);
            personId = artistPersonId;
        }
        else{
            personId = fugaPersonsDb[0].fugaPersonId;
        }
        await addContributorToAsset(assetId,personId,artistTypeToContributorType(type));
    }
}


const removeContributorFromAsset = async (assetId:number,contributorId:number):Promise<void>=>{
    await fetchFuga(`/assets/${assetId}/contributors/${contributorId}`,'DELETE');
}

const getAllContributorsForAsset = async (assetId:number):Promise<{
    contributors:{
        id:number,
        //person
        //role
    }[]
}>=>{
    const {data} = await fetchFuga(`/assets/${assetId}/contributors`);
    console.log('contributors for asset',assetId, data)
    if(!Array.isArray(data)){
        throw new Error('expected array as return type.')
    }
    return {contributors: data};
}

export const deleteAllContributorsForAsset = async (assetId:number):Promise<void>=>{
    const {contributors} = await getAllContributorsForAsset(assetId);
    for(let i = 0; i<contributors.length; i++){
        await removeContributorFromAsset(assetId, contributors[i].id)
    }
}