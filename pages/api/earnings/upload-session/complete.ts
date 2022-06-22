import { NextApiResponse } from "next";
import { validateAdmin } from "../../../../lib/validateUser";
import { createHandler } from "../../../../middleware";
import { SessionUser } from "../../../../models/user.models";
import { RunningSession } from "./file";
import {promises as fs, existsSync, readdir, readdirSync, readFileSync} from "fs";
import Earning from "../../../../models/database/earnings";
import User from "../../../../models/database/user";
import xlsx from "xlsx";
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { adminOnlySession, RequestWithSession } from "@middleware/nextAuthApi";

const handler = createHandler();
const tmpDir = "./.temp/"

const monthNames = ['january','february','march','april','may','june','july','august','september','october','november','december'];
const emailValidationRegex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const s3BucketName = process.env.ARCHIVE_BUCKET_NAME
const awsRegion = 'eu-central-1';
const s3Client = new S3Client({
	region: awsRegion,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
})

handler.use(adminOnlySession).post(async(req:RequestWithSession,res:NextApiResponse)=>{
    try{
		const adminUserId = req.session.user.id;

        // Load running sessions
        const runningSessions:RunningSession[] = (global as any).earningsUploadSessions || [];

        // Get current session
        const sessionId = req.query.session as string;
        if(!sessionId || typeof req.query.session !== 'string'){
            res.status(400).json({message:'session query param not provided'});
            return;
        }
        if(!runningSessions || !runningSessions.some(s=>s.id===sessionId)){
            res.status(404).json({message:'Provided Session not found!'});
            return;
        }
        const currentSession = runningSessions.find(s=>s.id===sessionId);
        if(currentSession.adminUserId!==adminUserId){
            res.status(403).json({message:'Cannot access other users session'});
            return;
        }

        // Check if all uploaded files exist.
        let allExist = true;
        
        currentSession.files.forEach(f=>{
            if(!existsSync(`${tmpDir}earnings/${currentSession.id}/${f.localFileName}`)){
                allExist = false;
            }
        })
        if(!allExist){
            throw new Error('Not all files in session exist in temp folder');
        }
        // Check if all files in folder are also in session
        const files = readdirSync(`${tmpDir}earnings/${currentSession.id}`);
        if(files.length !== currentSession.files.length){
            throw new Error("File amount in folder and session do not match");
        }

        // Load each Excel file
        const validationErrors:{filename:string; message:string}[] = [];
        for(let i = 0; i<currentSession.files.length; i++){
            // Get total earnings from XLSX file
            const file = currentSession.files[i];
            const workbook = xlsx.readFile(`${tmpDir}earnings/${currentSession.id}/${file.localFileName}`);
            const first_sheet_name = workbook.SheetNames[0];
            const address_of_cell = 'H3';
            var worksheet = workbook.Sheets[first_sheet_name];
            var desired_cell = worksheet[address_of_cell];
            var amountRaw = (desired_cell ? desired_cell.v : undefined);
            if(typeof amountRaw !== 'number'){
                validationErrors.push({message:`File ${file.name} is invalid. There was no total earnings number found in cell H3`,filename:file.name});
                continue;
            }
            const amountCents = Math.floor(amountRaw*100);

            // ... more plausability validations?

            // Validate File Name.
            let monthName: string;
            monthNames.forEach(m=>{
                if(file.name.toLowerCase().includes(m)){
                    monthName = m;
                }
            })
            if(!monthName || file.name.substring(0,monthName.length).toLowerCase()!==monthName){ // Month name must be at start
                validationErrors.push({message:`File ${file.name} is invalid. The filename does not include a Date in the correct format.`,filename:file.name});
                continue;
            }
            let cursor = monthName.length;
            const year = parseInt(file.name.substring(cursor,cursor+4));
            if(year === NaN || year < 2000 || year >2999){
                validationErrors.push({message:`File ${file.name} is invalid. The filename does not include a Date in the correct format.`,filename:file.name});
                continue;
            }
            cursor += 4;
            if(file.name[cursor]===' ') cursor++;
            if(file.name[cursor]==='-') cursor++;
            if(file.name[cursor]===' ') cursor++;
            const parts = file.name.substring(cursor, file.name.length).split(".");
            const fileExtenstion = parts.pop();
            if(fileExtenstion.toLowerCase()!=='xlsx'){
                validationErrors.push({message:`File ${file.name} is invalid. The file should be a .xslx file.`,filename:file.name});
                continue;
            }
            const email = parts.join('.');
            if(!emailValidationRegex.test(String(email).toLowerCase())){
                validationErrors.push({message:`File ${file.name} is invalid. The E-Mail in the file name is invalid`,filename:file.name});
                continue;
            }
            const monthTime = new Date(0);
            monthTime.setUTCFullYear(year);
            monthTime.setUTCMonth(monthNames.indexOf(monthName));


            // Find the User by the email
            const foundUsers = await User.find({email});
            if(foundUsers.length < 1){
                validationErrors.push({message:`File ${file.name} is invalid. The E-Mail in the file name does exist along the REWAVE users.`,filename:file.name});
                continue;
            }
            const userFromDb = foundUsers[0];
            
            // Check if an earnings report already exists for this 
            const existingEarnings = await Earning.find({user:userFromDb._id,time:monthTime.getTime()});
            let existingEarning;
            if(existingEarnings.length >0){
                existingEarning = existingEarnings[0];
            }
            if(!file.replace){
                if(existingEarning){
                    validationErrors.push({message:`File ${file.name} is invalid. An earnings report already exists for the specific user and month.`,filename:file.name});
                    continue;
                }
            }

            // Finally
            try{
                // Upload the file to S3
                const params = {
                    Bucket: s3BucketName,
                    Key: `users/${userFromDb._id}/${file.localFileName}`,
                    Body: readFileSync(`${tmpDir}earnings/${currentSession.id}/${file.localFileName}`)
                }
                const command = new PutObjectCommand(params)
                await s3Client.send(command);
                // Delete the local file
                await fs.unlink(`${tmpDir}earnings/${currentSession.id}/${file.localFileName}`);
                // Put the db entry
                const earning = {
                    user: userFromDb._id,
                    time: monthTime,
                    amountCents,
                    amountStr: amountRaw.toString(),
                    spreadsheetFileUrl: `https://${s3BucketName}.s3.${awsRegion}.amazonaws.com/${params.Key}`,
                    spreadsheetFileName: file.name,
                    uploaded: new Date()
                }

                
                if(existingEarning){
                    await Earning.updateOne({_id:existingEarning._id},earning);
                    // Delete old file in S3
                    try{
                        const existingFileUrl =  new URL(existingEarning.spreadsheetFileUrl);
                        const path = existingFileUrl.pathname.substring(1);
                        const params = {
                            Bucket: s3BucketName,
                            Key: path
                        }
                        const command = new DeleteObjectCommand(params);
                        await s3Client.send(command);
                    }
                    catch(e){
                        console.log("Deleting old spreadsheet file in S3 failed",e);
                    }
                }
                else{
                    await Earning.create(earning);
                }
            }
            catch(e){
                validationErrors.push({message:`File ${file.name}: Upload Failed (Error: ${e.message})`,filename:file.name});
            }

        }

        (global as any).earningsUploadSessions = [...runningSessions.filter(s=>s.id!==currentSession.id)];
        res.status(200).json({message:'Processed Earnings Reports successfully',validationErrors})
        


    }
    catch(e){
        console.log("Error at complet Earnings Session",e);
        res.status(500).json({errorMessage:e.message});
    }
})

export default handler;