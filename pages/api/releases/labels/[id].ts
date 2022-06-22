import { NextApiResponse } from "next"
import { getLabels } from "."
import { createHandler } from "../../../../middleware"
import { RequestWithSession } from "../../../../middleware/nextAuthApi"
import { adminUserContext } from "../../../../middleware/nextAuthApi"
import Label from "../../../../models/database/label"

const handler = createHandler()

handler
	.use(adminUserContext)
	.put(async (req: RequestWithSession, res: NextApiResponse) => {
		try {
			const user = req.session.user

			const { name, ...body } = req.body

            // Validation
			if (Object.keys(body).length > 0) {
				res.status(400).json({
					message:
						"Body has illeagal fields. Only name allowed!",
				})
				return
			}
			if (!name) {
				res.status(400).json({ message: "Name required in Body" })
				return
			}

			const otherLabelsWithSameName = await Label.find({user:user.id,name:name,_id:{$ne:req.query.id}});
			if(otherLabelsWithSameName.length > 0){
				res.status(400).send({message:'Cannot rename this label. Another label with the desired name already exists'});
				return;
			}
			const existingLabel = await Label.findOneById(req.query.id as string);
			if(!existingLabel){
				res.status(404).send({message:'The label to be edited was not found'});
				return;
			}
			if(req.session.user.type==='USER' && existingLabel.user.toString()!==req.session.user.id){
				res.status(403).send({message:'Cannot edit another user\'s label!'});
				return;
			}

			await Label.updateOne({_id:req.query.id,user:user.id},{$set:{name}})

            const labels = await getLabels(user.id);

			res.status(200).json({ message: "Successful", labels })
		} catch (e) {
			console.log("Got Error at PUT labels[id]", e)
			res.status(500).json({ errorMessage: e.message })
		}
	})


    handler
	.use(adminUserContext)
	.delete(async (req: RequestWithSession, res: NextApiResponse) => {
		try {
			const user = req.session.user;

			await Label.deleteOne({_id:req.query.id,user:user.id})

			res.status(200).json({ message: "Successful" })
		} catch (e) {
			console.log("Got Error at delete Label", e)
			res.status(500).json({ errorMessage: e.message })
		}
	})

    export default handler;