import { CRSubReducer } from "./CreateReleaseReducerMain"
import { v4 as uuid } from "uuid"
import { genres } from "../../../models/options/genres"
import { TrackState } from "../models/TrackState.model"
import { ArtistToEdit } from "../models/ArtistState.model"
import { LabelToEdit } from "../models/LabelState.model"
import {
	ArtistTypes,
	COMPOSER_ARTIST,
	LYRICIST_ARTIST,
	PRIMARY_ARTIST,
} from "@models/options/artistTypes"
import {
	INSTRUMENTAL_LANGUAGE_CODE,
	Languages,
	TrackLanguages,
} from "@models/options/languages"
import { CreateReleaseState } from "../models/CreateReleaseState.model"
import { validateISRC } from "@lib/validation/validateISRC"

const currentYear = new Date().getFullYear()

const MIN_YEAR = 1900
const MAX_YEAR = 2199

const validateTrack = (
	track: TrackState
): {
	valid: boolean
	errorMessage?: string
	invalid: CreateReleaseState["invalid"]
} => {
	if (!track.title) {
		return {
			valid: false,
			errorMessage: "Title cannot be empty",
			invalid: {
				trackTitle: true,
			},
		}
	}
	if (track.selectedArtists.length < 1) {
		return {
			valid: false,
			invalid: {},
			errorMessage: "Please add at least 1 artist",
		}
	}
	// Show an error if an artist entry does not have a type selected
	if (
		!track.selectedArtists.reduce(
			(acc, curr) => acc && ArtistTypes.includes(curr.type),
			true
		)
	) {
		return {
			valid: false,
			invalid: {},
			errorMessage:
				"Please select an artist type from the list for each artist.",
		}
	}
	// Show an error if an artist entry does not have a type or an artist selected
	if (
		!track.selectedArtists.reduce(
			(acc, curr) => acc && curr.artist !== null && curr.type !== null,
			true
		)
	) {
		let errorMessage =
			"Please select an artist and a type for each artist in the list"
		if (
			track.selectedArtists.some(
				(a) => a.type === "Composer" && a.artist === null
			)
		) {
			errorMessage = 'Please add a composer under "Artists"'
		}
		return {
			valid: false,
			errorMessage,
			invalid: {
				trackArtists: track.selectedArtists.map(
					(a) => a.type === null || a.artist === null
				),
			},
		}
	}
	if (!track.selectedLabel === null) {
		return {
			errorMessage: "Please select a label",
			valid: false,
			invalid: {
				trackPublishingRightsYear: true,
			},
		}
	}
	if (!track.genres.primary || !genres.includes(track.genres.primary)) {
		return {
			valid: false,
			errorMessage: "Please select a primary genre from the list",
			invalid: {
				trackPrimaryGenre: true,
			},
		}
	}
	if (track.genres.secondary && !genres.includes(track.genres.secondary)) {
		return {
			valid: false,
			errorMessage: "Please select a secondary genre from the list",
			invalid: {
				trackSecondaryGenre: true,
			},
		}
	}
	// Language stuff
	if (
		!track.language ||
		!TrackLanguages.some((l) => l.code === track.language.code)
	) {
		return {
			valid: false,
			errorMessage: "Please select a language from the list",
			invalid: {
				trackLanguage: true,
			},
		}
	}
	// Metadata Language
	if (
		!track.metadataLanguage ||
		!Languages.some((l) => l.code === track.metadataLanguage.code)
	) {
		return {
			valid: false,
			errorMessage: "Please select a language from the list",
			invalid: {
				trackMetadataLanguage: true,
			},
		}
	}
	if (!track.selectedArtists.some((a) => a.type === COMPOSER_ARTIST)) {
		return {
			valid: false,
			errorMessage: 'Please add a composer under "Artists"',
			invalid: {},
		}
	}
	if (
		track.language.code !== INSTRUMENTAL_LANGUAGE_CODE &&
		!track.selectedArtists.some((a) => a.type === LYRICIST_ARTIST)
	) {
		return {
			valid: false,
			errorMessage: 'Please add a lyricist under "Artists"',
			invalid: {},
		}
	}
	if (
		isNaN(track.publishingRights.year) ||
		track.publishingRights.year < MIN_YEAR ||
		track.publishingRights.year > MAX_YEAR
	) {
		return {
			valid: false,
			errorMessage: "Please type in a valid publishing rights year",
			invalid: {
				publishingRightsYear: true,
			},
		}
	}
	if (!track.publishingRights.owner) {
		return {
			valid: false,
			errorMessage: "Please type in a publishing rights owner",
			invalid: {
				trackPublishingRightsOwner: true,
			},
		}
	}
	if (track.isrc !== "auto" && !validateISRC(track.isrc)) {
		return {
			valid: false,
			errorMessage: "The provided ISRC has an invalid format!",
			invalid: {
				trackIsrc: true,
			},
		}
	}
	return {
		valid: true,
		errorMessage: "",
		invalid: {},
	}
}

