import React, { useContext } from "react"
import { CreateReleaseContext } from "../../context/CreateReleaseState/CreateReleaseState"
import { Languages } from "../../models/options/languages"
import { darkTheme, Subtitle } from "../../styles/frontend"
import { Input2 as Input } from "../../styles/styles"
import Button from "../button/button"
import ArtistsSelector2 from "../form-components/ArtistsSelector2/ArtistsSelector2"
import DropdownInput from "../form-components/DropdownInput/DropdownInput"
import DropdownInputEdit from "../form-components/DropdownInputEdit/DropdownInputEdit"
import Toggle from "../form-components/Toggle/Toggle"
import UPCInput from "../form-components/UPCInput/UPCInput"
import {
	ButtonContainer,
	DividedContainer,
	ErrorMessageContainer,
	Form,
	FormGroup,
} from "../frontend/CreateReleaseForms/CreateReleaseForms_styles"
import InfoLabel from "../frontend/CreateReleaseForms/InfoLabel"
import { genres as genreOptions } from "../../models/options/genres"

function EditLabel() {
	const {
		editLabelSetName,
		editLabelSave,
		editLabelCancel,
		label: { labelToEdit: label },
		errorMessage,
	} = useContext(CreateReleaseContext)

	return (
		<Form>
			<Subtitle>{label?.isNew ? "Create new Label" : "Edit Label"}</Subtitle>

			{/* Artist Name */}
			<FormGroup>
				<InfoLabel labelText="Label Name*" htmlFor="title">
					Indicate the name of the record label of the release. If the release
					is not linked to any record label, select a custom label name (such as
					your artist name) of your choice in this field. Please bear in mind,
					that the name should not be misleading and does not violate
					intellectual property laws.
				</InfoLabel>
				<Input
					invalid={false}
					required
					value={label.name}
					onChange={(e) => editLabelSetName(e.target.value)}
					style={{ marginTop: "16px", marginBottom: "12px" }}
					name="title"
					type="text"
					placeholder="The name of your label"
				/>
			</FormGroup>

			{/* Navigation Buttons  */}
			<ButtonContainer>
				<Button
					theme={{
						padding: "12px 22px",
						backgroundColor: "#0000",
						color: "rgba(255, 255, 255, 0.5)",
						fontWeight: "500",
					}}
					onClick={(e) => {
						e.preventDefault()
						editLabelCancel()
					}}
				>
					Cancel
				</Button>
				<Button
					onClick={(e) => {
						e.preventDefault()
						editLabelSave()
					}}
				>
					SAVE
				</Button>
			</ButtonContainer>
			{/* Error Message */}
			<ErrorMessageContainer>{errorMessage}</ErrorMessageContainer>
		</Form>
	)
}

export default EditLabel
