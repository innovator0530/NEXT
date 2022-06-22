import {
	ArtistTypes,
	FEATURING_ARTIST,
	PRIMARY_ARTIST,
} from "@models/options/artistTypes"
import React, { useContext } from "react"
import { CreateReleaseContext } from "../../context/CreateReleaseState/CreateReleaseState"
import { genres as genreOptions } from "../../models/options/genres"
import { darkTheme, Subtitle } from "../../styles/frontend"
import { Input2 as Input } from "../../styles/styles"
import Button from "../button/button"
import ArtistsSelector2 from "../form-components/ArtistsSelector2/ArtistsSelector2"
import DropdownInput from "../form-components/DropdownInput/DropdownInput"
import DropdownInputEdit from "../form-components/DropdownInputEdit/DropdownInputEdit"
import CoverUploader from "../frontend/CreateReleaseForms/CoverUploader/CoverUploader"
import {
	ButtonContainer,
	DividedContainer,
	ErrorMessageContainer,
	Form,
	FormGroup,
} from "../frontend/CreateReleaseForms/CreateReleaseForms_styles"
import InfoLabel from "../frontend/CreateReleaseForms/InfoLabel"

function CreateReleasePage1() {
	const {
		setTitle,
		title,
		invalid,
		label,
		goToEditLabel,
		setLabel,
		genres,
		setPrimaryGenre,
		setSecondaryGenre,
		errorMessage,
		page1GoToNext,
		artists,
		addArtist,
		removeLastArtist,
		setArtist,
		setArtistType,
		goToEditArtist,
		saveAsDraft,
	} = useContext(CreateReleaseContext)

	const onSaveAsDraft = (e) => {
		e.preventDefault()
		saveAsDraft()
	}

	return (
		<Form>
			<Subtitle>Release Info</Subtitle>

			{/* Release Title */}
			<FormGroup>
				<InfoLabel labelText="Release Title*" htmlFor="title">
					Make sure the release title matches with the cover art.
				</InfoLabel>
				<Input
					invalid={invalid.title}
					required
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					style={{ marginTop: "16px", marginBottom: "12px" }}
					name="title"
					type="text"
					placeholder="The name of your release"
				/>
			</FormGroup>

			{/* Music Label */}
			<FormGroup>
				<InfoLabel labelText="Label*" htmlFor="label">
					Indicate the name of the record label of the release. If the release
					is not linked to any record label, select a custom label name (such as
					your artist name) of your choice in this field. Please bear in mind,
					that the name should not be misleading and does not violate
					intellectual property laws.
				</InfoLabel>
				<DropdownInputEdit
					hideButton={!!label.selected}
					buttonText={!!label.selected ? "" : "Create"}
					buttonAction={(e) => {
						if (!label.selected) {
							e.preventDefault()
							goToEditLabel(label?.selected?.id || null)
						}
					}}
					onAddButtonClick={goToEditLabel}
					containerStyle={{ marginTop: "16px", marginBottom: "12px" }}
					addButtonText="Add a Label"
					theme={darkTheme}
					value={label.selected?.name || ""}
					options={label.options.map((l) => ({ label: l.name, id: l.id }))}
					placeholder="Label"
					name="artistType"
					invalid={false}
					onChange={(id) => setLabel(label.options.find((l) => l.id === id))}
				/>
			</FormGroup>

			{/* Cover Uploader */}
			<CoverUploader />

			{/* Artists */}
			<ArtistsSelector2
				artistTypesAvailable={[PRIMARY_ARTIST, FEATURING_ARTIST]}
				selectedArtists={artists.selected}
				artistOptions={artists.options}
				invalid={invalid}
				addArtist={addArtist}
				removeLastArtist={removeLastArtist}
				setArtist={setArtist}
				setArtistType={setArtistType}
				goToEditArtist={goToEditArtist}
				showComment={true}
			/>

			{/* Primary / Secondary Genre */}
			<DividedContainer>
				<FormGroup style={{ flexGrow: "1", paddingRight: "12px" }}>
					<InfoLabel
						labelText="Primary genre*"
						htmlFor="primaryGenre"
						noPopover
					>
						<></>
					</InfoLabel>
					<DropdownInput
						style={{ marginTop: "16px" }}
						invalid={invalid.primaryGenre}
						options={genreOptions}
						name="primaryGenre"
						placeholder="Your genre"
						value={genres.primaryGenre}
						onChange={setPrimaryGenre}
					/>
				</FormGroup>
				<FormGroup style={{ flexGrow: "1", paddingLeft: "12px" }}>
					<InfoLabel
						labelText="Secondary genre"
						htmlFor="secondaryGenre"
						noPopover
					>
						<></>
					</InfoLabel>
					<DropdownInput
						style={{ marginTop: "16px" }}
						name="secondaryGenre"
						options={genreOptions}
						placeholder="Your genre"
						value={genres.secondaryGenre}
						onChange={(e) => setSecondaryGenre(String(e))}
					/>
				</FormGroup>
			</DividedContainer>

			{/* Navigation Buttons  */}
			<ButtonContainer>
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
						page1GoToNext()
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

export default CreateReleasePage1
