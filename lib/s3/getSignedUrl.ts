import { GetObjectCommand, GetObjectCommandInput, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { BucketType, s3V3GetClientByType } from "./s3Client";


const getSignedS3UrlWithClient = async (s3Client: S3Client, bucketName: string, fileKey: string): Promise<string> => {
    const params: GetObjectCommandInput = {
        Bucket: bucketName,
        Key: fileKey
    }
    const command = new GetObjectCommand(params)

    const url = await getSignedUrl(s3Client, command, { expiresIn: 1800 })

    return url;
}

export const signedS3UrlForBucketType = async (bucketType: BucketType, fileKey: string) => {
    const { client, bucketName } = s3V3GetClientByType(bucketType);
    return getSignedS3UrlWithClient(client, bucketName, fileKey);
}