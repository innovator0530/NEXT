import { stores } from "../../../models/options/stores"
import { BeatLink } from "../models/BeatLinkOrFile.model"
import {
	CRSubReducer,
	DISABLE_RELEASE_VALIDATION,
} from "./CreateReleaseReducerMain"

export const page4Reducer: CRSubReducer = (state, action) => {
	switch (action.type) {
		case "PAGE_4_GO_BACK":
			window.scrollTo(0, 0)
			return {
				...state,
				page: "PAGE_3",
				errorMessage: "",
				invalid: {},
			}
		case "PAGE_4_GO_TO_PAGE_1":
			return {
				...state,
				page: "PAGE_1",
				errorMessage: "",
				invalid: {},
			}
		case "GOTO_EDIT_STORES":
			console.log("EDIT_STORES")
			window.scrollTo(0, 0)
			return {
				...state,
				editStoresSelectedStoreIds: [
					...state.selectedStoreIds.map((s) => "" + s),
				],
				errorMessage: "",
				page: "EDIT_STORES",
			}
		case "EDIT_STORES_CANCEL":
			window.scrollTo(0, 0)
			return {
				...state,
				editStoresSelectedStoreIds: null,
				errorMessage: "",
				page: "PAGE_4",
			}
		case "EDIT_STORES_SAVE":
			window.scrollTo(0, 0)
			return {
				...state,
				selectedStoreIds: state.editStoresSelectedStoreIds,
				editStoresSelectedStoreIds: null,
				page: "PAGE_4",
				errorMessage: "",
			}
		case "SET_ALL_STORES":
			return {
				...state,
				selectedStoreIds: stores.map((s) => s.id),
			}
		case "ADD_STORE":
			if (state.editStoresSelectedStoreIds.includes(action.storeId)) {
				return state
			} else {
				return {
					...state,
					editStoresSelectedStoreIds: [
						...state.editStoresSelectedStoreIds,
						action.storeId,
					],
				}
			}
		case "REMOVE_STORE":
			return {
				...state,
				editStoresSelectedStoreIds: state.editStoresSelectedStoreIds.filter(
					(s) => s !== action.storeId
				),
			}
		case "ADD_BEAT_LINK":
			return {
				...state,
				beatLinksOrFiles: [
					...state.beatLinksOrFiles,
					{ type: "LINK", link: "" },
				],
			}
		case "SET_BEAT_LINK":
			const updatedBeatLinksOrFiles = [...state.beatLinksOrFiles]
			if (
				updatedBeatLinksOrFiles[action.index] &&
				updatedBeatLinksOrFiles[action.index].type === "LINK"
			) {
				;(updatedBeatLinksOrFiles[action.index] as BeatLink).link = action.link
			}
			return {
				...state,
				beatLinksOrFiles: updatedBeatLinksOrFiles,
			}
		case "ADD_BEAT_FILE_START_UPLOAD":
			if (state.uploadingBeatFile) {
				return state
			} else {
				return {
					...state,
					uploadingBeatFile: true,
					errorMessage: "Uploading Beat File...",
				}
			}
		case "ADD_BEAT_FILE_UPLOAD_FINISHED":
			return {
				...state,
				beatLinksOrFiles: [
					...state.beatLinksOrFiles,
					{ type: "FILE", url: action.url, name: action.name },
				],
				errorMessage: "",
				uploadingBeatFile: false,
			}
		case "ADD_BEAT_FILE_UPLOAD_FAILED":
			return {
				...state,
				errorMessage: action.errorMessage || "Uploading File failed",
				uploadingBeatFile: false,
			}
		case "SET_CONFIRM_BEATS_ORIGINAL":
			return {
				...state,
				confirmBeatsOriginal: action.original,
			}
		case "REMOVE_LAST_BEAT_FILE_OR_LINK":
			const newBeatLinksOrFiles = [...state.beatLinksOrFiles]
			newBeatLinksOrFiles.pop()
			return {
				...state,
				beatLinksOrFiles: newBeatLinksOrFiles,
				confirmBeatsOriginal: false,
			}
		case "SUBMIT_RELEASE":
			return {
				...state,
				releaseSubmissionLoading: true,
				errorMessage: "Loading...",
			}
		case "SUBMIT_RELEASE_FAILED":
			return {
				...state,
				releaseSubmissionLoading: false,
				errorMessage: action.errorMessage,
			}
		default:
			throw new Error("Should not end uP here!")
	}
}