export const page3Reducer: CRSubReducer = (state, action) => {
	switch (action.type) {
		case "TRACK_FILES_SELECTED":
			return {
				...state,
				tracksUploading: state.tracksUploading + action.count,
			}
		case "TRACK_FILE_UPLOAD_STARTED":
			console.log(`state.tracksUploading`, state.tracksUploading)
			return {
				...state,
			}
		case "TRACK_FILE_UPLOAD_SUCCESSFUL":
			const filename = action.filename.split(".")
			filename.pop()
			const newName = filename.join(".")
			const newLabel =
				state.label.selected === null
					? null
					: JSON.parse(JSON.stringify(state.label.selected))
			const newArtists: TrackState["selectedArtists"] = JSON.parse(
				JSON.stringify(state.artists.selected)
			)
			try {
				newArtists.push({ type: "Composer", artist: null })
			} catch (e) {}
			const newLanguage =
				state.language === null
					? null
					: JSON.parse(JSON.stringify(state.language))
			const newMetadataLanguage =
				state.language === null
					? null
					: JSON.parse(JSON.stringify(state.language))
			const newPublishingRights = {
				year: state.publishingRights.year,
				owner: state.publishingRights.owner,
			}

			const newTrack: TrackState = {
				id: uuid(),
				title: newName,
				selectedLabel: newLabel,
				selectedArtists: newArtists,
				localFile: action.localFile,
				url: action.url,
				genres: {
					primary: "" + state.genres.primaryGenre,
					secondary: "" + state.genres.secondaryGenre,
				},
				language: newLanguage,
				metadataLanguage: newMetadataLanguage,
				explicitLyrics: !!state.explicitLyrics,
				publishingRights: newPublishingRights,
				isrc: "auto",
				addedInCurrentEditSession: true,
			}
			// console.log(`action.duration`, action.duration)
			if (action.duration && action.duration >= 0) {
				newTrack.duration = action.duration
			}
			console.log(`newTrack`, newTrack)
			return {
				...state,
				tracks: [...state.tracks, newTrack],
				tracksUploading: state.tracksUploading - 1,
			}
		case "TRACK_FILE_UPLOAD_FAILED":
			return {
				...state,
				errorMessage: action.message,
				tracksUploading: state.tracksUploading - 1,
			}
		case "TRACK_FILE_REJECTED":
			return {
				...state,
				errorMessage: action.message,
				tracksUploading: state.tracksUploading - 1,
			}
		case "DELETE_TRACK":
			const tracksAfterDelete = [...state.tracks]
			tracksAfterDelete.splice(action.index, 1)
			return {
				...state,
				tracks: tracksAfterDelete,
			}
		case "TRACK_SWITCH_POSITION":
			const tracksAfterPositionSwitch = [...state.tracks]
			const el = tracksAfterPositionSwitch.splice(action.srcIndex, 1)
			if (el && el[0])
				tracksAfterPositionSwitch.splice(action.targetIndex, 0, el[0])
			return {
				...state,
				tracks: tracksAfterPositionSwitch,
			}
		case "GOTO_EDIT_TRACK":
			const trackToEdit = state.tracks[action.index]
			const trackToEditCopy: TrackState = {
				id: "" + trackToEdit.id,
				title: "" + trackToEdit.title,
				selectedLabel:
					trackToEdit.selectedLabel === null
						? null
						: JSON.parse(JSON.stringify(trackToEdit.selectedLabel)),
				selectedArtists: JSON.parse(
					JSON.stringify(trackToEdit.selectedArtists)
				),
				genres: {
					primary: "" + trackToEdit.genres.primary,
					secondary: "" + trackToEdit.genres.secondary,
				},
				language: JSON.parse(JSON.stringify(trackToEdit.language)),
				metadataLanguage: JSON.parse(
					JSON.stringify(trackToEdit.metadataLanguage)
				),
				explicitLyrics: !!trackToEdit.explicitLyrics,
				publishingRights: JSON.parse(
					JSON.stringify(trackToEdit.publishingRights)
				),
				isrc: "" + trackToEdit.isrc,
				localFile: trackToEdit.localFile,
				url: trackToEdit.url,
				duration: trackToEdit.duration,
			}
			if (trackToEdit.addedInCurrentEditSession) {
				trackToEditCopy.addedInCurrentEditSession = true
			}
			window.scrollTo(0, 0)
			return {
				...state,
				page: "EDIT_TRACK",
				trackToEdit: trackToEditCopy,
				trackToEditIndex: action.index,
				invalid: {},
				errorMessage: "",
			}
		case "EDIT_TRACK_SAVE":
			// Validate:

			const { valid, errorMessage, invalid } = validateTrack(state.trackToEdit)
			if (!valid) {
				return {
					...state,
					errorMessage,
					invalid: {
						...state.invalid,
						...invalid,
					},
				}
			}

			const newTracks = [...state.tracks]
			newTracks[state.trackToEditIndex] = state.trackToEdit
			return {
				...state,
				tracks: newTracks,
				trackToEdit: null,
				trackToEditIndex: -1,
				page: "PAGE_3",
				errorMessage: "",
				invalid: {},
			}
		case "EDIT_TRACK_CANCEL":
			return {
				...state,
				page: "PAGE_3",
				trackToEdit: null,
				trackToEditIndex: -1,
				invalid: {},
				errorMessage: "",
			}
		case "TRACK_SET_TITLE":
			return {
				...state,
				trackToEdit: {
					...state.trackToEdit,
					title: action.title,
				},
			}
		case "TRACK_SET_LABEL":
			return {
				...state,
				trackToEdit: {
					...state.trackToEdit,
					selectedLabel: action.label,
				},
			}
		case "TRACK_SET_ARTIST":
			const artists = [...state.trackToEdit.selectedArtists]
			const artist = state.artists.options.find((a) => a.id === action.artistId)
			if (artist) {
				artists[action.index] = { ...artists[action.index], artist }
			}
			return {
				...state,
				trackToEdit: {
					...state.trackToEdit,
					selectedArtists: artists,
				},
			}
		case "TRACK_SET_ARTIST_TYPE":
			const selectedArtists = [...state.trackToEdit.selectedArtists]
			console.log(`selectedArtists`, selectedArtists)
			if (selectedArtists[action.index]) {
				selectedArtists[action.index] = {
					...selectedArtists[action.index],
					type: action.artistType,
				}
			}
			return {
				...state,
				trackToEdit: {
					...state.trackToEdit,
					selectedArtists,
				},
			}
		case "TRACK_ADD_ARTIST":
			return {
				...state,
				trackToEdit: {
					...state.trackToEdit,
					selectedArtists: [
						...state.trackToEdit.selectedArtists,
						{ artist: null, type: null },
					],
				},
			}
		case "TRACK_REMOVE_LAST_ARTIST":
			const artistsToRemoveFrom = [...state.trackToEdit.selectedArtists]
			artistsToRemoveFrom.pop()
			return {
				...state,
				trackToEdit: {
					...state.trackToEdit,
					selectedArtists: artistsToRemoveFrom,
				},
			}
		case "TRACK_GOTO_EDIT_ARTIST":
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
			if (!isNew) artistToEdit.id
			window.scrollTo(0, 0)
			return {
				...state,
				page: "EDIT_ARTIST",
				artists: {
					...state.artists,
					artistToEdit,
				},
				pageBeforeEdit: "EDIT_TRACK",
				errorMessage: "",
				invalid: {},
			}
		case "TRACK_SET_PRIMARY_GENRE":
			return {
				...state,
				trackToEdit: {
					...state.trackToEdit,
					genres: {
						...state.trackToEdit.genres,
						primary: action.genre,
					},
				},
			}
		case "TRACK_SET_SECONDARY_GENRE":
			return {
				...state,
				trackToEdit: {
					...state.trackToEdit,
					genres: {
						...state.trackToEdit.genres,
						secondary: action.genre,
					},
				},
			}
		case "TRACK_SET_LANGUAGE":
			console.log(`action`, action)
			return {
				...state,
				trackToEdit: {
					...state.trackToEdit,
					language: action.language,
				},
			}
		case "TRACK_SET_METADATA_LANGUAGE":
			console.log(`action`, action)
			return {
				...state,
				trackToEdit: {
					...state.trackToEdit,
					metadataLanguage: action.language,
				},
			}
		case "TRACK_SET_EXPLICIT_LYRICS":
			return {
				...state,
				trackToEdit: {
					...state.trackToEdit,
					explicitLyrics: action.explicitLyrics,
				},
			}
		case "TRACK_SET_PUBLISHING_RIGHTS_YEAR":
			return {
				...state,
				trackToEdit: {
					...state.trackToEdit,
					publishingRights: {
						...state.trackToEdit.publishingRights,
						year: action.year,
					},
				},
			}
		case "TRACK_SET_PUBLISHING_RIGHTS_OWNER":
			return {
				...state,
				trackToEdit: {
					...state.trackToEdit,
					publishingRights: {
						...state.trackToEdit.publishingRights,
						owner: action.owner,
					},
				},
			}
		case "TRACK_SET_ISRC":
			return {
				...state,
				trackToEdit: {
					...state.trackToEdit,
					isrc: action.isrc,
				},
			}
		case "PAGE_3_GOTO_NEXT":
			if (state.tracksUploading > 0) {
				return {
					...state,
					errorMessage: "Please wait for uploads to finish",
				}
			}

			// Single releases validation
			if (state.tracks.length === 1) {
				if (state.tracks[0].title !== state.title) {
					return {
						...state,
						errorMessage:
							"Click edit and change the Track title to the Release title, as on page 1/4.",
					}
				}

				// All Artists not Equal (only type and id is comppared)
				if (
					!(
						state.tracks[0].selectedArtists.length !==
							state.artists.selected.length ||
						state.tracks[0].selectedArtists.reduce(
							(acc, curr, index) =>
								acc &&
								curr.artist.id === state.artists.selected[index].artist.id &&
								curr.type === state.artists.selected[index].type,
							true
						)
					)
				) {
					return {
						...state,
						errorMessage:
							"Please make sure that all the individual artists (including producers, featuring artists etc.) are mentioned on the track (page 3) and also on the release page (page 1). As this is a single, the same information must be mentioned throughout the entire release.",
					}
				}
			} else if (state.tracks.length > 1) {
				// check if artists are equal
				if (state.artists.selected.some((a) => a.type !== "primary")) {
					return {
						...state,
						errorMessage:
							"Because your release isn’t a single, please make sure that on the first release page (page 1) only the primary artist is mentioned.",
					}
				}
			} else {
				// Allow user to continue without 0 tracks. They can be added later
				return {
					...state,
					page: "PAGE_4",
					invalid: {},
					errorMessage: "",
				}
			}
			// Validate all tracks:
			for (let i = 0; i < state.tracks.length; i++) {
				const { valid, errorMessage } = validateTrack(state.tracks[i])
				if (!valid) {
					return {
						...state,
						errorMessage: `Error with Track ${i + 1}: ${errorMessage}`,
					}
				}
			}
			// Validate Artists/Contributors
			// Composer Required for all tracks
			const trackWithoutPrimaryArtistIndex = state.tracks.reduce(
				(acc, curr, index) => {
					if (acc >= 0) {
						return acc
					} else {
						if (curr.selectedArtists.some((a) => a.type === PRIMARY_ARTIST)) {
							return acc
						} else {
							return index
						}
					}
				},
				-1
			) // returns -1 if all tracks are valid. If not, index of the first invalid
			if (trackWithoutPrimaryArtistIndex >= 0) {
				return {
					...state,
					errorMessage: `Track ${
						trackWithoutPrimaryArtistIndex + 1
					} does not have a primary artist. All tracks need a primary artist`,
				}
			}
			// Composer Required for all tracks
			const trackWithoutComposerIndex = state.tracks.reduce(
				(acc, curr, index) => {
					if (acc >= 0) {
						return acc
					} else {
						if (curr.selectedArtists.some((a) => a.type === COMPOSER_ARTIST)) {
							return acc
						} else {
							return index
						}
					}
				},
				-1
			) // returns -1 if all tracks are valid. If not, index of the first invalid
			if (trackWithoutComposerIndex >= 0) {
				return {
					...state,
					errorMessage: `Track ${
						trackWithoutComposerIndex + 1
					} does not have a composer artist. All tracks need a composer`,
				}
			}

			// Composer Required for all non-instrumental tracks
			const trackWithoutLyricistIndex = state.tracks.reduce(
				(acc, curr, index) => {
					if (acc >= 0) {
						return acc
					} else {
						if (
							curr.language.code !== INSTRUMENTAL_LANGUAGE_CODE &&
							!curr.selectedArtists.some((a) => a.type === LYRICIST_ARTIST)
						) {
							return index
						} else {
							return acc
						}
					}
				},
				-1
			) // returns -1 if all tracks are valid. If not, index of the first invalid
			if (trackWithoutLyricistIndex >= 0) {
				return {
					...state,
					errorMessage: `Track ${
						trackWithoutLyricistIndex + 1
					} does not have a lyricist artist. All non-instrumental tracks need a lyricist.`,
				}
			}
			return {
				...state,
				invalid: {},
				errorMessage: "",
				page: "PAGE_4",
			}

		case "PAGE_3_GO_BACK":
			if (state.tracksUploading > 0) {
				return {
					...state,
					errorMessage: "Please wait for uploads to finish",
				}
			}
			window.scrollTo(0, 0)
			return {
				...state,
				page: "PAGE_2",
				errorMessage: "",
				invalid: {},
			}
		case "TRACK_GOTO_EDIT_LABEL":
			const isNewLabel = !action.labelId
			const existingLabel =
				action.labelId &&
				state.label.options.find((l) => l.id === action.labelId)
			const labelToEdit: LabelToEdit = {
				name: existingLabel?.name || "",
				editable: isNewLabel ? true : existingLabel.editable,
				isNew: isNewLabel,
			}
			if (!isNewLabel) {
				labelToEdit.id = existingLabel.id
			}
			window.scrollTo(0, 0)
			return {
				...state,
				page: "EDIT_LABEL",
				pageBeforeEdit: "EDIT_TRACK",
				label: {
					...state.label,
					labelToEdit,
				},
				errorMessage: "",
			}

		default:
			throw new Error("Should not end up here!")
	}
}
