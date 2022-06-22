import { existsSync, unlinkSync } from "fs"
import { AUDIO_FORMATS, IMAGE_THUMBNAILS } from "../constants";
import { absoluteLocalFilePathToBucketPath, filePathToStorageURL, getPathFromLocalFileUrl, localFileUrlToBucketPath } from "./filePaths"
import { generateMp3, generateThumbnail } from "./conversion";
import { uploadLocalFileToS3 } from "@lib/s3/uploadFileFromDisk";
import { BucketType } from "@lib/s3/s3Client";

// In case of Media (Audio/Image)
// - Upload to ARCHIVE (AWS S3)
// - Generate previews ( mp3 / png thumbnail ) and upload to STORAGE (DigitalOcean Spaces)
// In case of other files: Upload to STORAGE (DigitalOcean Spaces)
// Returns an "assetUrl" and an array of files that shall be deleted locally


// localUrl Example: server-europe:///home/ubuntu/rewave/.temp/assets/users/12345/5678.png
export const handleAssetProcessing = async (localUrl: string, type: "AUDIO" | "IMAGE"): Promise<{ newAssetUrl: string, filesToDelete:string[] }> => {
    const localFilePath = getPathFromLocalFileUrl(localUrl);
    const filesToUpload:{type:BucketType, path:string}[] = [{type:'ARCHIVE',path:localFilePath}];
    if (!existsSync(localFilePath)) {
        throw new Error(`${localFilePath} does not exist`);
    }

    // console.log(`localUrl`, localUrl)
    // console.log(`localFilePath`, localFilePath)

    if (type === 'IMAGE') {
        for (let i = 0; i < IMAGE_THUMBNAILS.length; i++) {
            const { outputPath } = await generateThumbnail(localFilePath, IMAGE_THUMBNAILS[i].name, IMAGE_THUMBNAILS[i].size);
            filesToUpload.push({type:'STORAGE',path:outputPath});
        }
    }

    if (type === 'AUDIO') {
        for (let i = 0; i < AUDIO_FORMATS.length; i++) {
            const { outputPath } = await generateMp3(localFilePath, AUDIO_FORMATS[i].name, AUDIO_FORMATS[i].bitrate);
            filesToUpload.push({type:'STORAGE',path:outputPath});
        }
    }


    /// Upload files to storage Buckets
    // console.log(`filesToUpload`, filesToUpload)
    for(let i = 0; i<filesToUpload.length; i++){
        const path = filesToUpload[i].path;
        const bucketPath = absoluteLocalFilePathToBucketPath(path);
        await uploadLocalFileToS3(path,bucketPath,filesToUpload[i].type);
    }


    const relativeFilePath = localFileUrlToBucketPath(localUrl); // Example: assets/users/12345/5678.png
    const newAssetUrl = filePathToStorageURL(relativeFilePath);  // Example: REWAVE-STORAGE://assets/users/12345/5678.png


    // console.log(`newAssetUrl`, newAssetUrl)
    return {newAssetUrl,filesToDelete:filesToUpload.map(f=>f.path)};
}