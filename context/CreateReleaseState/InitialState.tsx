import { GetReleaseDraft } from "@models/api/ReleaseDraft.model"
import { stores } from "@models/options/stores"
import { ArtistState } from "./models/ArtistState.model"
import { CreateReleaseState } from "./models/CreateReleaseState.model"
import { LabelState } from "./models/LabelState.model"

export const initialStateFromExistingDraft = (
	artists: ArtistState[],
	labels: LabelState[],
	draft: GetReleaseDraft
): CreateReleaseState => {
	console.log("draft", draft)
	const today = new Date(
		new Date().getFullYear(),
		new Date().getMonth(),
		new Date().getDate()
	)
	const tomorrow = new Date(today.valueOf())
	tomorrow.setDate(tomorrow.getDate() + 1)

	const currentYear = new Date().getFullYear()
	return {
		existingDraftId: draft.id,
		page: "PAGE_1",
		title: draft.title || "",
		label: {
			labelToEdit: null,
			selected: labels.find((l) => l.id === draft.musicLabelId) || null,
			options: labels,
			loading: false,
		},
		cover: {
			uploading: false,
			valid: null,
			validationMessage: "",
			localDataURL: null,
			fileUrl: draft.coverUrl || null,
		},
		artists: {
			loading: false,
			artistToEdit: null,
			selected: draft.artists.reduce((acc, curr) => {
				const ar = artists.find((a) => a.id === curr.artistId)
				return ar ? [...acc, { type: curr.type, artist: ar }] : acc
			}, []),
			options: artists,
		},
		genres: {
			primaryGenre: draft.primaryGenre || "",
			secondaryGenre: draft.secondaryGenre || "",
		},
		language: draft.language || null,
		releaseDates: {
			original: new Date(draft.originalReleaseDate || tomorrow),
			digital: new Date(draft.digitalReleaseDate || tomorrow),
		},
		priceCategory: draft.priceCategory || null,
		explicitLyrics: draft.explicit || false,
		copyright: {
			year: draft.copyrightYear || currentYear,
			owner: draft.copyrightBy || "",
		},
		publishingRights: {
			year: draft.publishingRightsYear || currentYear,
			owner: draft.publishingRightsBy || "",
		},
		upc: draft.upc || "auto",

		trackToEdit: null,
		trackToEditIndex: -1,
		tracks: draft.soundtracks
			? draft.soundtracks.map((s, index) => {
					return {
						id: "" + index,
						title: s.name,
						selectedLabel: labels.find((l) => l.id === s.musicLabelId) || null,
						selectedArtists: s.artists.reduce((acc, curr) => {
							const ar = artists.find((a) => a.id === curr.artistId)
							return ar ? [...acc, { type: curr.type, artist: ar }] : acc
						}, []),
						localFile: null,
						url: s.fileUrl || null,
						genres: {
							primary: s.primaryGenre || "",
							secondary: s.secondaryGenre || "",
						},
						language: s.language
							? { name: s.language.name, code: s.language.code }
							: null,
						metadataLanguage: s.metadataLanguage
							? { name: s.metadataLanguage.name, code: s.metadataLanguage.code }
							: null,
						explicitLyrics: s.explicit || false,
						publishingRights: {
							year: s.publishingRightsYear || currentYear,
							owner: s.publishingRightsBy || "",
						},
						isrc: s.isrc || "",
					}
			  })
			: [],
		tracksUploading: 0,

		selectedStoreIds: draft.stores.map((s) => s.id),
		editStoresSelectedStoreIds: null,

		beatLinksOrFiles: draft.freeBeats.reduce((acc, curr) => {
			if (curr.type === "FILE") {
				return [
					...acc,
					{
						type: "FILE",
						name: curr.name,
						link: curr.link,
						resolvedUrl: curr.resolvedUrl,
					},
				]
			} else if (curr.type === "LINK") {
				return [...acc, { type: "LINK", link: curr.link }]
			} else return acc
		}, []),
		uploadingBeatFile: false,
		confirmBeatsOriginal: false,

		releaseSubmissionLoading: false,

		invalid: {
			title: false,
			artists: [],
			primaryGenre: false,
			secondaryGenre: false,
			language: false,
			digitalReleaseDate: false,
			originalReleaseDate: false,
			priceCategory: false,
			explicitLyrics: false,
			copyrightYear: false,
			copyrightOwner: false,
			publishingRightsYear: false,
			publishingRightsOwner: false,
			upc: false,
			tracks: [],
			trackTitle: false,
			trackLabel: false,
			trackArtists: [],
			trackPrimaryGenre: false,
			trackSecondaryGenre: false,
			trackLanguage: false,
			trackPublishingRightsYear: false,
			trackPublishingRightsOwner: false,
			trackIsrc: false,
		},
		pageBeforeEdit: null,
		errorMessage: "",
		unsavedChanges: false,

		allowEditIsrc: draft.allowEditIsrc,
		allowEditUpc: draft.allowEditUpc,
	}
}

