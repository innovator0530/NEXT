import {
	getArtistIdsInRelease,
	getArtists,
} from "controller/release-delivery/artists"
import {
	deleteArtist,
	renameArtist,
	setArtistAppleMusicId,
	setArtistSpotifyId,
} from "@lib/fuga/artists"
import { NextApiResponse } from "next"
import { createHandler } from "../../../../middleware"
import { RequestWithSession } from "../../../../middleware/nextAuthApi"
import { adminUserContext } from "../../../../middleware/nextAuthApi"
import Artist from "../../../../models/database/artist"
import { sendBadRequestResponse } from "@controller/errorResponse"
import Release from "@models/database/release"

const handler = createHandler()

handler
	.use(adminUserContext)
	.put(async (req: RequestWithSession, res: NextApiResponse) => {
		try {
			const user = req.session.user

			const releaseId = req.query.release_id
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
			// Validation
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

			const currentArtist = await Artist.findOne({
				_id: req.query.id as string,
			})
			if (!currentArtist.editable) {
				sendBadRequestResponse(res, { message: "Cannot edit this artist" })
				return
			}

			const artistsWithNameSame = (
				await Artist.find({
					user: user.id,
					name: { $regex: `^\\s*${name}\\s*$`, $options: "i" },
				})
			).filter((a) => a.id != currentArtist.id)
			if (artistsWithNameSame.length > 0) {
				sendBadRequestResponse(res, {
					message: "Cannot create 2 artists with the same name",
				})
				return
			}
			console.log(`currentArtist`, currentArtist)
			currentArtist.name = name
			// FUGA
			await renameArtist(currentArtist.fugaId, name)
			try {
				await setArtistSpotifyId(
					currentArtist.fugaId,
					spotifyId,
					createNewSpotifyProfile
				)
			} catch (e) {
				console.log(`e`, e)
			}
			try {
				await setArtistAppleMusicId(
					currentArtist.fugaId,
					appleMusicId,
					createNewAppleMusicProfile
				)
			} catch (e) {
				console.log(`e`, e)
			}

			if (createNewSpotifyProfile) {
				currentArtist.spotifyId = undefined
				currentArtist.spotifyLink = undefined
				currentArtist.createNewSpotifyProfile = true
			} else {
				currentArtist.spotifyId = spotifyId
				currentArtist.spotifyLink = spotifyLink
				currentArtist.createNewSpotifyProfile = false
			}

			if (createNewAppleMusicProfile) {
				currentArtist.appleMusicId = undefined
				currentArtist.createNewAppleMusicProfile = true
			} else {
				currentArtist.appleMusicId = appleMusicId
				currentArtist.createNewAppleMusicProfile = false
			}

			await currentArtist.save()

			// Get updated Artist List:
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

			console.log("artistIds,releaseId", artistIds, releaseId)
			const artists = await getArtists(userId, artistIds)

			res.status(200).json({ message: "Successful", artists })
		} catch (e) {
			console.log("Got Error at PUT artist", e)
			res.status(500).json({ errorMessage: e.message })
		}
	})

handler
	.use(adminUserContext)
	.delete(async (req: RequestWithSession, res: NextApiResponse) => {
		try {
			const user = req.session.user

			const artist = await Artist.findOneAndDelete({
				_id: req.query.id,
				user: user.id,
			})

			// FUGA
			await deleteArtist(artist.fugaId)

			res.status(200).json({ message: "Successful" })
		} catch (e) {
			console.log("Got Error at POST ...", e)
			res.status(500).json({ errorMessage: e.message })
		}
	})

export default handler
