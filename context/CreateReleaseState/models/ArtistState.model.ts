export type ArtistType =
	| "primary"
	| "featuring"
	| "Actor"
	| "Arranger"
	| "Composer"
	| "Engineer"
	| "with"
	| "Lyricist"
	| "Mixer"
	| "Orchestra"
	| "Producer"
	| "Remixer"

export interface ArtistState {
	id: string
	name: string
	editable: boolean
	spotifyId?: string
	spotifyLink?: string,
	createNewSpotifyProfile?:boolean,
	appleMusicId?: string,
	createNewAppleMusicProfile?:boolean
}

// ArtistToEdit: ID is optional, "isNew" field added
export type ArtistToEdit = Omit<ArtistState & { isNew: boolean }, "id"> & {
	id?: string
}
