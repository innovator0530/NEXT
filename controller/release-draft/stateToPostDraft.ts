import { CreateReleaseState } from "@context/CreateReleaseState/models/CreateReleaseState.model"
import { stateToReleaseSubmission } from "@controller/releases/submitRelease"
import { PostReleaseDraft } from "@models/api/ReleaseDraft.model"
import { stores } from "@models/options/stores"

export const stateToDraftSubmission = ({
	title,
	genres,
	language,
	priceCategory,
	explicitLyrics,
	upc,
	...state
}: CreateReleaseState): PostReleaseDraft => {
	// Must convert date to UTC (End up with 0:00:00)
	const originalReleaseDateUTC = state.releaseDates?.original
		? new Date(
				state.releaseDates?.original.getTime() -
					state.releaseDates.original.getTimezoneOffset() * 60000
		  )
		: null
	const digitalReleaseDateUTC = state.releaseDates?.digital
		? new Date(
				state.releaseDates.digital.getTime() -
					state.releaseDates.digital.getTimezoneOffset() * 60000
		  )
		: null
	console.log(`state.tracks`, state.tracks)

	const result: PostReleaseDraft = {
		title,
	}

	if (state.label?.selected) result.labelId = state.label.selected.id
	if (state.cover?.fileUrl) result.coverUrl = state.cover.fileUrl
	if (state.artists?.selected) {
		result.artists = state.artists.selected.map((a) => ({
			type: a?.type || null,
			id: a?.artist?.id || null,
		}))
	}
	if (genres?.primaryGenre) {
		result.genres = { primaryGenre: genres.primaryGenre, secondaryGenre: null }
		if (genres?.secondaryGenre)
			result.genres.secondaryGenre = genres.secondaryGenre
	}
	if (language && language.code) {
		result.language = language
	}
	if (originalReleaseDateUTC) {
		result.releaseDates = {original:originalReleaseDateUTC.toString(),digital:null}
	}
	if (digitalReleaseDateUTC) {
		result.releaseDates.digital = digitalReleaseDateUTC.toString()
	}
	if (priceCategory) {
		result.priceCategory = priceCategory
	}
	result.explicitLyrics = !!explicitLyrics
	if (upc) result.upc = upc
	if (state.copyright) {
		result.copyright = state.copyright
	}
	if (state.publishingRights) {
		result.publishingRights = state.publishingRights
	}

	result.tracks = state.tracks.map((t) => ({
		title: t.title,
		labelId: t.selectedLabel?.id,
		artists: t.selectedArtists.map((a) => ({
			type: a?.type,
			id: a?.artist?.id,
		})),
		fileUrl: t?.url,
		genres: t?.genres,
		language: t?.language,
		metadataLanguage: t?.metadataLanguage,
		explicitLyrics: t?.explicitLyrics,
		publishingRights: {
			year: t?.publishingRights?.year,
			owner: t?.publishingRights?.owner,
		},
		isrc: t.isrc,
		duration: t.duration,
	}))
	result.stores = state.selectedStoreIds.map((sid) =>
		stores.find((s) => s.id === sid)
	)
	result.beatLinksOrFiles = state.beatLinksOrFiles
	return result
}
