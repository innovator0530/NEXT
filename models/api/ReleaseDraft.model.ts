import { ArtistType } from "@context/CreateReleaseState/models/ArtistState.model"
import { IDBFreeBeat } from "@models/database/release/FreeBeat"
import { IReleaseDocument } from "@models/database/release/IRelease"
import { IDBSoundtrack } from "@models/database/release/Soundtrack"
import { PostRelease } from "./PostRelease.model"

export type PostReleaseDraft = Partial<PostRelease> & {
	title: string
}

interface IArtist {
	artistId: string
	type: ArtistType
}

export type GetReleaseDraft = Pick<
	IReleaseDocument,
	| "id"
	| "title"
	| "coverUrl"
	| "primaryGenre"
	| "secondaryGenre"
	| "language"
	| "explicit"
	| "copyrightBy"
	| "copyrightYear"
	| "publishingRightsBy"
	| "publishingRightsYear"
	| "stores"
	| "upc"
	| "rewaveId"
	| "priceCategory"
> & {
	artists: IArtist[]
	musicLabelId: string
	digitalReleaseDate: string
	originalReleaseDate: string
	soundtracks: (Omit<IDBSoundtrack, "musicLabelId" | "artists"> & {
		musicLabelId: string
		artists: IArtist[]
	})[]
	freeBeats: (IDBFreeBeat & { resolvedUrl?: string })[]
	allowEditUpc: boolean
	allowEditIsrc: boolean
}
