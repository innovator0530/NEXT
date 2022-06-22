import { Reducer } from "react"
import { CRSubReducer } from "./CreateReleaseReducerMain"

import { genres } from "../../../models/options/genres"
import { LabelToEdit } from "../models/LabelState.model"
import { ArtistToEdit } from "../models/ArtistState.model"
import { CreateReleaseState } from "../models/CreateReleaseState.model"
import { ArtistTypes, PRIMARY_ARTIST } from "@models/options/artistTypes"
import { genreToIdAndSubgenre } from "@controller/release-delivery/genres"

const MIN_ARTIST_COUNT = 1
const MAX_ARTIST_COUNT = 256

export const page1Reducer: CRSubReducer = (state, action) => {
	switch (action.type) {
		// Title
		case "SET_TITLE":
			return { ...state, title: action.title }

		// Label
		case "SET_LABEL":
			return { ...state, label: { ...state.label, selected: action.label } }
		case "SET_LABEL_OPTIONS":
			// Attention: Must also update the names of the "selected" labels in both Release and all Tracks

			return state
		// const selected =
		// 	action.labels.find((l) => l.id === state.label.selected.id) || null
		// return {
		// 	...state,
		// 	label: { ...state.label, selected, options: action.labels },
		// }
		case "GOTO_EDIT_LABEL":
			const isNewLabel = !action.labelId
			const existingLabel = isNewLabel
				? null
				: state.label.options.find((l) => l.id === action.labelId)
			if (!isNewLabel && !existingLabel) {
				return state
			}
			const labelToEdit: LabelToEdit = {
				isNew: isNewLabel,
				name: isNewLabel ? "" : "" + existingLabel.name,
				editable: isNewLabel ? true : !!existingLabel.editable,
			}
			if (!isNewLabel) labelToEdit.id = "" + existingLabel.id
			window.scrollTo(0, 0)
			return {
				...state,
				page: "EDIT_LABEL",
				pageBeforeEdit: "PAGE_1",
				label: { ...state.label, labelToEdit },
			}
		case "EDIT_LABEL_CANCEL":
			return {
				...state,
				label: {
					...state.label,
					labelToEdit: null,
				},
				page: state.pageBeforeEdit,
			}
		case "EDIT_LABEL_SAVE":
			if (!state.label.labelToEdit.name) {
				return {
					...state,
					errorMessage: "Please type in a name for your label",
				}
			}
			return {
				...state,
				label: {
					...state.label,
					loading: true,
				},
				errorMessage: "Loading ...",
			}
		case "EDIT_LABEL_SET_NAME":
			if (!state.label.labelToEdit.isNew && !state.label.labelToEdit.editable) {
				return state
			}
			return {
				...state,
				label: {
					...state.label,
					labelToEdit: {
						...state.label.labelToEdit,
						name: action.name,
					},
				},
			}
		case "EDIT_LABEL_SAVE_FINISHED":
			const newSelectedLabel =
				action.updatedLabels.find((l) => l.id === state.label.selected?.id) ||
				null
			const newTracks = state.tracks.map((t) => ({
				...t,
				selectedLabel:
					action.updatedLabels.find((l) => l.id === t.selectedLabel?.id) ||
					null,
			}))
			const trackToEditSelected =
				action.updatedLabels.find(
					(l) => l.id === state.trackToEdit?.selectedLabel?.id
				) || null
			return {
				...state,
				label: {
					...state.label,
					loading: false,
					options: action.updatedLabels,
					selected: newSelectedLabel,
					labelToEdit: null,
				},
				tracks: newTracks,
				trackToEdit: {
					...state.trackToEdit,
					selectedLabel: trackToEditSelected,
				},
				errorMessage: "",
				page: state.pageBeforeEdit,
			}
		case "EDIT_LABEL_SAVE_FAILED":
			return {
				...state,
				errorMessage:
					action.errorMessage ||
					"Something went wrong. Please reload the page or try again later",
			}
		// Cover
		case "COVER_FILE_SELECTED":
			return {
				...state,
				cover: {
					uploading: true,
					valid: null,
					localDataURL: null,
					fileUrl: null,
				},
			}
		case "COVER_FILE_READ":
			return {
				...state,
				cover: {
					...state.cover,
					localDataURL: action.localDataURL,
				},
			}
		case "COVER_FILE_UPLOADED":
			if (action.valid) {
				return {
					...state,
					cover: {
						...state.cover,
						uploading: false,
						valid: true,
						fileUrl: action.url,
					},
				}
			} else {
				return {
					...state,
					cover: {
						uploading: false,
						valid: false,
						validationMessage: action.validationMessage,
						localDataURL: null,
						fileUrl: null,
					},
				}
			}
		case "ADD_ARTIST":
			return {
				...state,
				artists: {
					...state.artists,
					selected: [...state.artists.selected, { type: null, artist: null }],
				},
			}
		case "REMOVE_LAST_ARTIST":
			const selectedArtistsAfterRemoval = [...state.artists.selected]
			selectedArtistsAfterRemoval.pop()
			return {
				...state,
				artists: {
					...state.artists,
					selected: selectedArtistsAfterRemoval,
				},
			}
		case "SET_ARTIST":
			const artistToSet = state.artists.options.find(
				(a) => a.id === action.artistId
			)
			if (artistToSet) {
				const newSelectedArtists = [...state.artists.selected]
				newSelectedArtists[action.index].artist = artistToSet
				return {
					...state,
					artists: {
						...state.artists,
						selected: newSelectedArtists,
					},
				}
			} else {
				return state
			}

		case "SET_ARTIST_TYPE":
			if (action.index >= state.artists.selected.length) return state
			const newSelectedArtists = [...state.artists.selected]
			newSelectedArtists[action.index].type = action.artistType
			return {
				...state,
				artists: {
					...state.artists,
					selected: newSelectedArtists,
				},
			}
		case "GOTO_EDIT_ARTIST":
			window.scrollTo(0, 0)
			const existingArtist = action.artistId
				? state.artists.options.find((a) => a.id === action.artistId)
				: null
			const isNew = !existingArtist
			const artistToEdit: ArtistToEdit = {
				isNew,
				name: isNew ? "" : "" + existingArtist.name,
				editable: isNew ? true : existingArtist.editable,
				spotifyId: isNew ? "" : existingArtist?.spotifyId || "",
				spotifyLink: isNew ? "" : existingArtist?.spotifyLink || "",
				createNewSpotifyProfile: isNew
					? false
					: existingArtist?.createNewSpotifyProfile || false,
				appleMusicId: isNew ? "" : existingArtist?.appleMusicId || "",
				createNewAppleMusicProfile: isNew
					? false
					: existingArtist?.createNewAppleMusicProfile || false,
			}
			if (!isNew) artistToEdit.id = existingArtist.id
			return {
				...state,
				page: "EDIT_ARTIST",
				artists: {
					...state.artists,
					artistToEdit,
				},
				pageBeforeEdit: "PAGE_1",
			}
		case "EDIT_ARTIST_SET_NAME":
			if (
				!state.artists.artistToEdit.isNew &&
				!state.artists.artistToEdit.editable
			) {
				return state
			} else {
				return {
					...state,
					artists: {
						...state.artists,
						artistToEdit: {
							...state.artists.artistToEdit,
							name: action.name,
						},
					},
				}
			}
		case "EDIT_ARTIST_SET_SPOTIFY_ID":
			if (
				!state.artists.artistToEdit.isNew &&
				!state.artists.artistToEdit.editable
			) {
				return state
			} else {
				return {
					...state,
					artists: {
						...state.artists,
						artistToEdit: {
							...state.artists.artistToEdit,
							spotifyId: action.spotifyId,
						},
					},
				}
			}
		case "EDIT_ARTIST_SET_SPOTIFY_LINK":
			if (
				!state.artists.artistToEdit.isNew &&
				!state.artists.artistToEdit.editable
			) {
				return state
			} else {
				return {
					...state,
					artists: {
						...state.artists,
						artistToEdit: {
							...state.artists.artistToEdit,
							spotifyLink: action.spotifyLink,
						},
					},
				}
			}
		case "EDIT_ARTIST_SET_CREATE_NEW_SPOTIFY_PROFILE":
			if (
				!state.artists.artistToEdit.isNew &&
				!state.artists.artistToEdit.editable
			) {
				return state
			} else {
				return {
					...state,
					artists: {
						...state.artists,
						artistToEdit: {
							...state.artists.artistToEdit,
							createNewSpotifyProfile: !!action.createNewSpotifyProfile,
						},
					},
				}
			}
		case "EDIT_ARTIST_SET_APPLE_MUSIC_ID":
			if (
				!state.artists.artistToEdit.isNew &&
				!state.artists.artistToEdit.editable
			) {
				return state
			} else {
				return {
					...state,
					artists: {
						...state.artists,
						artistToEdit: {
							...state.artists.artistToEdit,
							appleMusicId: action.appleMusicId,
						},
					},
				}
			}
		case "EDIT_ARTIST_SET_CREATE_NEW_APPLE_MUSIC_PROFILE":
			if (
				!state.artists.artistToEdit.isNew &&
				!state.artists.artistToEdit.editable
			) {
				return state
			} else {
				return {
					...state,
					artists: {
						...state.artists,
						artistToEdit: {
							...state.artists.artistToEdit,
							createNewAppleMusicProfile: !!action.createNewAppleMusicProfile,
						},
					},
				}
			}
		case "EDIT_ARTIST_CANCEL":
			return {
				...state,
				artists: {
					...state.artists,
					artistToEdit: null,
				},
				page: state.pageBeforeEdit,
				errorMessage: "",
			}
		case "EDIT_ARTIST_SAVE":
			if (!state.artists.artistToEdit.name) {
				return {
					...state,
					errorMessage: "Artist name cannot be empty",
				}
			}
			const artistInOptions = state.artists.options.find(
				(a) => a.id === state.artists.artistToEdit.id
			)
			if (
				artistInOptions &&
				!artistInOptions.editable &&
				state.artists.artistToEdit.name !== artistInOptions.name
			) {
				return {
					...state,
					errorMessage: "Cannot edit this artist",
				}
			}

			return {
				...state,
				artists: {
					...state.artists,
					errorMessage: "Loading...",
					loading: true,
				},
			}
		case "EDIT_ARTIST_SAVE_FINISHED":
			console.log(`state.artists.selected`, state.artists.selected)
			const updatedSelectedArtists = state.artists.selected.map((a) =>
				a.artist === null
					? a
					: {
							...a,
							artist:
								action?.updatedArtists?.find((na) => na.id === a.artist?.id) ||
								null,
					  }
			)
			const tracksWithUpdatedArtists = state.tracks.map((t) => ({
				...t,
				selectedArtists: t.selectedArtists.map((a) =>
					a.artist === null
						? a
						: {
								...a,
								artist:
									action.updatedArtists.find((na) => na.id === a.artist?.id) ||
									null,
						  }
				),
			}))
			return {
				...state,
				artists: {
					...state.artists,
					artistToEdit: null,
					options: action.updatedArtists,
					selected: updatedSelectedArtists,
					loading: false,
				},
				tracks: tracksWithUpdatedArtists,
				page: state.pageBeforeEdit,
			}
		case "EDIT_ARTIST_SAVE_FAILED":
			return {
				...state,
				errorMessage:
					action.errorMessage ||
					"Something went wrong. Please reload the page or try again later",
			}

		// Genres
		case "SET_PRIMARY_GENRE":
			return {
				...state,
				genres: {
					...state.genres,
					primaryGenre: action.genre,
				},
			}
		case "SET_SECONDARY_GENRE":
			return {
				...state,
				genres: {
					...state.genres,
					secondaryGenre: action.genre,
				},
			}

		// Page 1 Go Next
		case "PAGE_1_GOTO_NEXT":
			if (
				!state.artists.selected.reduce(
					(acc, curr) => acc && ArtistTypes.includes(curr.type),
					true
				)
			) {
				return {
					...state,
					errorMessage:
						"Please select an artist type from the list for each artist.",
				}
			}

			// No all artists filled
			if (state.artists.selected.length < MIN_ARTIST_COUNT) {
				return {
					...state,
					errorMessage: "Please add at least " + MIN_ARTIST_COUNT + " artists.",
				}
			}
			if (state.artists.selected.length > MAX_ARTIST_COUNT) {
				return {
					...state,
					errorMessage: "Too many artists",
				}
			}
			// A primary artist is required
			const primaryArtistCount = state.artists.selected.filter(
				(a) => a.type === PRIMARY_ARTIST
			).length
			if (primaryArtistCount < 1) {
				return {
					...state,
					errorMessage: "Please add a primary artist",
				}
			}

			let allValid = true
			let errorMessage = ""

			const invalid: Partial<CreateReleaseState["invalid"]> = {}

			// Validate in reverse order to show messages of upper fields first

			// Genres - secondary genre is optional, primary is mandatory
			if (!genres.includes(state.genres.primaryGenre)) {
				allValid = false
				invalid.secondaryGenre = true
				errorMessage = "Please select a secondary genre from the list"
			}
			if (
				!state.genres.primaryGenre ||
				!genres.includes(state.genres.primaryGenre)
			) {
				allValid = false
				invalid.primaryGenre = true
				errorMessage = "Please select a primary genre from the list"
			}
			// Main genre of primary genre cannot be the same as main genre of the secondary genre
			try {
				const {
					mainGenre: { id: primaryMainGenre, name: primaryMainGenreName },
				} = genreToIdAndSubgenre(state.genres.primaryGenre)
				const {
					mainGenre: { id: secondaryMainGenre },
				} = genreToIdAndSubgenre(state.genres.secondaryGenre)
				if (primaryMainGenre === secondaryMainGenre) {
					allValid = false
					invalid.primaryGenre = true
					invalid.secondaryGenre = true
					errorMessage = `Primary and secondary genre cannot both begin with ${primaryMainGenreName}. You may remove the secondary genre.`
				}
			} catch (e) {}

			// Artists
			const artistsValidArray = state.artists.selected.map((a) => ({
				artist: a.artist === null,
				type: a.type === null,
			}))
			if (
				!state.artists.selected.reduce(
					(acc, curr) =>
						acc ? curr.artist !== null && curr.type !== null : false,
					true
				)
			) {
				allValid = false
				invalid.artists = artistsValidArray
				errorMessage =
					"Please select an artist and type for each entry in the list"
			}
			// Cover: Validation will pass without a cover
			// Label
			if (state.label.selected == null) {
				// this must be '==' because it can be undefined too!
				allValid = false
				invalid.label = true
				errorMessage = "Pleases select a label from the list"
			}
			if (state.title.length < 1) {
				allValid = false
				invalid.title = true
				errorMessage = "Please specify a title"
			}
			// if(
			// 	!state.label.options.some(l=>l.name===state.label.selected.name)
			// 	|| !state.label.selected.id
			// ){
			// 	allValid = false;
			// 	invalid.label = true;
			// 	errorMessage = 'Please select a label from the list'
			// }

			if (allValid) {
				window.scrollTo(0, 0)
				return {
					...state,
					page: "PAGE_2",
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
		default:
			throw new Error("Should not end up here!")
	}
}
