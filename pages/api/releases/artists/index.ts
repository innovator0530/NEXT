import {
	getArtistCountForUser,
	getArtistIdsInRelease,
	getArtists,
} from "controller/release-delivery/artists"
import {
	createArtist,
	setArtistAppleMusicId,
	setArtistSpotifyId,
} from "@lib/fuga/artists"
import { GetArtists, PostArtists } from "@models/api/GetArtists"
import { NextApiResponse } from "next"
import { createHandler } from "../../../../middleware"
import { RequestWithSession } from "../../../../middleware/nextAuthApi"
import { adminUserContext } from "../../../../middleware/nextAuthApi"
import Artist, {
	IArtistDocument,
	IDBArtist,
} from "../../../../models/database/artist"
import { sendBadRequestResponse } from "@controller/errorResponse"
import { makeObjectId } from "@models/database/mongodb"
import Release from "@models/database/release"

const handler = createHandler()

const MAX_ARTISTS_PER_USER_ALLOWED = 10000

handler
	.use(adminUserContext)
	.post(async (req: RequestWithSession, res: NextApiResponse) => {
		try {
			const user = req.session.user
			const releaseId = req.query.release_id

			// Encforce Artist limit for User
			if (
				(await getArtistCountForUser(user.id)) >= MAX_ARTISTS_PER_USER_ALLOWED
			) {
				sendBadRequestResponse(res, {
					message:
						"Maxium artist count of " +
						MAX_ARTISTS_PER_USER_ALLOWED +
						" reached.",
				})
				return
			}

			// Parse and validate request body
			const {
				name: rawName,
				spotifyId,
				spotifyLink,
				createNewSpotifyProfile,
				appleMusicId,
				createNewAppleMusicProfile,
				...body
			} = req.body
			const name = rawName.trim()

			if (Object.keys(body).length > 0) {
				res.status(400).json({
					message:
						"Body has illeagal fields. Only name, spotifyId and spotifyLink allowed!",
				})
				return
			}
			if (!name) {
				res.status(400).json({ message: "Name required in Body" })
				return
			}
			if (
				(
					await Artist.find({
						user: user.id,
						name: { $regex: `^\\s*${name}\\s*$`, $options: "i" },
					})
				).length > 0
			) {
				sendBadRequestResponse(res, {
					message: "Cannot create 2 artists with the same name",
				})
				return
			}

			// DB entry
			const dbEntry: Omit<IDBArtist, "editable" | "createdAt"> = {
				name,
				user: makeObjectId(user.id),
			}
			if (createNewSpotifyProfile) {
				dbEntry.createNewSpotifyProfile = true
			} else {
				if (spotifyId) {
					dbEntry.spotifyId = spotifyId
				}
				if (spotifyLink) {
					dbEntry.spotifyLink = spotifyLink
				}
				dbEntry.createNewSpotifyProfile = false
			}
			if (createNewAppleMusicProfile) {
				dbEntry.createNewAppleMusicProfile = true
			} else if (appleMusicId) {
				dbEntry.appleMusicId = appleMusicId
				dbEntry.createNewAppleMusicProfile = false
			}
			const newArtist = await Artist.create(dbEntry)

			// FUGA - Create Artist
			let fugaId: number
			try {
				const { newId } = await createArtist(name, newArtist.id.toString())
				fugaId = newId
				if (!fugaId) throw new Error("No ID")
			} catch (e) {
				// Delete the Artist again becaus creation at FUGA failed
				console.log(`e`, e)
				await Artist.deleteOne({ id: newArtist.id })
				throw e
			}
			// FUGA - if available, set Spotify ID
			try {
				if (spotifyId || createNewSpotifyProfile) {
					await setArtistSpotifyId(fugaId, spotifyId, createNewSpotifyProfile)
				}
			} catch (e) {
				console.log(`e`, e)
			}

			// FUGA - if available, set Spotify ID
			try {
				if (appleMusicId || createNewAppleMusicProfile) {
					await setArtistAppleMusicId(
						fugaId,
						appleMusicId,
						createNewAppleMusicProfile
					)
				}
			} catch (e) {
				console.log(`e`, e)
			}

			await Artist.updateOne({ _id: newArtist.id }, { $set: { fugaId } })

			// Return the new artist list
			let artistIds = []
			let userId = user.id
			if (typeof releaseId === "string") {
				const release = await Release.findOneById(releaseId)
				artistIds = getArtistIdsInRelease({
					artists: release.artists.map((a) => ({
						artistId: a.artistId.toString(),
					})),
					soundtracks: release.soundtracks.map((s) => ({
						artists: s.artists.map((a) => ({
							artistId: a.artistId.toString(),
						})),
					})),
				})
				if (user.type === "ADMIN") {
					userId = release.user.toString()
				}
			}
			const artists = await getArtists(userId, artistIds)
			const resBody: PostArtists = { artists }

			res.status(200).json(resBody)
		} catch (e) {
			console.log("Got Error at POST ...", e)
			res.status(500).json({ errorMessage: e.message })
		}
	})

handler
	.use(adminUserContext)
	.get(async (req: RequestWithSession, res: NextApiResponse) => {
		try {
			const user = req.session.user
			const resBody: GetArtists = { artists: await getArtists(user.id) }
			res.status(200).json(resBody)
		} catch (e) {
			console.log("Got Error at POST ...", e)
			res.status(500).json({ errorMessage: e.message })
		}
	})

export default handler
