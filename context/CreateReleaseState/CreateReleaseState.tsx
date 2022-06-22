import { GetReleaseDraft } from "@models/api/ReleaseDraft.model"
import { useRouter } from "next/router"
import React, { Context, createContext, Dispatch, useReducer } from "react"
import { Language } from "../../models/options/languages"
import { PriceCategory } from "../../models/options/priceCategories"
import { CreateReleaseContextType } from "./CreateReleaseContext.model"
import { useAddBeatFile } from "./hooks/useAddBeatFiles"
import { useEditArtistSave } from "./hooks/useEditArtistSave"
import { useEditLabelSave } from "./hooks/useEditLabelSave"
import { useSaveAsDraft } from "./hooks/useSaveAsDraft"
import { useSubmitRelease } from "./hooks/useSubmitRelease"
import useUploadTracks from "./hooks/useUploadTracks"
import {
	initialState as emptyInitialState,
	mockedInitialState,
} from "./InitialState"
import { ArtistState, ArtistType } from "./models/ArtistState.model"
import { CreateReleaseAction } from "./models/CreateReleaseAction.model"
import { LabelState } from "./models/LabelState.model"
import CreateReleaseReducer from "./reducers/CreateReleaseReducerMain"

// const MOCK_STATE = process.env.NODE_ENV === "development"
const MOCK_STATE = false
const initialState = MOCK_STATE ? mockedInitialState : emptyInitialState
export type CreateReleaseDispatch = Dispatch<CreateReleaseAction>

export const CreateReleaseContext: Context<CreateReleaseContextType> =
	createContext(undefined)

