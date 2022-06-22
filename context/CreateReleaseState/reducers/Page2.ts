import { isValidBarcode } from "@lib/validation/validateUPC"
import { Reducer } from "react"
import { Languages } from "../../../models/options/languages"
import { CreateReleaseState } from "../models/CreateReleaseState.model"
import { CRSubReducer } from "./CreateReleaseReducerMain"

const MIN_YEAR = 1900
const MAX_YEAR = 2999

export const page2Reducer: CRSubReducer = (state, action) => {
	switch (action.type) {
		case "SET_LANGUAGE":
			return {
				...state,
				language: action.language,
			}
		case "SET_DIGITAL_RELEASE_DATE":
			return {
				...state,
				releaseDates: {
					...state.releaseDates,
					digital: action.date,
				},
			}
		case "SET_ORIGINAL_RELEASE_DATE":
			return {
				...state,
				releaseDates: {
					...state.releaseDates,
					original: action.date,
				},
			}
		case "SET_PRICE_CATEGORY":
			return {
				...state,
				priceCategory: action.priceCategory,
			}
		case "SET_EXPLICIT_LYRICS":
			return {
				...state,
				explicitLyrics: action.explicitLyrics,
			}
		case "SET_COPYRIGHT_YEAR":
			return {
				...state,
				copyright: {
					...state.copyright,
					year: action.year,
				},
			}
		case "SET_COPYRIGHT_OWNER":
			return {
				...state,
				copyright: {
					...state.copyright,
					owner: action.owner,
				},
			}
		case "SET_PUBLISHING_RIGHTS_YEAR":
			return {
				...state,
				publishingRights: {
					...state.publishingRights,
					year: action.year,
				},
			}
		case "SET_PUBLISHING_RIGHTS_OWNER":
			return {
				...state,
				publishingRights: {
					...state.publishingRights,
					owner: action.owner,
				},
			}
		case "SET_UPC":
			return {
				...state,
				upc: action.upc,
			}

		// Page 2 Validation:

		case "PAGE_2_GOTO_NEXT":
			const invalid: CreateReleaseState["invalid"] = {}
			let allValid = true
			let errorMessage = ""

			// UPC - must be either 'auto' or 12 digits long (with spaces removed)
			const upcWithoutSpaces = state.upc.trim()
			const upcLength = upcWithoutSpaces.length
			if (
				!state.upc ||
				(state.upc !== "auto" && !(upcLength === 13 || upcLength === 12))
			) {
				allValid = false
				errorMessage =
					'Please specify a UPC code that is exactly 13 digits long or set it to "auto"'
				invalid.upc = true
			}
			if (upcWithoutSpaces !== "auto" && !isValidBarcode(upcWithoutSpaces)) {
				allValid = false
				errorMessage = "The provided UPC is invalid (checksum incorrect)"
				invalid.upc = true
			}
			// Publishing Rights Owner
			if (!state.publishingRights.owner) {
				allValid = false
				errorMessage = "Please specify a publishing rights owner"
				invalid.publishingRightsOwner = true
			}
			if (
				state.publishingRights === null ||
				isNaN(state.publishingRights.year) ||
				state.publishingRights.year < MIN_YEAR ||
				state.publishingRights.year > MAX_YEAR
			) {
				allValid = false
				errorMessage = "Please specify a valid publishing rights year"
				invalid.publishingRightsYear = true
			}

			//Copyright
			if (!state.copyright.owner) {
				allValid = false
				errorMessage = "Please specify a copyright owner"
				invalid.copyrightOwner = true
			}
			if (
				state.copyright.year === null ||
				isNaN(state.copyright.year) ||
				state.copyright.year < MIN_YEAR ||
				state.copyright.year > MAX_YEAR
			) {
				allValid = false
				errorMessage = "Please specify a valid copyright year"
				invalid.copyrightYear = true
			}

			//Explicit lyrics: will not be verified

			// Price Category
			if (state.priceCategory === null) {
				allValid = false
				errorMessage = "Please select a price category from the list"
				invalid.priceCategory = true
			}

			// Release Dates
			if (state.releaseDates.digital === null) {
				allValid = false
				errorMessage = "Please specify a digital release date"
				invalid.digitalReleaseDate = true
			}

			if (state.releaseDates.original === null) {
				allValid = false
				errorMessage = "Please specify an original release date"
				invalid.originalReleaseDate = true
			}
			//Release dates must be tomorrow or later
			const tomorrow = new Date(
				new Date().getFullYear(),
				new Date().getMonth(),
				new Date().getDate() + 1
			)
			if (state.releaseDates.digital.getTime() < tomorrow.getTime()) {
				allValid = false
				errorMessage = "The Digital Release Date must be tomorrow or later"
				invalid.digitalReleaseDate = true
			}
			// Original Release date can be arbitrary
			// if(state.releaseDates.original.getTime() < tomorrow.getTime()){
			//     allValid = false;
			//     errorMessage ="The Original Release Date must be tomorrow or later";
			//     invalid.originalReleaseDate = true;
			// }
			if (
				state.releaseDates.original.getTime() >
				state.releaseDates.digital.getTime()
			) {
				allValid = false
				errorMessage =
					"The Original Release Date cannot be after the Digital Release Date"
				invalid.originalReleaseDate = true
			}

			if (state.language === null) {
				allValid = false
				errorMessage = "Please select a language from the list"
				invalid.language = true
			}

			if (allValid) {
				window.scrollTo(0, 0)
				return {
					upc: upcWithoutSpaces,
					...state,
					page: "PAGE_3",
					invalid: {},
					errorMessage: "",
				}
			} else {
				return {
					...state,
					invalid,
					errorMessage,
				}
			}

		case "PAGE_2_GO_BACK":
			window.scrollTo(0, 0)
			return {
				...state,
				page: "PAGE_1",
			}
		default:
			return state
	}
}
