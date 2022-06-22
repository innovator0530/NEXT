import { CreateReleaseState } from "@context/CreateReleaseState/models/CreateReleaseState.model"
import { PostRelease } from "@models/api/PostRelease.model"
import { stores } from "@models/options/stores"
import Ajv from "ajv"
const ajv = new Ajv()
import PostReleaseSchema from "@models/api/json-schema/PostRelease.json"

export const validatePostRelease = (
	obj: any
): { valid: boolean; errors: any[] } => {
	const validate = ajv.compile(PostReleaseSchema)
	const valid = validate(obj)
	const errors = validate.errors
	return {
		valid,
		errors,
	}
}

export const stateToReleaseSubmission = ({
	title,
	genres,
	language,
	priceCategory,
	explicitLyrics,
	upc,
	...state
}: CreateReleaseState): PostRelease => {
	// Must convert date to UTC (End up with 0:00:00)
	const originalReleaseDateUTC = new Date(
		state.releaseDates.original.getTime() -
			state.releaseDates.original.getTimezoneOffset() * 60000
	)
	const digitalReleaseDateUTC = new Date(
		state.releaseDates.digital.getTime() -
			state.releaseDates.digital.getTimezoneOffset() * 60000
	)
		console.log(`state.tracks`, state.tracks)
	return {
		title: title.trim(),
		labelId: state.label.selected.id,
		coverUrl: state.cover.fileUrl,
		artists: state.artists.selected.map((a) => ({
			type: a.type,
			id: a.artist.id,
		})),
		genres,
		language,
		releaseDates: {
			original: originalReleaseDateUTC.toISOString(),
			digital: digitalReleaseDateUTC.toISOString(),
		},
		priceCategory,
		explicitLyrics,
		copyright: {
			year: state.copyright.year,
			owner: state.copyright.owner,
		},
		publishingRights: {
			year: state.publishingRights.year,
			owner: state.publishingRights.owner,
		},
		upc,
		tracks: state.tracks.map((t) => ({
			title: t.title,
			labelId: t.selectedLabel.id,
			artists: t.selectedArtists.map((a) => ({
				type: a.type,
				id: a.artist.id,
			})),
			fileUrl: t.url,
			genres: t.genres,
			language: t.language,
			metadataLanguage: t.metadataLanguage,
			explicitLyrics: t.explicitLyrics,
			publishingRights: {
				year: t.publishingRights.year,
				owner: t.publishingRights.owner,
			},
			isrc: t.isrc,
			duration: t.duration
		})),
		stores: state.selectedStoreIds.map((sid) =>
			stores.find((s) => s.id === sid)
		),
		beatLinksOrFiles: state.beatLinksOrFiles,
	}
}
