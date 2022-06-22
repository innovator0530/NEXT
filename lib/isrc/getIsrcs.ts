import Isrc, { IDBIsrc } from "@models/database/isrc";
import { makeObjectId } from "@models/database/mongodb";

const ISRC_PREFIX = 'CHF03';
const MIN_INDEXES = {
    '21':100
}


export const getLastIsrc = async ():Promise<string>=>{
    const objs = await Isrc.find().sort({isrc:-1}).limit(1);
    const obj = objs[0]
    console.log(`obj.isrc`, obj.isrc)
    if((typeof obj?.isrc !== 'string') || obj.isrc.length !== 12){
        throw new Error('Last Isrc Invalid');
    }
    return obj.isrc;
}

const getNextIsrc = async ():Promise<string>=>{
    let yearStr = (''+new Date().getFullYear()).substring(2,4);
    let yearNum = parseInt(yearStr)
    const lastIsrc = await getLastIsrc();
    const lastIsrcIndex = parseInt(lastIsrc.substring(7,12));
    const lastIsrcYearStr = lastIsrc.substring(5,7);
    const lastIsrcYearNum = parseInt(lastIsrcYearStr);
    let index;

    // If its a new year, start at 0 or see MIN_INDEXES
    if(lastIsrcYearNum<yearNum){
        index = MIN_INDEXES[yearStr]||0
    }
    else if(lastIsrcIndex >= 99999){
        yearNum = lastIsrcYearNum+1;
        yearStr = ''+yearNum;
        index = MIN_INDEXES[yearStr]||0
    }
    // Most probable case: Just increase Index by 1
    else{
        yearNum = lastIsrcYearNum;
        yearStr = lastIsrcYearStr;
        index = lastIsrcIndex+1;
    }
    const indexStr = String(index).padStart(5, '0')
    return `${ISRC_PREFIX}${yearStr}${indexStr}`
}

export const reserveIsrcs = async (count:number,releaseId?:string):Promise<string[]>=>{
    let result:string[] = [];
    for(let i = 0; i<count; i++){
        const isrc = await getNextIsrc();
        const newEntry:IDBIsrc = {isrc, createdAt: new Date()}
        if(releaseId){
            newEntry.releaseId =  makeObjectId(releaseId);
            newEntry.trackIndex = i;
        }
        await Isrc.create(newEntry)
        result.push(isrc);
    }
    return result;
}