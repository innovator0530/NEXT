import { signedS3UrlForBucketType } from "@lib/s3/getSignedUrl";
import { BucketType } from "@lib/s3/s3Client";
import { acceptedImageFileTypes, allowedAudioFileExtensions, AudioFilePreviewType, audioPreviewExtension, AUDIO_FORMATS, imageThumbnailFileExtension, ImageThumbnailType, IMAGE_THUMBNAILS } from "../constants";
import { STORAGE_URL_PREFIX } from "../constants";

const resolvableUrlPrefixes = [STORAGE_URL_PREFIX];


const RESOLVE_ORIGINAL_IMAGE = false;
const RESOLVE_ORIGINAL_AUDIO = false;
const ORIGINAL_IMAGE_BUCKET: BucketType = "ARCHIVE"
const ORIGINAL_AUDIO_BUCKET: BucketType = "ARCHIVE"

export interface ResolveAssetUrlParams {
    assetUrl: string;
    imageThumbnail?: ImageThumbnailType,
    soundFilePreview?: AudioFilePreviewType
}

export const resolveAssetUrl = async ({ assetUrl, imageThumbnail, soundFilePreview }: ResolveAssetUrlParams): Promise<string> => {
    const urlPrefix = resolvableUrlPrefixes.find(p => assetUrl.substring(0, p.length) === p)
    if (!urlPrefix) {
        console.log("[WARNING]: Tried to resolve invalid Asset URL: " + assetUrl);
        // if (process.env.NODE_ENV === 'development') throw new Error();
        return ""
    }
    let fileKey = assetUrl.substring(urlPrefix.length);
    let bucketType: BucketType = "STORAGE";

    const fileExtension = assetUrl.split('.').pop().toUpperCase();


    // Alter File Key for thumbnails and/or Bucket Type
    // - For Image File:
    if (acceptedImageFileTypes.includes(fileExtension)) {
        if (imageThumbnail
            && imageThumbnail !== 'original'
            && IMAGE_THUMBNAILS.some(i => i.name === imageThumbnail)) {
            const fileKeyWithoutExtension = fileKey.split('.').slice(0, -1).join('.');
            fileKey = fileKeyWithoutExtension + '_' + imageThumbnail + imageThumbnailFileExtension;
        }
        else if (!RESOLVE_ORIGINAL_IMAGE) {
            console.log("Warning: Image Thumbnail Type does not exist: " + imageThumbnail)
            if (process.env.NODE_ENV === 'development') throw new Error();
            return ""
        }
        else {
            bucketType = ORIGINAL_IMAGE_BUCKET
        }
    }
    else if (allowedAudioFileExtensions.includes(fileExtension)) {
        if (soundFilePreview
            && soundFilePreview !== 'original'
            && AUDIO_FORMATS.some(i => i.name === soundFilePreview)
        ) {
            const fileKeyWithoutExtension = fileKey.split('.').slice(0, -1).join('.');
            fileKey = fileKeyWithoutExtension + '_' + soundFilePreview + audioPreviewExtension;

        }
        else if (!RESOLVE_ORIGINAL_AUDIO) {
            console.log("Warning: Audio Preview Type does not exist: " + soundFilePreview)
            if (process.env.NODE_ENV === 'development') throw new Error();
            if (!RESOLVE_ORIGINAL_AUDIO) return ""
        }
        else {
            bucketType = ORIGINAL_AUDIO_BUCKET
        }
    }


    return await signedS3UrlForBucketType(bucketType, fileKey);

}