import { PostRelease } from "@models/api/PostRelease.model"
import { makeObjectId } from "@models/database/mongodb"
import { IDBRelease } from "@models/database/release/IRelease"
import { IDBSoundtrack } from "@models/database/release/Soundtrack"

type Flatten<Type> = Type extends Array<infer Item> ? Item : Type

export const mapPostReleaseSoundtrackToDB = (
	soundtrack: Flatten<PostRelease["tracks"]>
): IDBSoundtrack => {
	const t = soundtrack
	return {
		name: t.title,
		musicLabelId: t.labelId ? makeObjectId(t.labelId) : null,
		fileUrl: t.fileUrl,
		artists: t.artists.map((a) => ({
			type: a.type,
			artistId: a.id ? makeObjectId(a.id) : null,
		})),
		language: t.language,
		metadataLanguage: t.metadataLanguage,
		primaryGenre: t.genres.primary,
		secondaryGenre: t.genres.secondary,
		explicit: t.explicitLyrics,
		isrc: t.isrc,
		publishingRightsBy: t.publishingRights.owner,
		publishingRightsYear: t.publishingRights.year,
	}
}

export const mapPostReleaseToDB = (
	r: PostRelease,
	status: "PENDING" | "DRAFT",
	userId: string,
	isProcessing?: boolean
): IDBRelease => {
	return {
		title: r.title,
		status,
		artists: r.artists.map((a) => ({
			type: a.type,
			artistId: makeObjectId(a.id),
		})),
		user: makeObjectId(userId),
		submitted: new Date(),

		coverUrl: r.coverUrl,
		musicLabelId: makeObjectId(r.labelId),
		primaryGenre: r.genres.primaryGenre,
		secondaryGenre: r.genres.secondaryGenre,
		language: r.language,
		explicit: r.explicitLyrics,
		soundtracks: r.tracks.map((t) => mapPostReleaseSoundtrackToDB(t)),
		digitalReleaseDate: new Date(r.releaseDates.digital),
		originalReleaseDate: new Date(r.releaseDates.original),
		copyrightBy: r.copyright.owner,
		copyrightYear: r.copyright.year,
		publishingRightsBy: r.publishingRights.owner,
		publishingRightsYear: r.publishingRights.year,
		stores: r.stores,
		freeBeats: r.beatLinksOrFiles.map((b) =>
			b.type === "LINK"
				? { name: b.link, type: "LINK" }
				: { name: b.name, url: b.url, type: "FILE" }
		),
		upc: r.upc,
		lastActionTime: new Date(),
		priceCategory: r.priceCategory,
		isProcessing: isProcessing || false,
	}
}
