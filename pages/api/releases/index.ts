import { submitRelease } from "controller/release-delivery/submitRelease"
import { getReleasesOverview } from "controller/releases/getReleases"
import { validatePostRelease } from "controller/releases/submitRelease"
import { createHandler } from "@middleware"
import { adminUserContext, RequestWithSession } from "@middleware/nextAuthApi"
import { PostRelease } from "@models/api/PostRelease.model"
import Release from "@models/database/release"
import User from "@models/database/user"
import { RELEASE_LIST_TAGS } from "@pages/app/releases/index"
import { NextApiResponse } from "next"

const handler = createHandler()

export const getReleaseCounts = async (userId: string) => {
	const releases = await Release.find({ user: userId }, { status: 1 })
	return {
		ALL: releases.length,
		...RELEASE_LIST_TAGS.reduce(
			(acc, curr) =>
				curr.code === "ALL"
					? acc
					: {
							...acc,
							[curr.code]: releases.filter(
								(r) =>
									r.status === curr.code ||
									(curr.additionalTags &&
										curr.additionalTags.includes(r.status))
							).length,
					  },
			{}
		),
	}
}

handler
	.use(adminUserContext)
	.get(async (req: RequestWithSession, res: NextApiResponse) => {
		try {
			if (!req.query.limit) {
				res.status(400).send({ message: "Please specify limit" })
			}
			const limit = parseInt(req.query.limit && (req.query.limit as string))
			const exclusiveStartLastActionTimeStr = (req.query
				.exclusive_start_last_action_time || "") as string
			const releaseStatusStr = (req.query.release_status || "") as string
			const releasesStatuses = releaseStatusStr.split(",")
			const releases = await getReleasesOverview(
				req.session.user.id,
				"small_thumb",
				limit,
				exclusiveStartLastActionTimeStr,
				releasesStatuses
			)

			res.status(200).send(releases)
		} catch (e) {
			res.status(500).send({ errorMessage: e })
		}
	})

handler
	.use(adminUserContext)
	.post(async (req: RequestWithSession, res: NextApiResponse) => {
		try {
			const body = req.body
			const validationResult = validatePostRelease(body)
			console.log(`req.query.importReleaseEmail`, req.query.importReleaseEmail)
			let userId = req.session.user.id
			if (
				req?.query?.importReleaseEmail &&
				req.query.importReleaseEmail.length > 1 &&
				req.session.user.type === "ADMIN"
			) {
				const email: string = req.query.importReleaseEmail as string
				const foundUsers = await User.find({ email })
				if (foundUsers.length > 0) {
					userId = foundUsers[0].id
				} else {
					const user = await User.create({
						email,
						createdAt: new Date(),
					})
					userId = user.id.toString()
				}
			}
			if (!validationResult.valid) {
				console.log(validationResult.errors)
				res
					.status(400)
					.send({ errorMessage: validationResult.errors.toString() })
				return
			}
			const release: PostRelease = body as PostRelease
			console.log("Submitted Release:")
			console.log(release)
			res.status(200).send({ message: "Submitted successfully!" })
			submitRelease(release, userId)
				.then(() => {
					console.log("Release submitted successfully")
				})
				.catch((e) => {
					console.log("Error while submitting release", e)
				})
		} catch (e) {
			console.log(e)
			res.status(500).send({ errorMessage: e })
		}
	})

export default handler
