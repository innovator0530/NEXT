import { YOUTUBE_CONTENT_ID, YOUTUBE_MUSIC } from "@models/options/stores"
import { NextRouter } from "next/router"
import { Dispatch } from "react"
import { server } from "../../../config"
import { stateToReleaseSubmission } from "../../../controller/releases/submitRelease"
import { CreateReleaseAction } from "../models/CreateReleaseAction.model"
import { CreateReleaseState } from "../models/CreateReleaseState.model"
import { DISABLE_RELEASE_VALIDATION } from "../reducers/CreateReleaseReducerMain"

export const useSubmitRelease = (
	state: CreateReleaseState,
	dispatch: Dispatch<CreateReleaseAction>,
	importReleaseEmail: string,
	router: NextRouter,
	setUnsavedChanges: (isUnsaved: boolean) => void
) => {
	const submit = async () => {
		if (!state.cover.fileUrl) {
			dispatch({
				type: "SUBMIT_RELEASE_FAILED",
				errorMessage: "Please upload a cover (at page 1)",
			})
			return
		}
		if (state.selectedStoreIds.length < 1) {
			dispatch({
				type: "SUBMIT_RELEASE_FAILED",
				errorMessage: "Please select at least 1 store",
			})
			return
		}
		if (!DISABLE_RELEASE_VALIDATION && state.tracks.length < 1) {
			dispatch({
				type: "SUBMIT_RELEASE_FAILED",
				errorMessage: "Please add at least 1 track",
			})
			return
		}
		if (state.beatLinksOrFiles.length < 1 && !state.confirmBeatsOriginal) {
			dispatch({
				type: "SUBMIT_RELEASE_FAILED",
				errorMessage: "Please add a beat link or check the the box",
			})
			return
		}
		if (state.uploadingBeatFile) {
			dispatch({
				type: "SUBMIT_RELEASE_FAILED",
				errorMessage: "Please wait for the file to upload",
			})
			return
		}
		if (state.tracks.length < 1) {
			dispatch({
				type: "SUBMIT_RELEASE_FAILED",
				errorMessage: "You must add at least 1 track to submit this release.",
			})
			return
		}
		if (state.beatLinksOrFiles.some((f) => f.type === "LINK" && !f.link)) {
			dispatch({
				type: "SUBMIT_RELEASE_FAILED",
				errorMessage: "Links at Free Beat(s) / Samples cannot be empty",
			})
			return
		}
		if (
			state.selectedStoreIds.includes(YOUTUBE_CONTENT_ID.id) &&
			!state.selectedStoreIds.includes(YOUTUBE_MUSIC.id)
		) {
			dispatch({
				type: "SUBMIT_RELEASE_FAILED",
				errorMessage:
					'Stores: If "YouTube Content ID" is selected, "YouTube Music" must be selected as well',
			})
			return
		}
		dispatch({ type: "SUBMIT_RELEASE" })
		const body = stateToReleaseSubmission(state)
		console.log(`body`, body)
		console.log("DRAFT ID:", state.existingDraftId)
		let url
		if (state.existingDraftId) {
			url = `${server}/api/releases/${state.existingDraftId}/submit-draft`
		} else {
			url = `${server}/api/releases?importReleaseEmail=${importReleaseEmail
				.toLowerCase()
				.trim()}`
		}
		const result = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		})

		if (result.status === 200) {
			/// navigate ...
			console.log("RELEASE SUBMISSION SUCCESSFUL")
			setUnsavedChanges(false)
			setTimeout(() => {
				router.push("/app/dashboard")
			}, 1000)
		} else {
			const json = await result.json()
			console.log(`json`, json)
			dispatch({
				type: "SUBMIT_RELEASE_FAILED",
				errorMessage:
					typeof json?.errorMessage === "string"
						? json.errorMessage
						: "Submitting Release failed",
			})
		}
	}
	return submit
}
