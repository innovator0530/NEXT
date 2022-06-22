import { useContext, useState } from "react"
import {
	ButtonContainer,
	CheckboxLabel,
	Form,
} from "../frontend/CreateReleaseForms/CreateReleaseForms_styles"
import {
	stores,
	YOUTUBE_CONTENT_ID,
	YOUTUBE_MUSIC,
} from "../../models/options/stores"
import Checkbox from "../checkbox2/Checkbox"
import { Label } from "../../styles/login"
import { DividerLine } from "../frontend/ReleaseOverview/ReleaseOverview_styles"
import { Subtitle } from "../../styles/frontend"
import Button from "../button/button"
import { CreateReleaseContext } from "../../context/CreateReleaseState/CreateReleaseState"

function EditStores(props) {
	const {
		addStore,
		removeStore,
		editStoresCancel,
		editStoresSave,
		editStoresSelectedStoreIds,
	} = useContext(CreateReleaseContext)

	const storeOptionClick = (index: number, e) => {
		e && e.preventDefault()

		const id = stores[index].id
		const checked = e.target.checked
		if (
			id === YOUTUBE_CONTENT_ID.id &&
			!editStoresSelectedStoreIds.includes(YOUTUBE_MUSIC.id)
		) {
			alert("Please select YouTube Music before adding YouTube Content ID")
			return
		} else if (
			id === YOUTUBE_MUSIC.id &&
			editStoresSelectedStoreIds.includes(YOUTUBE_CONTENT_ID.id)
		) {
			alert("Please unselect YouTube Content ID before removing YouTube Music")
			return
		}

		// Special Thing with YouTube Content ID

		if (checked) {
			addStore(id)
		} else {
			removeStore(id)
		}
	}

	return (
		<>
			<Form>
				<Subtitle>Stores</Subtitle>
				{stores.map((s, index) => {
					return (
						<div key={index}>
							<DividerLine />
							<Checkbox
								key={s.id}
								checked={editStoresSelectedStoreIds.includes(s.id)}
								onChange={(e) => storeOptionClick(index, e)}
								label={s.name}
							/>
						</div>
					)
				})}
			</Form>
			<ButtonContainer style={{ justifyContent: "space-between" }}>
				<Button
					theme={{
						padding: "12px 22px",
						backgroundColor: "#0000",
						color: "rgba(255,255,255,0.8)",
						border: "1.35px solid rgba(255,255,255,0.8)",
					}}
					onClick={editStoresCancel}
				>
					BACK
				</Button>
				<Button onClick={editStoresSave}>SAVE</Button>
			</ButtonContainer>
		</>
	)
}

export default EditStores
