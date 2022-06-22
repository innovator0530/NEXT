import { Dispatch } from "react"
import { server } from "../../../config"
import { CreateReleaseAction } from "../models/CreateReleaseAction.model"
import { CreateReleaseState } from "../models/CreateReleaseState.model"

export const useEditLabelSave = (
	state: CreateReleaseState,
	dispatch: Dispatch<CreateReleaseAction>
) => {
	const save = async () => {
		dispatch({ type: "EDIT_LABEL_SAVE" })
		try {
			const labelToEdit = state.label.labelToEdit
			if (!labelToEdit) {
				throw new Error("No Artist to edit!")
			}
			const method = labelToEdit.isNew ? "POST" : "PUT"
			let url = `${server}/api/releases/labels`
			if (!labelToEdit.isNew) url += `/${labelToEdit.id}`
			const result = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: labelToEdit.name
				}),
			})
			if (result.status !== 200){
				let json;
				try{json=await result.json()}catch(e){}
				if(json?.message){
					throw new Error(json.message)
				}
				else{
					throw new Error("Creating label failed")
				}
			}
			const json = await result.json()
			if (json.labels && Array.isArray(json.labels)) {
				dispatch({
					type: "EDIT_LABEL_SAVE_FINISHED",
					updatedLabels: json.labels,
				})
			} else {
				throw new Error("Invalid response from API")
			}
		} catch (e) {
			console.log(e)
			dispatch({ type: "EDIT_LABEL_SAVE_FAILED", errorMessage:'An Error ocurred: '+e.message })
		}
	}
	return save
}
