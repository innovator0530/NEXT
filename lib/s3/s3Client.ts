import AWS from 'aws-sdk';
import { GetObjectCommand, GetObjectCommandInput, S3Client } from "@aws-sdk/client-s3"
const ARCHIVE_BUCKET_NAME = process.env.ARCHIVE_BUCKET_NAME;
const STORAGE_BUCKET_NAME = process.env.STORAGE_BUCKET_NAME;

export const s3Archive = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

export const s3Storage = new AWS.S3({
    accessKeyId: process.env.DO_SPACES_ACCESS_KEY_ID,
    secretAccessKey: process.env.DO_SPACES_SECRET_ACCESS_KEY,
    endpoint: process.env.STORAGE_BUCKET_ENDPOINT
});

export const s3v3Archive = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    region:"eu-central-1"
});

export const s3v3Storage = new S3Client({
    credentials: {
        accessKeyId: process.env.DO_SPACES_ACCESS_KEY_ID,
        secretAccessKey: process.env.DO_SPACES_SECRET_ACCESS_KEY,
    },
    endpoint: process.env.STORAGE_BUCKET_ENDPOINT,
    region:'fra1'
});

export type BucketType = "STORAGE" | "ARCHIVE"


export const s3GetClientByType = (bucketType: BucketType): { client: AWS.S3, bucketName: string } => {
    let bucket: AWS.S3;
    let bucketName: string;
    switch (bucketType) {
        case "STORAGE":
            bucket = s3Storage;
            bucketName = STORAGE_BUCKET_NAME;
            break;
        case "ARCHIVE":
            bucket = s3Archive;
            bucketName = ARCHIVE_BUCKET_NAME;
            break;
        default: throw new Error("Invalid Bucket Type");
    }
    return { client: bucket, bucketName }
}

export const s3V3GetClientByType = (bucketType: BucketType): { client: S3Client, bucketName: string } => {
    let bucket: S3Client;
    let bucketName: string;
    switch (bucketType) {
        case "STORAGE":
            bucket = s3v3Storage;
            bucketName = STORAGE_BUCKET_NAME;
            break;
        case "ARCHIVE":
            bucket = s3v3Archive;
            bucketName = ARCHIVE_BUCKET_NAME;
            break;
        default: throw new Error("Invalid Bucket Type");
    }
    return { client: bucket, bucketName }
}