

const ARCHIVE_BUCKET_PREFIX = process.env.ARCHIVE_BUCKET_URL;
const isProduction = process.env.NODE_ENV === 'production';
const TEMP_URL_PREFIX = process.env.TEMP_ASSET_URL_PREFIX;

// const ASSETS_STORAGE_PREFIX = STORAGE_BUCKET_PREFIX + (isProduction ? 'assets' : 'assets-development');
// const ASSETS_ARCHIVE_PREFIX = ARCHIVE_BUCKET_PREFIX + (isProduction ? 'assets' : 'assets-development');
import { ASSETS_DIR_NAME, TMP_DIR } from '../../../config';
import path from 'path';
import { STORAGE_URL_PREFIX } from '../constants';


const checkForConstants = () => {
    // if (!process.env.STORAGE_BUCKET_URL) {
    //     throw new Error("process.env.STORAGE_BUCKET_URL missing");
    // }
    if (!process.env.ARCHIVE_PREFIX) {
        throw new Error("process.env.STORAGE_BUCKET_URL missing");
    }
    if (!process.env.NODE_ENV) {
        throw new Error("process.env.NODE_ENV missing");
    }
    if (!process.env.TEMP_ASSET_URL_PREFIX) {
        throw new Error("process.env.TEMP_ASSET_URL_PREFIX missing");
    }
}

export const getPathFromLocalFileUrl = (url: string): string => {
    const prefix = url.substring(0, TEMP_URL_PREFIX.length);
    if (prefix !== TEMP_URL_PREFIX) {
        console.log(`prefix:`, prefix);
        console.log(`TEMP_URL_PREFIX`, TEMP_URL_PREFIX);
        throw new Error("Local File URL prefix does not match");
    }
    // Absolute File Path
    const localPath = url.substring(TEMP_URL_PREFIX.length);
    return localPath;
}

export const localFileUrlToBucketPath = (url: string): string => {
    const localPath = getPathFromLocalFileUrl(url);

    return absoluteLocalFilePathToBucketPath(localPath);
}

export const absoluteLocalFilePathToBucketPath = (localPath: string) => {
    // Relative Path to file 
    const assetPath = path.relative(TMP_DIR, localPath);

    if (assetPath.split(path.sep)[0] !== ASSETS_DIR_NAME) {
        throw new Error(`File Should be in folder with name ${ASSETS_DIR_NAME}`);
    }

    // Bucket Path
    return assetPath.split(path.sep).join('/');
}

export const filePathToStorageURL = (filePath: string) => {
    if (path.isAbsolute(filePath)) {
        throw new Error('Cannot use Absolute file paths');
    }
    return STORAGE_URL_PREFIX + filePath;
}
