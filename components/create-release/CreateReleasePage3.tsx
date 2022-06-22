import React, { useContext } from "react"
import { CreateReleaseContext } from "../../context/CreateReleaseState/CreateReleaseState"
import { Subtitle } from "../../styles/frontend"
import Button from "../button/button"
import TrackUploadsList from "../form-components/TrackUploadsList/TrackUploadsList"
import UploadTrack from "../form-components/UploadTrack/UploadTrack"
import {
	ButtonContainer,
	ErrorMessageContainer,
	Form,
} from "../frontend/CreateReleaseForms/CreateReleaseForms_styles"

function CreateReleasePage3() {
	const { trackSelectFiles, page3GoBack, page3GoToNext, errorMessage, saveAsDraft } =
		useContext(CreateReleaseContext)
	const onSaveAsDraft = (e)=>{
		e.preventDefault();
		saveAsDraft();
	}
	return (
		<Form>
			<Subtitle>Tracks</Subtitle>

			{/* Upload Tracks */}
			<UploadTrack addTrack={trackSelectFiles} />

			{/* Track Uploads List */}
			<TrackUploadsList style={{ marginTop: "32px" }} />

			{/* Navigation Buttons  *style={{ marginTop: "32px" }}*/}
			<ButtonContainer>
				<Button
					onClick={(e) => {
						e.preventDefault()
						page3GoBack()
					}}
					theme={{
						border: "1.35px solid #FFFFFF",
						color: "#fff",
						backgroundColor: "#0000",
						margin: "0 auto 0 0 ",
					}}
				>
					BACK
				</Button>
				<Button
					theme={{
						padding: "12px 22px",
						backgroundColor: "#0000",
						color: "rgba(255, 255, 255, 0.5)",
						fontWeight: "500",
					}}
					onClick={onSaveAsDraft}
				>
					Save as draft
				</Button>
				<Button
					onClick={(e) => {
						e.preventDefault()
						page3GoToNext()
					}}
				>
					NEXT
				</Button>
			</ButtonContainer>

			{/* Error Message */}
			<ErrorMessageContainer>{errorMessage}</ErrorMessageContainer>
		</Form>
	)
}

export default CreateReleasePage3
