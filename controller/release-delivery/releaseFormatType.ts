import { PostRelease } from "@models/api/PostRelease.model"
import { ReleaseFormatType } from "@models/fuga/releaseFormatTypes"

const NOT_SINGLE_IF_DURATION_ABOVE = 600; // seconds

export const getReleaseFormatType = (tracks:PostRelease['tracks']):ReleaseFormatType =>{
    switch(tracks.length){
        case 1:
        case 2:
        case 3:
            // Is not single if one of the tracks is longer than 10 minutes
            if(tracks.reduce((acc,curr)=>acc && (!curr.duration||curr.duration<=0||curr.duration<NOT_SINGLE_IF_DURATION_ABOVE),true)){
                return 'SINGLE'
            }
            else{
                return 'EP'
            }
        case 4:
        case 5:
        case 6:
            return 'EP'
        default: 
            return 'ALBUM'
    }
}