export const initialState = (
	artists: ArtistState[],
	labels: LabelState[],
	draft?: GetReleaseDraft
): CreateReleaseState => {
	if (draft) {
		return initialStateFromExistingDraft(artists, labels, draft)
	}
	const today = new Date(
		new Date().getFullYear(),
		new Date().getMonth(),
		new Date().getDate()
	)
	const tomorrow = new Date(today.valueOf())
	tomorrow.setDate(tomorrow.getDate() + 1)

	const currentYear = new Date().getFullYear()
	return {
		page: "PAGE_1",
		title: "",
		label: {
			labelToEdit: null,
			selected: null,
			options: labels,
			loading: false,
		},
		cover: {
			uploading: false,
			valid: null,
			validationMessage: "",
			localDataURL: null,
			fileUrl: null,
		},
		artists: {
			loading: false,
			artistToEdit: null,
			selected: [{ type: null, artist: null }],
			options: artists,
		},
		genres: {
			primaryGenre: "",
			secondaryGenre: "",
		},
		language: null,
		releaseDates: {
			original: new Date(tomorrow),
			digital: new Date(tomorrow),
		},
		priceCategory: null,
		explicitLyrics: false,
		copyright: {
			year: currentYear,
			owner: "",
		},
		publishingRights: {
			year: currentYear,
			owner: "",
		},
		upc: "auto",

		trackToEdit: null,
		trackToEditIndex: -1,
		tracks: [],
		tracksUploading: 0,

		selectedStoreIds: [],
		editStoresSelectedStoreIds: null,

		beatLinksOrFiles: [],
		uploadingBeatFile: false,
		confirmBeatsOriginal: false,

		releaseSubmissionLoading: false,

		invalid: {
			title: false,
			artists: [],
			primaryGenre: false,
			secondaryGenre: false,
			language: false,
			digitalReleaseDate: false,
			originalReleaseDate: false,
			priceCategory: false,
			explicitLyrics: false,
			copyrightYear: false,
			copyrightOwner: false,
			publishingRightsYear: false,
			publishingRightsOwner: false,
			upc: false,
			tracks: [],
			trackTitle: false,
			trackLabel: false,
			trackArtists: [],
			trackPrimaryGenre: false,
			trackSecondaryGenre: false,
			trackLanguage: false,
			trackPublishingRightsYear: false,
			trackPublishingRightsOwner: false,
			trackIsrc: false,
		},
		pageBeforeEdit: null,
		errorMessage: "",
		unsavedChanges: false,

		allowEditUpc: true,
		allowEditIsrc: true,
	}
}

export const mockedInitialState = (
	artists: ArtistState[],
	labels: LabelState[]
): CreateReleaseState => {
	const today = new Date(
		new Date().getFullYear(),
		new Date().getMonth(),
		new Date().getDate()
	)
	const tomorrow = new Date(today.valueOf())
	tomorrow.setDate(tomorrow.getDate() + 1)

	const currentYear = new Date().getFullYear()
	return {
		page: "PAGE_1",
		title: "Hello World ",
		label: {
			labelToEdit: null,
			selected: null,
			options: labels,
			loading: false,
		},
		cover: {
			uploading: false,
			valid: null,
			validationMessage: "",
			localDataURL: null,
			fileUrl: null,
		},
		artists: {
			loading: false,
			artistToEdit: null,
			selected: [{ type: "primary", artist: null }],
			options: artists,
		},
		genres: {
			primaryGenre: "Blues",
			secondaryGenre: "",
		},
		language: {
			code: "EN",
			name: "English",
		},
		releaseDates: {
			original: new Date(tomorrow),
			digital: new Date(tomorrow),
		},
		priceCategory: "Mid",
		explicitLyrics: false,
		copyright: {
			year: currentYear,
			owner: "Test Publishing Rights",
		},
		publishingRights: {
			year: currentYear,
			owner: "Test Publishing Rights",
		},
		upc: "auto",

		trackToEdit: null,
		trackToEditIndex: -1,
		tracks: [],
		tracksUploading: 0,

		selectedStoreIds: stores.map((s) => s.id),
		editStoresSelectedStoreIds: null,

		beatLinksOrFiles: [],
		uploadingBeatFile: false,
		confirmBeatsOriginal: true,

		releaseSubmissionLoading: false,

		invalid: {
			title: false,
			artists: [],
			primaryGenre: false,
			secondaryGenre: false,
			language: false,
			digitalReleaseDate: false,
			originalReleaseDate: false,
			priceCategory: false,
			explicitLyrics: false,
			copyrightYear: false,
			copyrightOwner: false,
			publishingRightsYear: false,
			publishingRightsOwner: false,
			upc: false,
			tracks: [],
			trackTitle: false,
			trackLabel: false,
			trackArtists: [],
			trackPrimaryGenre: false,
			trackSecondaryGenre: false,
			trackLanguage: false,
			trackPublishingRightsYear: false,
			trackPublishingRightsOwner: false,
			trackIsrc: false,
		},
		pageBeforeEdit: null,
		errorMessage: "",
		unsavedChanges: false,

		allowEditIsrc: true,
		allowEditUpc: true,
	}
}
