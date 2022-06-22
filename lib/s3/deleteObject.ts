import { DeleteObjectCommand, DeleteObjectCommandInput, S3Client } from "@aws-sdk/client-s3";
import { BucketType, s3V3GetClientByType } from "./s3Client";

const deleteS3ObjectWithClient = async (s3Client: S3Client, bucketName: string, fileKey: string): Promise<void> => {
    const params: DeleteObjectCommandInput = {
        Bucket: bucketName,
        Key: fileKey
    }
    const command = new DeleteObjectCommand(params)

    await s3Client.send(command)
}

export const deleteS3ObjectForBucketType = async (bucketType: BucketType, fileKey: string) => {
    const { client, bucketName } = s3V3GetClientByType(bucketType);
    return deleteS3ObjectWithClient(client, bucketName, fileKey);
}