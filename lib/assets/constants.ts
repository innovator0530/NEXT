export const allowedAudioFileExtensions = ['WAV','FLAC'];
export const acceptedImageFileTypes = ['PNG','JPEG','JPG','GIF'];

// thumbnails are always PNG
export const imageThumbnailFileExtension = ".png";
export const IMAGE_THUMBNAILS: { name: string, size: number }[] =
    [
        {
            name: "large_thumb",
            size: 512
        },
        {
            name: "small_thumb",
            size: 192
        }
    ]
export type ImageThumbnailType = "small_thumb" | "large_thumb" | "original"


export const audioPreviewExtension = ".mp3";
export const AUDIO_FORMATS: { name: string, bitrate: string }[] = [
    {
        name: "mp3_preview",
        bitrate: '128k'
    }
]
export type AudioFilePreviewType = "mp3_preview" | "original";

export const STORAGE_URL_PREFIX = 'REWAVE-ASSETS-STORAGE://';
