import { NextApiResponse } from "next"
import { LabelState } from "../../../../context/CreateReleaseState/models/LabelState.model"
import { createHandler } from "../../../../middleware"
import { RequestWithSession } from "../../../../middleware/nextAuthApi"
import { adminUserContext } from "../../../../middleware/nextAuthApi"
import Label from "../../../../models/database/label"

const handler = createHandler()

handler
	.use(adminUserContext)
	.post(async (req: RequestWithSession, res: NextApiResponse) => {
		try {
			const user = req.session.user

			const { name, ...body } = req.body

			if (Object.keys(body).length > 0) {
				res.status(400).json({
					message: "Body has illeagal fields. Only name allowed!",
				})
				return
			}
			if (!name) {
				res.status(400).json({ message: "Name required in Body" })
				return
			}

			const labelsExisting = await Label.find({ user: user.id, name })
			if (labelsExisting.length > 0) {
				res
					.status(400)
					.send({ message: "Cannot create two labels with the same name!" })
				return
			}

			await Label.create({
				name,
				user: user.id,
			})

			const labels = await getLabels(user.id)

			res.status(200).json({ message: "Successful", labels })
		} catch (e) {
			console.log("Got Error at POST ...", e)
			res.status(500).json({ errorMessage: e.message })
		}
	})

export const getLabels = async (
	userId: string,
	labelIds: string[] = []
): Promise<LabelState[]> => {
	const labels = await Label.find({ user: userId }).sort({ name: 1 })
	const labelsByIds = await Label.find({ _id: { $in: labelIds } })
	return [...labels, ...labelsByIds]
		.map((l) => ({
			id: l.id,
			name: l.name,
			editable: l.editable,
		}))
		.filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i)
}

handler
	.use(adminUserContext)
	.get(async (req: RequestWithSession, res: NextApiResponse) => {
		try {
			const user = req.session.user
			const labels = await getLabels(user.id)
			res.status(200).json({ message: "Successful", labels })
		} catch (e) {
			console.log("Got Error at GET labels", e)
			res.status(500).json({ errorMessage: e.message })
		}
	})

export default handler
