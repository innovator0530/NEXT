import { Language } from "../../../models/options/languages"
import { PriceCategory } from "../../../models/options/priceCategories"
import { ArtistState, ArtistToEdit, ArtistType } from "./ArtistState.model"
import { BeatFile, BeatLink, BeatLinkOrFile } from "./BeatLinkOrFile.model"
import { LabelState, LabelToEdit } from "./LabelState.model"
import { TrackState } from "./TrackState.model"

export interface CreateReleaseState {
	existingDraftId?: string
	page:
		| "PAGE_1"
		| "PAGE_2"
		| "PAGE_3"
		| "PAGE_4"
		| "EDIT_TRACK"
		| "EDIT_LABEL"
		| "EDIT_ARTIST"
		| "EDIT_STORES"
	title: string
	label: {
		labelToEdit: LabelToEdit | null
		selected: LabelState | null
		options: LabelState[]
		loading: boolean
	}
	cover: {
		uploading: boolean
		valid: boolean | null
		validationMessage?: string
		localDataURL: string | null
		fileUrl: string | null
	}
	artists: {
		artistToEdit: null | ArtistToEdit
		selected: {
			type: null | ArtistType
			artist: ArtistState | null
		}[]
		options: ArtistState[]
		loading: boolean
	}
	genres: {
		primaryGenre: string
		secondaryGenre: string
	}
	language: Language | null
	releaseDates: {
		digital: Date | null
		original: Date | null
	}
	priceCategory: PriceCategory | null
	explicitLyrics: boolean
	copyright: {
		year: number | null
		owner: string
	}
	publishingRights: {
		year: number | null
		owner: string
	}
	upc: string

	trackToEdit: TrackState | null
	trackToEditIndex: number
	tracks: TrackState[]
	tracksUploading: number

	// Stores
	selectedStoreIds: string[]
	editStoresSelectedStoreIds: string[] | null

	// Beat Links or Files
	beatLinksOrFiles: (BeatLink | BeatFile)[]
	uploadingBeatFile: boolean
	confirmBeatsOriginal: boolean

	// Release Submission
	releaseSubmissionLoading: boolean

	invalid: Partial<{
		title: boolean
		label: boolean
		artists: { type: boolean; artist: boolean }[]
		primaryGenre: boolean
		secondaryGenre: boolean
		language: boolean
		digitalReleaseDate: boolean
		originalReleaseDate: boolean
		priceCategory: boolean
		explicitLyrics: boolean
		copyrightYear: boolean
		copyrightOwner: boolean
		publishingRightsYear: boolean
		publishingRightsOwner: boolean
		upc: boolean
		tracks: boolean[]
		trackTitle: boolean
		trackLabel: boolean
		trackArtists: boolean[]
		trackPrimaryGenre: boolean
		trackSecondaryGenre: boolean
		trackLanguage: boolean
		trackMetadataLanguage: boolean
		trackPublishingRightsYear: boolean
		trackPublishingRightsOwner: boolean
		trackIsrc: boolean
		cover: boolean
	}>
	pageBeforeEdit: "PAGE_1" | "EDIT_TRACK" | null
	errorMessage: string
	unsavedChanges?: boolean

	allowEditUpc: boolean
	allowEditIsrc: boolean
}
