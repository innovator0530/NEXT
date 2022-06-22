import { stateToDraftSubmission } from "@controller/release-draft/stateToPostDraft"
import { NextRouter } from "next/router"
import { Dispatch } from "react"
import { server } from "../../../config"
import { stateToReleaseSubmission } from "../../../controller/releases/submitRelease"
import { CreateReleaseAction } from "../models/CreateReleaseAction.model"
import { CreateReleaseState } from "../models/CreateReleaseState.model"
import { DISABLE_RELEASE_VALIDATION } from "../reducers/CreateReleaseReducerMain"

export const useSaveAsDraft = (
	state: CreateReleaseState,
	dispatch: Dispatch<CreateReleaseAction>,
	importReleaseEmail: string,
	router: NextRouter,
	setUnsavedChanges: (isUnsaved: boolean) => void
) => {
	const submit = async () => {
		dispatch({ type: "SAVE_AS_DRAFT" })
		if (importReleaseEmail) {
			dispatch({
				type: "SAVE_AS_DRAFT_FAILED",
				errorMessage: "Save as draft does not work when importing",
			})
			return
		}

		if (!state.title) {
			dispatch({
				type: "SAVE_AS_DRAFT_FAILED",
				errorMessage: "Please input at least a title for saving as draft.",
			})
			return
		}

		const body = stateToDraftSubmission(state)
		console.log(`body`, body)
		const existingDraftId = state.existingDraftId
		const result = await fetch(
			`${server}/api/releases/draft${
				existingDraftId ? `?existing=${existingDraftId}` : ""
			}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			}
		)
		if (result.status === 200) {
			/// navigate ...
			console.log("DRAFT SUBMISSION SUCCESSFUL")
			setUnsavedChanges(false)
			setTimeout(() => {
				router.push("/app/dashboard")
			}, 1000)
		} else {
			const json = await result.json()
			console.log(`json`, json)
			dispatch({
				type: "SAVE_AS_DRAFT_FAILED",
				errorMessage:
					typeof json?.errorMessage === "string"
						? json.errorMessage
						: "Saving as draft failed",
			})
		}
	}
	return submit
}
