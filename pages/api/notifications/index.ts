import { NextApiResponse } from "next"
import { createHandler } from "../../../middleware"
import ReleaseAction from "../../../models/database/releaseAction"
import Release from "../../../models/database/release"
import { resolveAssetUrl } from "@lib/assets/retrieval/resolveAssetUrl"
import mongoose from "mongoose"
import {
	adminUserContext,
	RequestWithSession,
} from "../../../middleware/nextAuthApi"

const MAX_LIMIT = 100

const handler = createHandler()

export const getNotifications = async (
	userId: string,
	limit: number = MAX_LIMIT,
	exclusiveStartId?: string
) => {
	const matchObj: any = { user: mongoose.Types.ObjectId(userId) }
	if (exclusiveStartId) {
		matchObj._id = { $gt: mongoose.Types.ObjectId(exclusiveStartId) }
	}
	const notifications = await ReleaseAction.aggregate([
		{ $match: matchObj },
		{
			$lookup: {
				from: Release.collection.name,
				localField: "release",
				foreignField: "_id",
				as: "release",
			},
		},
		{
			$project: {
				_id: 1,
				type: 1,
				time: 1,
				release: { coverUrl: 1, title: 1, _id: 1 },
			},
		},
	]).limit(limit)
	let returnNotifications = []
	for (let i = 0; i < notifications.length; i++) {
		if (notifications[i].release.length < 1) continue
		const release = notifications[i].release[0]
		// const release = await hydrateReleaseUrls(notifications[i].release[0],true);
		returnNotifications.push({
			time: notifications[i].time.toString(),
			releaseTitle: release.title,
			coverUrl: await resolveAssetUrl({
				assetUrl: release.coverUrl,
				imageThumbnail: "small_thumb",
			}),
			type: notifications[i].type,
			_id: notifications[i]._id.toString(),
			releaseId: release._id.toString(),
		})
	}
	return returnNotifications
}

handler
	.use(adminUserContext)
	.get(
		async ({ session, ...req }: RequestWithSession, res: NextApiResponse) => {
			try {
				const exclusiveStartId = req.query.exclusive_start_id as string
				const limit = parseInt(req.query.limit as string)
				if (isNaN(limit) || limit > MAX_LIMIT) {
					res.status(400).send({
						errorMessage:
							"Please provide a limit less than or equal to " + MAX_LIMIT,
					})
					return
				}
				const notifications = await getNotifications(
					session.user.id,
					limit,
					exclusiveStartId
				)

				res.status(200).send({ data: notifications })
			} catch (e) {
				console.log(e)
				res.status(500).send({ errorMessage: e })
			}
		}
	)

export default handler
