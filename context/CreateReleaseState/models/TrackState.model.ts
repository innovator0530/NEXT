import { Language } from "../../../models/options/languages"
import { ArtistState, ArtistType } from "./ArtistState.model"
import { LabelState } from "./LabelState.model"

export interface TrackState {
	id: string
	title: string
	selectedLabel: LabelState | null
	selectedArtists: {
		type: null | ArtistType
		artist: ArtistState | null
	}[]
	localFile: string | ArrayBuffer | null
	url: string | null
	genres: {
		primary: string
		secondary: string
	}
	language: Language | null
	metadataLanguage: Language | null
	explicitLyrics: boolean
	publishingRights: {
		year: number
		owner: string
	}
	isrc: string
	duration?: number
	addedInCurrentEditSession?: boolean
}
