import Artist from "@models/database/artist"
import { MongoObjectId } from "@models/database/mongodb"
import { ArtistState } from "context/CreateReleaseState/models/ArtistState.model"
import { PostRelease } from "@models/api/PostRelease.model"
import { IDBRelease, IReleaseDocument } from "@models/database/release/IRelease"

export const getArtistCountForUser = async (
	userId: string
): Promise<number> => {
	const count = await Artist.find({ user: userId }).countDocuments()
	return count
}

export const getArtistIdsInRelease = (release: {
	artists: { artistId: string }[]
	soundtracks: { artists: { artistId: string }[] }[]
}) => {
	return [
		...release.artists.map((ia) => ia.artistId),
		...release.soundtracks.reduce(
			(acc, curr) => [...acc, ...curr.artists.map((ia) => ia.artistId)],
			[]
		),
	]
}

export const getArtists = async (
	userId: string,
	artistIds: string[] = []
): Promise<ArtistState[]> => {
	const artists = await Artist.find({ user: userId }).sort({ name: 1 })
	const artistsByIds = await Artist.find({ _id: { $in: artistIds } })
	const artistsMapped: ArtistState[] = [...artists, ...artistsByIds]
		.map((a) => a.toObject())
		.map((obj) => ({
			id: obj._id.toString(),
			name: obj.name,
			spotifyLink: obj.spotifyLink || null,
			spotifyId: obj.spotifyId || null,
			createNewAppleMusicProfile: obj.createNewAppleMusicProfile || false,
			createNewSpotifyProfile: obj.createNewSpotifyProfile || false,
			appleMusicId: obj.appleMusicId || null,
			editable: obj.editable,
		}))
	return artistsMapped.filter(
		(v, i, a) => a.findIndex((v2) => v2.id === v.id) === i
	)
}

export const getProductArtists = async (
	artists: PostRelease["artists"]
): Promise<{ id: number; primary: boolean }[]> => {
	let result: { id: number; primary: boolean }[] = []
	for (let i = 0; i < artists.length; i++) {
		const artist = await Artist.findOne({ _id: artists[i].id })
		if (!artist) {
			throw new Error("Artist not found")
		}
		if (!artist.fugaId) {
			throw new Error("Artist has no fugaId")
		}
		const fugaId = artist.fugaId
		result.push({ id: fugaId, primary: artists[i].type === "primary" })
	}
	return result
}

// Set all release's artists to "editable":false
export const disableEditingForAllArtists = async (
	release: IReleaseDocument
) => {
	try {
		const artistIds: string[] = [
			...release.artists.map((a) => a.artistId.toString()),
			...release.soundtracks.reduce(
				(acc, curr) => [
					...acc,
					...curr.artists.map((a) => a.artistId.toString()),
				],
				[]
			),
		]
		const artistIdsUnique = new Set(artistIds)
		console.log("Will set these Artist IDs to editable:false", artistIdsUnique)

		for (let artistId of artistIdsUnique) {
			console.log("artistId", artistId)
			try {
				await Artist.updateOne({ _id: artistId }, { $set: { editable: false } })
			} catch (e) {
				console.log("e", e)
			}
		}
	} catch (e) {
		console.log("e", e)
	}
}
