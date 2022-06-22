import { adminOnlySession, RequestWithSession } from "@middleware/nextAuthApi"
import formidable from "formidable"
import { existsSync, promises as fs, rmdirSync } from "fs"
import { NextApiResponse } from "next"
import { createHandler } from "../../../../middleware"

//disable default body parser
export const config = {
	api: {
		bodyParser: false,
	},
}
const handler = createHandler()
const tmpDir = "./.temp/"
const allowedFileTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

export interface RunningSession{
  id:string;
  adminUserId:string;
  files: {name:string; localFileName:string;replace?:boolean}[];
  startTime: number;
}


const sessionExpiredAfter = 86400000; // 24 hrs
rmdirSync(tmpDir+'earnings',{recursive:true});

// Upload an excel file
// POST
// Body Must be form-data!
// Query Params: session=uuid

handler
	.use(adminOnlySession)
	.post(async (req: RequestWithSession, res: NextApiResponse) => {
		try {
      // Get User
			const admin = req.session.user;

      const runningSessions:RunningSession[] = (global as any).earningsUploadSessions || []


      // If there are no running sessions, delete entire temp directory
      if(runningSessions.length <0&&existsSync(tmpDir+"earnings")){
        rmdirSync(tmpDir+'earnings',{recursive:true});
      }

      // Delete Expired Sessions
      runningSessions.forEach((s,i,sessions)=>{
        if(s.startTime<(Date.now()-sessionExpiredAfter)){
          if(existsSync(`${tmpDir}earnings/${s.id}`)){
            rmdirSync(`${tmpDir}earnings/${s.id}`,{recursive:true});
          }
          sessions.splice(i,1);
        }
      })

      

      // Check if there is a Session ID provided
      if(!req.query.session || typeof req.query.session !== 'string'){
        res.status(400).json({message:'Please provide Session ID in query'});
        return;
      }
      const currentSessionId = req.query.session as string;

      // If there are old sessions for the current user, delete them.
      runningSessions.forEach((s,i,sessions)=>{
        if(s.id!== currentSessionId && s.adminUserId===admin.id){
          if(existsSync(`${tmpDir}earnings/${s.id}`)){
            rmdirSync(`${tmpDir}earnings/${s.id}`,{recursive:true});
          }
          sessions.splice(i,1);
        }
      })

      // if session does not exist already, add it
      if(!runningSessions.some(s=>s.id===currentSessionId)){
        runningSessions.push({
          adminUserId: admin.id,
          id: currentSessionId,
          startTime: Date.now(),
          files: []
        })
      }

      const currentSession = runningSessions.find(s=>s.id===currentSessionId);


      // Check if temporary directories exist. If not, create them.
      if(!existsSync(tmpDir)){
        await fs.mkdir(tmpDir);
      }
      if(!existsSync(tmpDir+"earnings")){
        await fs.mkdir(tmpDir+"earnings");
      }
      if(!existsSync(tmpDir+"earnings/"+currentSessionId)){
        await fs.mkdir(tmpDir+"earnings/"+currentSessionId);
      }
			const form = new formidable.IncomingForm()
			form.keepExtensions = true
      form.uploadDir = `${tmpDir}earnings/${currentSessionId}/`
			form.parse(req, (err, fields, files) => {
        if(err){
          throw err;
        }
        let unallowedFileType = null;
        Object.keys(files).forEach(k=>{
          if(!allowedFileTypes.includes(files[k].type)){
            unallowedFileType = files[k].type;
          }
          const name = files[k].name;
          const parts = files[k].path.split("/");
          const localFileName = parts[parts.length-1];
          currentSession.files.push({name,localFileName,replace:k==='replace'})
        });  
        if(unallowedFileType){
          res.status(400).json({message:'File type '+unallowedFileType+' not allowed'})
          return;
        }
        (global as any).earningsUploadSessions = runningSessions;
        res.status(200).json({ message: "Uploaded" })
			});

		} catch (e) {
			console.log("Error at listing Users", e)
			res.status(500).json({ errorMessage: e.message })
		}
	})

export default handler
