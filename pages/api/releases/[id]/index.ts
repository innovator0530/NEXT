import { createHandler } from "../../../../middleware"

const handler = createHandler()

// handler
// 	.use(session)
// 	.put(async ({ session, body, query }: any, res: NextApiResponse) => {
// 		const user = session.get("user")
// 		if (!user || !user.isLoggedIn) {
// 			res.status(403).json({ message: "Unauthorized" })
// 			return
// 		}
// 		await Release.replaceOne({})
// 		res.status(200).json({ message: "created" })
// 	})

// Return a release
// Permissions: Users can only read their own releases, admins can read any release
// handler
// 	.use(session)
//     .use(adminUserContextMiddleware)
// 	.get(async ({ session, query,ctxUser }: RequestWithSession, res: NextApiResponse) => {
// 		try {
// 			const user: SessionUser = ctxUser;
// 			const checkUserResult = validateUser(user)
// 			if (!checkUserResult.authorized) {
// 				res.status(403).json({ message: checkUserResult || "Unauthorized" })
// 				return
// 			}

// 			if (query.id === "undefined" || query.id === "null") {
// 				res.status(404).json({ message: "ID cannot be undefined or null" })
// 				return
// 			}

// 			const releasesResult = await Release.find({ _id: query.id })
// 			if (releasesResult.length !== 1) {
// 				res.status(404).json({ message: "Not found" })
// 				return
// 			}
// 			const release = releasesResult[0]
// 			if (release.user != user.id && user.type !== "ADMIN") {
// 				res
// 					.status(403)
// 					.json({ message: "User does not own this release. Forbidden" })
// 				return
// 			}
// 			const releaseHydrated = await hydrateReleaseUrls(release)
// 			res.status(200).json({ release: releaseHydrated })
// 			return
// 		} catch (e) {
// 			console.log("Error at getRelease:", e)
// 			res.status(500).json({ errorMessage: e.message })
// 		}
// 	})

export default handler