// Provider Component
export const CreateReleaseProvider = ({
	importReleaseEmail,
	children,
	artists,
	labels,
	existingDraft,
}: {
	importReleaseEmail: string
	children: React.ReactChild
	artists: ArtistState[]
	labels: LabelState[]
	existingDraft?: GetReleaseDraft
}) => {
	const router = useRouter()
	const initState = initialState(artists, labels, existingDraft)
	// with Dynamically generated Initial State
	const [state, dispatch] = useReducer(CreateReleaseReducer, initState)

	// Actions
	// Title
	const setTitle = (title) => dispatch({ type: "SET_TITLE", title })
	// Label
	const goToEditLabel = (labelId?: string | null) =>
		dispatch({ type: "GOTO_EDIT_LABEL", labelId })
	const setLabel = (label) => dispatch({ type: "SET_LABEL", label })
	// Cover
	const coverFileSelected = () => dispatch({ type: "COVER_FILE_SELECTED" })
	const coverFileRead = (localDataURL: string) =>
		dispatch({ type: "COVER_FILE_READ", localDataURL })
	const coverFileUploaded = (
		valid: boolean,
		url: string,
		validationMessage: string | null
	) => dispatch({ type: "COVER_FILE_UPLOADED", valid, validationMessage, url })
	// Artists
	const addArtist = () => dispatch({ type: "ADD_ARTIST" })
	const removeLastArtist = () => dispatch({ type: "REMOVE_LAST_ARTIST" })
	const setArtist = (index: number, artistId: string) =>
		dispatch({ type: "SET_ARTIST", index, artistId })
	const setArtistType = (index: number, artistType: ArtistType | null) =>
		dispatch({ type: "SET_ARTIST_TYPE", index, artistType })
	const goToEditArtist = (id?: string | null) =>
		dispatch({ type: "GOTO_EDIT_ARTIST", artistId: id })

	// Edit Artist
	const editArtistSetName = (name: string) =>
		dispatch({ type: "EDIT_ARTIST_SET_NAME", name })
	const editArtistSetSpotifyId = (spotifyId: string) =>
		dispatch({ type: "EDIT_ARTIST_SET_SPOTIFY_ID", spotifyId })
	const editArtistSetSpotifyLink = (spotifyLink: string) =>
		dispatch({ type: "EDIT_ARTIST_SET_SPOTIFY_LINK", spotifyLink })
	const editArtistSetCreateNewSpotifyProfile = (
		createNewSpotifyProfile: boolean
	) =>
		dispatch({
			type: "EDIT_ARTIST_SET_CREATE_NEW_SPOTIFY_PROFILE",
			createNewSpotifyProfile,
		})
	const editArtistSetAppleMusicId = (appleMusicId: string) =>
		dispatch({ type: "EDIT_ARTIST_SET_APPLE_MUSIC_ID", appleMusicId })
	const editArtistSetCreateNewAppleMusicProfile = (
		createNewAppleMusicProfile: boolean
	) =>
		dispatch({
			type: "EDIT_ARTIST_SET_CREATE_NEW_APPLE_MUSIC_PROFILE",
			createNewAppleMusicProfile,
		})

	const editArtistSave = useEditArtistSave(state, dispatch)
	const editArtistCancel = () => dispatch({ type: "EDIT_ARTIST_CANCEL" })

	// Edit Label
	const editLabelSetName = (name: string) =>
		dispatch({ type: "EDIT_LABEL_SET_NAME", name })
	const editLabelSave = useEditLabelSave(state, dispatch)
	const editLabelCancel = () => dispatch({ type: "EDIT_LABEL_CANCEL" })

	// Genres
	const setPrimaryGenre = (genre: string) =>
		dispatch({ type: "SET_PRIMARY_GENRE", genre })
	const setSecondaryGenre = (genre: string) =>
		dispatch({ type: "SET_SECONDARY_GENRE", genre })
	// Page 1
	const page1GoToNext = () => dispatch({ type: "PAGE_1_GOTO_NEXT" })

	//Page 2
	const setLanguage = (language: Language) =>
		dispatch({ type: "SET_LANGUAGE", language })
	const setOriginalReleaseDate = (date: Date) =>
		dispatch({ type: "SET_ORIGINAL_RELEASE_DATE", date })
	const setDigitalReleaseDate = (date: Date) =>
		dispatch({ type: "SET_DIGITAL_RELEASE_DATE", date })
	const setPriceCategory = (category: PriceCategory) =>
		dispatch({ type: "SET_PRICE_CATEGORY", priceCategory: category })
	const setExplicitLyrics = (explicit: boolean) =>
		dispatch({ type: "SET_EXPLICIT_LYRICS", explicitLyrics: explicit })
	const setCopyrightYear = (year: number) =>
		dispatch({ type: "SET_COPYRIGHT_YEAR", year })
	const setPublishingRightsYear = (year: number) =>
		dispatch({ type: "SET_PUBLISHING_RIGHTS_YEAR", year })
	const setCopyrightOwner = (owner: string) =>
		dispatch({ type: "SET_COPYRIGHT_OWNER", owner })
	const setPublishingRightsOwner = (owner: string) =>
		dispatch({ type: "SET_PUBLISHING_RIGHTS_OWNER", owner })
	const setUPC = (upc: string) => dispatch({ type: "SET_UPC", upc })
	const page2GoBack = () => dispatch({ type: "PAGE_2_GO_BACK" })
	const page2GoToNext = () => dispatch({ type: "PAGE_2_GOTO_NEXT" })

	// Page 3

	// Track Uploading:
	const page3GoBack = () => dispatch({ type: "PAGE_3_GO_BACK" })
	const page3GoToNext = () => dispatch({ type: "PAGE_3_GOTO_NEXT" })
	// const trackSelectFiles = (files: File[]) =>
	// 	dispatch({ type: "TRACK_SELECT_FILES", files })
	const { selectFiles: trackSelectFiles } = useUploadTracks(state, dispatch)
	// Track List
	const deleteTrack = (index: number) =>
		dispatch({ type: "DELETE_TRACK", index })
	const trackSwitchPosition = (srcIndex: number, targetIndex: number) =>
		dispatch({ type: "TRACK_SWITCH_POSITION", srcIndex, targetIndex })
	const goToEditTrack = (index: number) =>
		dispatch({ type: "GOTO_EDIT_TRACK", index })

	// Edit Track

	const trackSetTitle = (title: string) =>
		dispatch({ type: "TRACK_SET_TITLE", title })
	const trackSetLabel = (label: LabelState) =>
		dispatch({ type: "TRACK_SET_LABEL", label })
	const trackSetArtist = (index: number, artistId: string) =>
		dispatch({ type: "TRACK_SET_ARTIST", index, artistId })
	const trackSetArtistType = (index: number, artistType: ArtistType) =>
		dispatch({ type: "TRACK_SET_ARTIST_TYPE", index, artistType })
	const trackAddArtist = () => dispatch({ type: "TRACK_ADD_ARTIST" })
	const trackRemoveLastArtist = () =>
		dispatch({ type: "TRACK_REMOVE_LAST_ARTIST" })
	const trackGoToEditArtist = (artistId?: string) =>
		dispatch({ type: "TRACK_GOTO_EDIT_ARTIST", artistId })
	const trackSetPrimaryGenre = (genre: string) =>
		dispatch({ type: "TRACK_SET_PRIMARY_GENRE", genre })
	const trackSetSecondaryGenre = (genre: string) =>
		dispatch({ type: "TRACK_SET_SECONDARY_GENRE", genre })
	const trackSetLanguage = (language: Language) =>
		dispatch({ type: "TRACK_SET_LANGUAGE", language })
	const trackSetMetadataLanguage = (language: Language) =>
		dispatch({ type: "TRACK_SET_METADATA_LANGUAGE", language })
	const trackSetExplicitLyrics = (explicitLyrics: boolean) =>
		dispatch({ type: "TRACK_SET_EXPLICIT_LYRICS", explicitLyrics })
	const trackSetPublishingRightsYear = (year: number) =>
		dispatch({ type: "TRACK_SET_PUBLISHING_RIGHTS_YEAR", year })
	const trackSetPublishingRightsOwner = (owner: string) =>
		dispatch({ type: "TRACK_SET_PUBLISHING_RIGHTS_OWNER", owner })
	const trackSetISRC = (isrc: string) =>
		dispatch({ type: "TRACK_SET_ISRC", isrc })
	const editTrackCancel = () => dispatch({ type: "EDIT_TRACK_CANCEL" })
	const editTrackSave = () => dispatch({ type: "EDIT_TRACK_SAVE" })
	const trackGoToEditLabel = (labelId?: string | null) =>
		dispatch({ type: "TRACK_GOTO_EDIT_LABEL", labelId })

	// Page 4
	const page4GoBack = () => dispatch({ type: "PAGE_4_GO_BACK" })
	const page4GoToPage1 = () => dispatch({ type: "PAGE_4_GO_TO_PAGE_1" })
	const goToEditStores = () => dispatch({ type: "GOTO_EDIT_STORES" })
	const editStoresSave = () => dispatch({ type: "EDIT_STORES_SAVE" })
	const editStoresCancel = () => dispatch({ type: "EDIT_STORES_CANCEL" })
	const setAllStores = () => dispatch({ type: "SET_ALL_STORES" })
	const addStore = (storeId: string) => dispatch({ type: "ADD_STORE", storeId })
	const removeStore = (storeId: string) =>
		dispatch({ type: "REMOVE_STORE", storeId })
	const addBeatLink = () => dispatch({ type: "ADD_BEAT_LINK" })
	const setBeatLink = (index: number, link: string) =>
		dispatch({ type: "SET_BEAT_LINK", index, link })
	const addBeatFile = useAddBeatFile(state, dispatch)
	const removeLastBeatFileOrLink = () =>
		dispatch({ type: "REMOVE_LAST_BEAT_FILE_OR_LINK" })
	const setConfirmBeatsOriginal = (original) =>
		dispatch({ type: "SET_CONFIRM_BEATS_ORIGINAL", original })
	const setUnsavedChanges = (isUnsaved: boolean) =>
		dispatch({ type: "SET_UNSAVED_CHANGES", isUnsaved })

	const submitRelease = useSubmitRelease(
		state,
		dispatch,
		importReleaseEmail,
		router,
		setUnsavedChanges
	)
	const saveAsDraft = useSaveAsDraft(
		state,
		dispatch,
		importReleaseEmail,
		router,
		setUnsavedChanges
	)

	return (
		// console.log(text.split('\n').map(line=>line.split(' ')[1]).join(',\n'))
		<CreateReleaseContext.Provider
			value={{
				...state,
				setTitle,
				goToEditLabel,
				setLabel,
				coverFileSelected,
				coverFileRead,
				coverFileUploaded,
				addArtist,
				removeLastArtist,
				setArtist,
				setArtistType,

				goToEditArtist,
				editArtistSetName,
				editArtistSetSpotifyId,
				editArtistSetSpotifyLink,
				editArtistSetCreateNewSpotifyProfile,
				editArtistSetAppleMusicId,
				editArtistSetCreateNewAppleMusicProfile,
				editArtistSave,
				editArtistCancel,

				editLabelSetName,
				editLabelCancel,
				editLabelSave,

				setPrimaryGenre,
				setSecondaryGenre,
				page1GoToNext,
				setLanguage,
				setOriginalReleaseDate,
				setDigitalReleaseDate,
				setPriceCategory,
				setExplicitLyrics,
				setCopyrightYear,
				setPublishingRightsYear,
				setCopyrightOwner,
				setPublishingRightsOwner,
				setUPC,
				page2GoBack,
				page2GoToNext,
				trackSelectFiles,
				deleteTrack,
				trackSwitchPosition,
				goToEditTrack,
				page3GoBack,
				page3GoToNext,

				trackSetTitle,
				trackSetLabel,
				trackSetArtist,
				trackSetArtistType,
				trackAddArtist,
				trackRemoveLastArtist,
				trackGoToEditArtist,
				trackSetPrimaryGenre,
				trackSetSecondaryGenre,
				trackSetLanguage,
				trackSetMetadataLanguage,
				trackSetExplicitLyrics,
				trackSetPublishingRightsYear,
				trackSetPublishingRightsOwner,
				trackSetISRC,
				editTrackSave,
				editTrackCancel,
				trackGoToEditLabel,

				page4GoBack,
				page4GoToPage1,
				goToEditStores,
				editStoresCancel,
				editStoresSave,
				setAllStores,
				addStore,
				removeStore,
				addBeatLink,
				setBeatLink,
				addBeatFile,
				removeLastBeatFileOrLink,
				setConfirmBeatsOriginal,

				submitRelease,
				saveAsDraft,
			}}
		>
			{children}
		</CreateReleaseContext.Provider>
	)
}
