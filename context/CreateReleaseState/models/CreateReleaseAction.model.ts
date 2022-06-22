import { Language } from "../../../models/options/languages"
import { PriceCategory } from "../../../models/options/priceCategories"
import { ArtistState, ArtistType } from "./ArtistState.model"
import { LabelState } from "./LabelState.model"

export type CreateReleaseAction =
	| { type: "SET_TITLE"; title: string }
	| { type: "SET_LABEL"; label: LabelState }
	| { type: "SET_LABEL_OPTIONS"; labels: LabelState[] }
	| { type: "GOTO_EDIT_LABEL"; labelId?: string }
	| { type: "COVER_FILE_SELECTED" }
	| { type: "COVER_FILE_READ"; localDataURL: string }
	| {
			type: "COVER_FILE_UPLOADED"
			validationMessage?: string
			valid: boolean
			url: string
	  }
	| { type: "ADD_ARTIST" }
	| { type: "REMOVE_LAST_ARTIST" }
	| { type: "SET_ARTIST"; index: number; artistId: string }
	| { type: "SET_ARTIST_TYPE"; index: number; artistType: ArtistType | null }
	| { type: "SET_PRIMARY_GENRE"; genre: string }
	| { type: "SET_SECONDARY_GENRE"; genre: string }
	| { type: "PAGE_1_GOTO_NEXT" }
	| { type: "GOTO_EDIT_ARTIST"; artistId?: string }

	// Edit artist:
	// Attention: When updating Artist Options, Artist Names must be updated in Release as well as all Tracks!
	| { type: "EDIT_ARTIST_SET_NAME"; name: string }
	| { type: "EDIT_ARTIST_SET_SPOTIFY_ID"; spotifyId: string }
	| { type: "EDIT_ARTIST_SET_SPOTIFY_LINK"; spotifyLink: string }
	| {
			type: "EDIT_ARTIST_SET_CREATE_NEW_SPOTIFY_PROFILE"
			createNewSpotifyProfile: boolean
	  }
	| { type: "EDIT_ARTIST_SET_APPLE_MUSIC_ID"; appleMusicId: string }
	| {
			type: "EDIT_ARTIST_SET_CREATE_NEW_APPLE_MUSIC_PROFILE"
			createNewAppleMusicProfile: boolean
	  }
	| { type: "EDIT_ARTIST_CANCEL" }
	| { type: "EDIT_ARTIST_SAVE" }
	| { type: "EDIT_ARTIST_SAVE_FINISHED"; updatedArtists: ArtistState[] }
	| { type: "EDIT_ARTIST_SAVE_FAILED"; errorMessage?: string }

	// Edit Label
	| { type: "EDIT_LABEL_CANCEL" }
	| { type: "EDIT_LABEL_SAVE" }
	| { type: "EDIT_LABEL_SET_NAME"; name: string }
	| { type: "EDIT_LABEL_SAVE_FINISHED"; updatedLabels: LabelState[] }
	| { type: "EDIT_LABEL_SAVE_FAILED"; errorMessage?: string }

	// Page 2:
	| { type: "SET_LANGUAGE"; language: Language | null }
	| { type: "SET_ORIGINAL_RELEASE_DATE"; date: Date }
	| { type: "SET_DIGITAL_RELEASE_DATE"; date: Date }
	| { type: "SET_PRICE_CATEGORY"; priceCategory: PriceCategory }
	| { type: "SET_EXPLICIT_LYRICS"; explicitLyrics: boolean }
	| { type: "SET_COPYRIGHT_YEAR"; year: number }
	| { type: "SET_PUBLISHING_RIGHTS_YEAR"; year: number }
	| { type: "SET_COPYRIGHT_OWNER"; owner: string }
	| { type: "SET_PUBLISHING_RIGHTS_OWNER"; owner: string }
	| { type: "SET_UPC"; upc: string }
	| { type: "PAGE_2_GO_BACK" }
	| { type: "PAGE_2_GOTO_NEXT" }

	// Page 3:
	| { type: "PAGE_3_GOTO_NEXT" }
	| { type: "PAGE_3_GO_BACK" }
	| { type: "TRACK_FILES_SELECTED"; count: number }
	| { type: "TRACK_FILE_UPLOAD_STARTED" }
	| {
			type: "TRACK_FILE_UPLOAD_SUCCESSFUL"
			filename: string
			localFile: string | ArrayBuffer | null
			url: string
			duration?: number
	  }
	| { type: "TRACK_FILE_UPLOAD_FAILED"; message: string }
	| { type: "TRACK_FILE_REJECTED"; message: string }
	| { type: "TRACK_SWITCH_POSITION"; srcIndex: number; targetIndex: number }
	| { type: "GOTO_EDIT_TRACK"; index: number }
	| { type: "EDIT_TRACK_SAVE" }
	| { type: "DELETE_TRACK"; index: number }
	| { type: "EDIT_TRACK_CANCEL" }
	| { type: "TRACK_SET_TITLE"; title: string }
	| { type: "TRACK_SET_LABEL"; label: LabelState }
	| { type: "TRACK_SET_ARTIST"; index: number; artistId: string }
	| {
			type: "TRACK_SET_ARTIST_TYPE"
			index: number
			artistType: ArtistType | null
	  }
	| { type: "TRACK_ADD_ARTIST" }
	| { type: "TRACK_REMOVE_LAST_ARTIST" }
	| { type: "TRACK_GOTO_EDIT_ARTIST"; artistId?: string }
	| { type: "TRACK_SET_PRIMARY_GENRE"; genre: string }
	| { type: "TRACK_SET_SECONDARY_GENRE"; genre: string }
	| { type: "TRACK_SET_LANGUAGE"; language: Language }
	| { type: "TRACK_SET_METADATA_LANGUAGE"; language: Language }
	| { type: "TRACK_SET_EXPLICIT_LYRICS"; explicitLyrics: boolean }
	| { type: "TRACK_SET_PUBLISHING_RIGHTS_YEAR"; year: number }
	| { type: "TRACK_SET_PUBLISHING_RIGHTS_OWNER"; owner: string }
	| { type: "TRACK_SET_ISRC"; isrc: string }
	| { type: "TRACK_GOTO_EDIT_LABEL"; labelId?: string }

	// Page 4
	| { type: "PAGE_4_GO_BACK" }
	| { type: "PAGE_4_GO_TO_PAGE_1" }
	| { type: "GOTO_EDIT_STORES" }
	| { type: "EDIT_STORES_CANCEL" }
	| { type: "EDIT_STORES_SAVE" }
	| { type: "SET_ALL_STORES" }
	| { type: "ADD_STORE"; storeId: string }
	| { type: "REMOVE_STORE"; storeId: string }
	| { type: "ADD_BEAT_LINK" }
	| { type: "SET_BEAT_LINK"; index: number; link: string }
	| { type: "ADD_BEAT_FILE_START_UPLOAD" }
	| { type: "ADD_BEAT_FILE_UPLOAD_FINISHED"; url: string; name: string }
	| { type: "ADD_BEAT_FILE_UPLOAD_FAILED"; errorMessage?: string }
	| { type: "REMOVE_LAST_BEAT_FILE_OR_LINK" }
	| { type: "SET_CONFIRM_BEATS_ORIGINAL"; original: boolean }
	| { type: "SUBMIT_RELEASE" }
	| { type: "SUBMIT_RELEASE_FAILED"; errorMessage: string }
	| { type: "SAVE_AS_DRAFT" }
	| { type: "SAVE_AS_DRAFT_FAILED"; errorMessage: string }
	| { type: "SET_UNSAVED_CHANGES"; isUnsaved: boolean }
