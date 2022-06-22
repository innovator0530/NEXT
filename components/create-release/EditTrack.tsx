import React, { useContext } from "react"
import { CreateReleaseContext } from "../../context/CreateReleaseState/CreateReleaseState"
import { genres as genreOptions } from "../../models/options/genres"
import { Languages, TrackLanguages } from "../../models/options/languages"
import { Subtitle } from "../../styles/frontend"
import { Input2 as Input } from "../../styles/styles"
import Button from "../button/button"
import ArtistsSelector2 from "../form-components/ArtistsSelector2/ArtistsSelector2"
import DropdownInput from "../form-components/DropdownInput/DropdownInput"
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

function EditTrack() {
	const {
		trackSetTitle,
		trackSetLabel,
		trackSetArtist,
		trackSetArtistType,
		trackAddArtist,
		trackRemoveLastArtist,
		trackSetPrimaryGenre,
		trackSetSecondaryGenre,
		trackSetLanguage,
		trackSetMetadataLanguage,
		trackSetExplicitLyrics,
		trackSetPublishingRightsYear,
		trackSetPublishingRightsOwner,
		trackSetISRC,
		editTrackCancel,
		editTrackSave,
		trackGoToEditArtist,
		trackGoToEditLabel,
		invalid,
		label: stateLabel,
		artists: stateArtists,
		errorMessage,
		trackToEdit: {
			title,
			selectedLabel,
			selectedArtists,
			genres,
			language,
			metadataLanguage,
			explicitLyrics,
			publishingRights,
			isrc,
			addedInCurrentEditSession,
		},
		allowEditIsrc,
	} = useContext(CreateReleaseContext)
	return (
		<Form>
			<Subtitle>Tracks</Subtitle>

			{/* Track Title */}
			<FormGroup>
				<InfoLabel labelText="Track Title*" htmlFor="title">
					Make sure the release title matches with the cover art.
				</InfoLabel>
				<Input
					invalid={invalid.trackTitle}
					required
					value={title}
					onChange={(e) => trackSetTitle(e.target.value)}
					style={{ marginTop: "16px", marginBottom: "12px" }}
					name="title"
					type="text"
					placeholder="The name of your release"
				/>
			</FormGroup>

			{/* Artists */}
			<ArtistsSelector2
				selectedArtists={selectedArtists || []}
				artistOptions={stateArtists.options}
				invalid={invalid}
				addArtist={trackAddArtist}
				removeLastArtist={trackRemoveLastArtist}
				setArtist={trackSetArtist}
				setArtistType={trackSetArtistType}
				goToEditArtist={trackGoToEditArtist}
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
						name="primaryGenre"
						placeholder="Your genre"
						value={genres.primary}
						onChange={(e) => trackSetPrimaryGenre(e)}
						options={genreOptions}
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
						placeholder="Your genre"
						value={genres.secondary}
						onChange={(e) => trackSetSecondaryGenre(e)}
						options={genreOptions}
					/>
				</FormGroup>
			</DividedContainer>

			{/* Audio Language */}
			<FormGroup>
				<InfoLabel labelText="Audio Language" htmlFor="language">
					The language of this track's lyrics
				</InfoLabel>
				<DropdownInput
					required
					value={language?.name || ""}
					onChange={(e) =>
						trackSetLanguage(TrackLanguages.find((l) => l.name === e) || null)
					}
					style={{ marginTop: "16px", marginBottom: "12px" }}
					name="language"
					options={TrackLanguages.map((l) => l.name)}
					placeholder="Your Language"
				/>
			</FormGroup>

			{/* Metadata Language */}
			<FormGroup>
				<InfoLabel labelText="Metadata Language" htmlFor="metadata_language">
					Assign the language the release data (title, tracks...) is written in.
					If various languages exist, the main one has to be chosen. For more
					information concering language selection,{" "}
					<a
						href="https://support.rewave.ch/hc/en-us/articles/360012502320-Content-Style-Guide-MUST-READ-#h_147740811961545317571907"
						target="_blank"
					>
						click here
					</a>
					.
				</InfoLabel>
				<DropdownInput
					required
					value={metadataLanguage?.name || ""}
					onChange={(e) =>
						trackSetMetadataLanguage(
							TrackLanguages.find((l) => l.name === e) || null
						)
					}
					style={{ marginTop: "16px", marginBottom: "12px" }}
					name="metadata_language"
					options={Languages.map((l) => l.name)}
					placeholder="Metadata Language"
				/>
			</FormGroup>

			{/* Explicit Lyrics */}
			<FormGroup style={{}}>
				<InfoLabel labelText="Explicit Lyrics" htmlFor="explicitLyrics">
					Check the Explicit box if the release data (lyrics, cover...) contains
					explicit material. If this box is checked, do not forget to mark the
					individual tracks which are explicit. If the cover is the only
					explicit content, the tracks do not have to be marked as explicit.
				</InfoLabel>
				<Toggle
					value={explicitLyrics}
					onChange={(e) => trackSetExplicitLyrics(e.target.value)}
					style={{ marginTop: "16px", marginBottom: "12px" }}
				/>
			</FormGroup>

			{/* Publishing Rights */}
			<InfoLabel
				style={{ marginTop: "32px", marginBottom: "0px" }}
				labelText="Publishing Rights"
				htmlFor="publishingRights"
			>
				Provide the legal name of the sound recording owners. This can be the
				record labels legal name, or your first and last name.
			</InfoLabel>
			<DividedContainer>
				<FormGroup
					style={{ flexGrow: 1, paddingRight: "12px", marginTop: "16px" }}
				>
					<Input
						style={{ marginBottom: "0", marginTop: "0px" }}
						type="number"
						min="2000"
						max="3000"
						placeholder="Year"
						name="publishingRightsYear"
						value={publishingRights.year}
						onChange={(e) => trackSetPublishingRightsYear(e.target.value)}
					/>
				</FormGroup>
				<FormGroup
					style={{ flexGrow: 2, paddingLeft: "12px", marginTop: "16px" }}
				>
					<Input
						style={{ marginBottom: "0", marginTop: "0px" }}
						name="publishingRights"
						type="text"
						placeholder="Copyright owner"
						value={publishingRights.owner}
						onChange={(e) => trackSetPublishingRightsOwner(e.target.value)}
					/>
				</FormGroup>
			</DividedContainer>

			{/* UPC */}
			<FormGroup>
				<InfoLabel labelText="ISRC Code" htmlFor="upc">
					Similar to the UPC Code, the ISRC Code helps for identification. If
					you do not have one, we will assign one for you.
				</InfoLabel>
				<UPCInput
					disabled={!allowEditIsrc && !addedInCurrentEditSession}
					onClick={() => trackSetISRC("auto")}
					required
					value={isrc}
					onChange={(e) => trackSetISRC(e.target.value)}
					style={{ marginTop: "16px", marginBottom: "12px" }}
					name="priceCategory"
					placeholder="ISRC"
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
						editTrackCancel()
					}}
				>
					Cancel
				</Button>
				<Button
					onClick={(e) => {
						e.preventDefault()
						editTrackSave()
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

export default EditTrack
