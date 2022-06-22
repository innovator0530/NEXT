import { Reducer } from "react"
import { CreateReleaseAction } from "../models/CreateReleaseAction.model"
import { CreateReleaseState } from "../models/CreateReleaseState.model"
import { draftReducer } from "./Draft"

import { page1Reducer } from "./Page1"
import { page2Reducer } from "./Page2"
import { page3Reducer } from "./Page3"
import { page4Reducer } from "./Page4"

export const DISABLE_RELEASE_VALIDATION = process.env.NODE_ENV === "development"

// Create Release Sub Reducer
export type CRSubReducer = Reducer<CreateReleaseState, CreateReleaseAction>

const CreateReleaseReducer: Reducer<CreateReleaseState, CreateReleaseAction> = (
	state,
	action
) => {
	console.log(`action`, action)
	switch (action.type) {
		case "SET_TITLE":
		case "SET_LABEL":
		case "SET_LABEL_OPTIONS":
		case "GOTO_EDIT_LABEL":
		case "COVER_FILE_SELECTED":
		case "COVER_FILE_READ":
		case "COVER_FILE_UPLOADED":
		case "ADD_ARTIST":
		case "REMOVE_LAST_ARTIST":
		case "SET_ARTIST":
		case "SET_ARTIST_TYPE":
		case "GOTO_EDIT_ARTIST":
		case "EDIT_ARTIST_SET_NAME":
		case "EDIT_ARTIST_SET_SPOTIFY_ID":
		case "EDIT_ARTIST_SET_SPOTIFY_LINK":
		case "EDIT_ARTIST_SAVE":
		case "EDIT_ARTIST_SAVE_FINISHED":
		case "EDIT_ARTIST_SAVE_FAILED":
		case "EDIT_ARTIST_CANCEL":
		case "EDIT_ARTIST_SET_SPOTIFY_ID":
		case "EDIT_ARTIST_SET_SPOTIFY_LINK":
		case "EDIT_ARTIST_SET_CREATE_NEW_SPOTIFY_PROFILE":
		case "EDIT_ARTIST_SET_APPLE_MUSIC_ID":
		case "EDIT_ARTIST_SET_CREATE_NEW_APPLE_MUSIC_PROFILE":
		case "SET_PRIMARY_GENRE":
		case "SET_SECONDARY_GENRE":
		case "PAGE_1_GOTO_NEXT":
		case "EDIT_LABEL_CANCEL":
		case "EDIT_LABEL_SAVE":
		case "EDIT_LABEL_SET_NAME":
		case "EDIT_LABEL_SAVE_FINISHED":
		case "EDIT_LABEL_SAVE_FAILED":
			return page1Reducer(state, action)

		// Page 2:
		case "SET_LANGUAGE":
		case "SET_DIGITAL_RELEASE_DATE":
		case "SET_ORIGINAL_RELEASE_DATE":
		case "SET_PRICE_CATEGORY":
		case "SET_EXPLICIT_LYRICS":
		case "SET_COPYRIGHT_YEAR":
		case "SET_COPYRIGHT_OWNER":
		case "SET_PUBLISHING_RIGHTS_YEAR":
		case "SET_PUBLISHING_RIGHTS_OWNER":
		case "SET_UPC":
		case "PAGE_2_GOTO_NEXT":
		case "PAGE_2_GO_BACK":
			return page2Reducer(state, action)

		// Page 3:
		case "TRACK_FILES_SELECTED":
		case "TRACK_FILE_UPLOAD_STARTED":
		case "TRACK_FILE_UPLOAD_SUCCESSFUL":
		case "TRACK_FILE_UPLOAD_FAILED":
		case "TRACK_FILE_REJECTED":
		case "GOTO_EDIT_TRACK":
		case "EDIT_TRACK_SAVE":
		case "EDIT_TRACK_CANCEL":
		case "TRACK_SET_TITLE":
		case "TRACK_SWITCH_POSITION":
		case "DELETE_TRACK":
		case "TRACK_SET_LABEL":
		case "TRACK_SET_ARTIST":
		case "TRACK_SET_ARTIST_TYPE":
		case "TRACK_GOTO_EDIT_ARTIST":
		case "TRACK_GOTO_EDIT_LABEL":
		case "TRACK_ADD_ARTIST":
		case "TRACK_REMOVE_LAST_ARTIST":
		case "TRACK_SET_PRIMARY_GENRE":
		case "TRACK_SET_SECONDARY_GENRE":
		case "TRACK_SET_LANGUAGE":
		case "TRACK_SET_METADATA_LANGUAGE":
		case "TRACK_SET_EXPLICIT_LYRICS":
		case "TRACK_SET_PUBLISHING_RIGHTS_YEAR":
		case "TRACK_SET_PUBLISHING_RIGHTS_OWNER":
		case "TRACK_SET_ISRC":
		case "PAGE_3_GOTO_NEXT":
		case "PAGE_3_GO_BACK":
			return page3Reducer(state, action)

		// PAGE 4
		case "PAGE_4_GO_BACK":
		case "PAGE_4_GO_TO_PAGE_1":
		case "GOTO_EDIT_STORES":
		case "EDIT_STORES_CANCEL":
		case "EDIT_STORES_SAVE":
		case "SET_ALL_STORES":
		case "ADD_STORE":
		case "REMOVE_STORE":
		case "ADD_BEAT_LINK":
		case "SET_BEAT_LINK":
		case "ADD_BEAT_FILE_START_UPLOAD":
		case "ADD_BEAT_FILE_UPLOAD_FINISHED":
		case "ADD_BEAT_FILE_UPLOAD_FAILED":
		case "REMOVE_LAST_BEAT_FILE_OR_LINK":
		case "SET_CONFIRM_BEATS_ORIGINAL":
		case "SUBMIT_RELEASE":
		case "SUBMIT_RELEASE_FAILED":
			return page4Reducer(state, action)
		case "SAVE_AS_DRAFT":
			return draftReducer(state, action)
		case "SET_UNSAVED_CHANGES":
			return { ...state, unsavedChanges: action.isUnsaved }

		default:
			return state
	}
}

// Sets unsaved changes to true when first called
const CreateReleaseReducerWithUnsavedChanges: Reducer<
	CreateReleaseState,
	CreateReleaseAction
> = (state, action) => {
	if (action.type === "SET_UNSAVED_CHANGES") {
		console.log("action", action)
		return { ...state, unsavedChanges: action.isUnsaved }
	} else {
		return {
			...CreateReleaseReducer(state, action),
			unsavedChanges: true,
		}
	}
}

export default CreateReleaseReducerWithUnsavedChanges
