import { NextApiRequest, NextApiResponse } from "next";
import { server } from "../../../config";
import { createHandler } from "../../../middleware";
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")
const {
	S3Client,
	GetObjectCommand
} = require("@aws-sdk/client-s3")
const client = new S3Client({
	region: "eu-central-1",
	credentials: {
		accessKeyId: process.env.aws_access_key_id,
		secretAccessKey: process.env.aws_secret_access_key,
	},
})

const handler = createHandler();

const s3BucketName = process.env.aws_s3_bucket_name

handler.get(async(req:NextApiRequest,res:NextApiResponse)=>{
    try{
        const Key = decodeURIComponent(req.query.assetid as string);
        const params = {
            Bucket: s3BucketName,
            Key
        }
        const command = new GetObjectCommand(params)
        const getUrl = await getSignedUrl(client, command, { expiresIn: 1800 })
        res.redirect(getUrl);
    }
    catch(e){
        console.log("Error at get Asset");
        res.status(500).send('Error')
    }
})

export const getSignedS3Url = async (urlStr:string,expires?:number) =>{
    const url = new URL(urlStr);
    const Key = decodeURIComponent(url.pathname.substring(1));
    const params = {
        Bucket: s3BucketName,
        Key
    }
    const command = new GetObjectCommand(params)
    let getUrl;
    if(expires >= 86400){
        try{
            getUrl = await getSignedUrl(client, command, { expiresIn: expires })
        }
        catch(e){
            console.log(e);
            getUrl = await getSignedUrl(client, command, { expiresIn: 86399 })
        }
    }
    else {
        getUrl = await getSignedUrl(client, command, { expiresIn: expires||1800 })
    }
    return getUrl
}


export const getPublicAssetUrl = (s3Url:string)=>{
    const url = new URL(s3Url);
    const host = url.hostname;
    if(!host.includes(s3BucketName)){
        throw new Error("Invalid URL")
    }
    const key = url.pathname.substring(1);
    const keyEncoded = encodeURIComponent(key);
    return `${server}/api/filedownload/${keyEncoded}`;   
}

export default handler;
