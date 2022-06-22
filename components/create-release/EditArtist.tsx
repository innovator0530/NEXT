import React, { useContext } from "react"
import { CreateReleaseContext } from "../../context/CreateReleaseState/CreateReleaseState"
import { Languages } from "../../models/options/languages"
import { Container, darkTheme, Subtitle } from "../../styles/frontend"
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
	Label,
} from "../frontend/CreateReleaseForms/CreateReleaseForms_styles"
import InfoLabel from "../frontend/CreateReleaseForms/InfoLabel"
import { genres as genreOptions } from "../../models/options/genres"
import Checkbox from "components/checkbox/Checkbox"

function EditArtist() {
	const {
		editArtistSetName,
		editArtistSetSpotifyId,
		editArtistSetSpotifyLink,
		editArtistSetCreateNewSpotifyProfile,
		editArtistSetAppleMusicId,
		editArtistSetCreateNewAppleMusicProfile,
		editArtistSave,
		editArtistCancel,
		artists: { artistToEdit: artist },
		errorMessage,
	} = useContext(CreateReleaseContext)

	const generateSpotifyId = () => {
		try {
			if (!artist.spotifyLink) return
			const url = new URL(artist.spotifyLink)
			if (!url.hostname.includes("spotify")) {
				return
			}
			const pathParts = url.pathname.split("/")
			console.log(`pathParts`, pathParts)
			if (
				pathParts[1] === "artist" &&
				pathParts[2] &&
				typeof pathParts[2] === "string"
			) {
				editArtistSetSpotifyId(pathParts[2])
			}
		} catch (e) {}
	}

	return (
		<Form>
			<Subtitle>{artist?.isNew ? "Create new Artist" : "Edit Artist"}</Subtitle>

			{/* Artist Name */}
			<FormGroup>
				<InfoLabel noPopover={true} labelText="Artist Name*" htmlFor="title">
					Info text here
				</InfoLabel>
				<Input
					invalid={false}
					required
					value={artist.name}
					onChange={(e) => editArtistSetName(e.target.value)}
					style={{ marginTop: "16px", marginBottom: "12px" }}
					name="title"
					type="text"
					placeholder="The name of your artist"
				/>
			</FormGroup>

			{/* Spotify Link/ID */}
			<DividedContainer style={{ marginTop: "20px" }}>
				<FormGroup style={{ flexGrow: "1", paddingRight: "12px" }}>
					<InfoLabel
						noPopover={true}
						labelText="Spotify Artist Link"
						htmlFor="title"
					>
						Info text here
					</InfoLabel>
					<Input
						invalid={false}
						value={artist.createNewSpotifyProfile ? "" : artist.spotifyLink}
						disabled={!!artist.createNewSpotifyProfile}
						onChange={(e) => editArtistSetSpotifyLink(e.target.value)}
						style={{ marginTop: "16px", marginBottom: "12px" }}
						name="title"
						type="text"
						placeholder={
							artist.createNewSpotifyProfile
								? "will create a new profile"
								: "e.g. https://open.spotify.com/artist/1Cs0zKBU1kc0i8ypK3B9ai"
						}
					/>
				</FormGroup>
				<FormGroup style={{ flexGrow: "1", paddingLeft: "12px" }}>
					<InfoLabel noPopover={true} labelText="Spotify ID" htmlFor="title">
						Info text here
					</InfoLabel>
					<Input
						invalid={false}
						//disabled={!!artist.createNewSpotifyProfile}
						disabled={true} // Always disabled
						value={artist.createNewSpotifyProfile ? "" : artist.spotifyId || ""}
						onChange={(e) => editArtistSetSpotifyId(e.target.value)}
						style={{ marginTop: "16px", marginBottom: "12px" }}
						name="title"
						type="text"
						placeholder={
							artist.createNewSpotifyProfile
								? "will create a new profile"
								: "Spotify ID"
						}
					/>
				</FormGroup>
			</DividedContainer>
			<Button
				style={{ marginTop: "12px" }}
				onClick={(e) => {
					e.preventDefault()
					generateSpotifyId()
				}}
				disabled={!artist.spotifyLink || artist.createNewSpotifyProfile}
			>
				Generate Spotify ID from Link
			</Button>
			<Checkbox
				style={{ margin: 0, marginTop: "15px", marginLeft: "3px" }}
				invalid={true}
				checked={!!artist.createNewSpotifyProfile}
				onChange={(e) => editArtistSetCreateNewSpotifyProfile(e.target.checked)}
			>
				<Label
					style={{ margin: 0 }}
					htmlFor="accept-terms"
					onClick={() => {
						editArtistSetCreateNewSpotifyProfile(
							!artist.createNewSpotifyProfile
						)
					}}
				>
					Create a new Spotify profile
				</Label>
			</Checkbox>

			{/* Apple Music ID */}
			<DividedContainer style={{ marginTop: "10px" }}>
				<FormGroup style={{ flexGrow: "1", paddingRight: "12px" }}>
					<InfoLabel labelText="Apple Music Artist ID" htmlFor="apple-music-id">
						The Apple Music Artist ID is 10 numbers long and you can find it at
						the end of the artist link. Example:
						https://music.apple.com/ch/artist/luciano/
						<b style={{ fontWeight: 900, textDecoration: "underline" }}>
							1168706047
						</b>
					</InfoLabel>
					<Input
						invalid={false}
						value={artist.createNewAppleMusicProfile ? "" : artist.appleMusicId}
						onChange={(e) => editArtistSetAppleMusicId(e.target.value)}
						style={{ marginTop: "16px", marginBottom: "12px", width: "50%" }}
						name="apple-music-id"
						type="text"
						disabled={!!artist.createNewAppleMusicProfile}
						placeholder={
							artist.createNewAppleMusicProfile
								? "will create a new profile"
								: "Apple Music Artist ID"
						}
					/>
				</FormGroup>
			</DividedContainer>
			<Checkbox
				style={{ margin: 0, marginTop: "0", marginLeft: "3px" }}
				invalid={false}
				checked={artist.createNewAppleMusicProfile}
				onChange={(e) =>
					editArtistSetCreateNewAppleMusicProfile(e.target.checked)
				}
			>
				<Label
					style={{ margin: 0 }}
					htmlFor="accept-terms"
					onClick={() => {
						editArtistSetCreateNewAppleMusicProfile(
							!artist.createNewAppleMusicProfile
						)
					}}
				>
					Create a new Apple Music profile
				</Label>
			</Checkbox>

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
						editArtistCancel()
					}}
				>
					Cancel
				</Button>
				<Button
					onClick={(e) => {
						e.preventDefault()
						editArtistSave()
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

export default EditArtist
