import { deleteS3ObjectForBucketType } from "@lib/s3/deleteObject";
import { BucketType } from "@lib/s3/s3Client";
import { acceptedImageFileTypes, allowedAudioFileExtensions, audioPreviewExtension, AUDIO_FORMATS, imageThumbnailFileExtension, IMAGE_THUMBNAILS, STORAGE_URL_PREFIX } from "./constants";

const resolvableUrlPrefixes = [STORAGE_URL_PREFIX];

interface FileLocation{
    bucket:BucketType,
    key:string
}

const getFileLocationsForAsset = (assetUrl:string):FileLocation[]=>{
    const locations:FileLocation[] = [];
    const urlPrefix = resolvableUrlPrefixes.find(p => assetUrl.substring(0, p.length) === p)
    if (!urlPrefix) {
        console.log("[WARNING]: Tried to resolve invalid Asset URL: " + assetUrl);
        // if (process.env.NODE_ENV === 'development') throw new Error();
        return []
    }
    let fileKey = assetUrl.substring(urlPrefix.length);

    const fileExtension = assetUrl.split('.').pop().toUpperCase();

    // Audio files and Images are stored in "ARCHIVE" Bucket in original form and in "STORAGE" bucket in compressed form(s)
    if (acceptedImageFileTypes.includes(fileExtension)) {
        locations.push({
            bucket:'ARCHIVE',
            key:fileKey
        })
        const fileKeyWithoutExtension = fileKey.split('.').slice(0, -1).join('.');
        IMAGE_THUMBNAILS.forEach(type=>{
            locations.push({
                bucket: 'STORAGE',
                key : fileKeyWithoutExtension + '_' + type.name + imageThumbnailFileExtension
            })  
        })
    }
    else if (allowedAudioFileExtensions.includes(fileExtension)) {
        locations.push({
            bucket:'ARCHIVE',
            key: fileKey
        })
        const fileKeyWithoutExtension = fileKey.split('.').slice(0, -1).join('.');
        AUDIO_FORMATS.forEach(af=>{
            locations.push({
                bucket: 'STORAGE',
                key : fileKeyWithoutExtension + '_' + af.name + audioPreviewExtension
            })
        })
    }
    // Files that are neither audio nor image are always stored once in "STORAGE" bucket
    else{
        locations.push({
            bucket: 'STORAGE',
            key: fileKey
        })
    }
    return locations;
}   

export const deleteAssetInBuckets = async (assetUrl:string):Promise<void>=>{
    const locations = getFileLocationsForAsset(assetUrl);
    for(let i = 0; i<locations.length; i++){
        try{
            await deleteS3ObjectForBucketType(locations[i].bucket,locations[i].key);
        }
        catch(e){
            console.log('e', e)
            if(process.env.NODE_ENV === 'development'){
                throw e;
            }
        }
    }
}