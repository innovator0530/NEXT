import fs from 'fs'
import AWS from 'aws-sdk';
import { getMimeTypeForFile } from '@lib/filesystem/mimeTypes';
import { BucketType, s3Archive, s3GetClientByType, s3Storage } from './s3Client';
const ARCHIVE_STORAGE_CLASS = "GLACIER"





export const uploadLocalFileToS3 = async (localPath: string, remotePath: string, bucketType: BucketType) => {
  const { client: bucket, bucketName } = s3GetClientByType(bucketType);

  const params: AWS.S3.PutObjectRequest = {
    Key: remotePath,
    Bucket: bucketName,
    Body: fs.createReadStream(localPath),
    ContentType: getMimeTypeForFile(localPath)
  }
  if (bucketType === "ARCHIVE") params.StorageClass = ARCHIVE_STORAGE_CLASS;
  const command = bucket.upload(params)
  await command.promise()
}