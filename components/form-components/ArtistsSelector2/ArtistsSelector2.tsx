import { FC, useContext } from "react"
import { CreateReleaseContextType } from "../../../context/CreateReleaseState/CreateReleaseContext.model"
import {
	CreateReleaseContext,
} from "../../../context/CreateReleaseState/CreateReleaseState"
import { ArtistTypes } from "../../../models/options/artistTypes"
import Button from "../../button/button"
import { FormGroup } from "../../frontend/CreateReleaseForms/CreateReleaseForms_styles"
import InfoLabel from "../../frontend/CreateReleaseForms/InfoLabel"
import DropdownInput from "../DropdownInput/DropdownInput"
import DropdownInputEdit from "../DropdownInputEdit/DropdownInputEdit"
import {
	ButtonContainer,
	Comment,
	Container,
	DividedContainer,
} from "./ArtistsSelector2_styles"

type CTX = CreateReleaseContextType

const ArtistsSelector2: FC<{
	artistTypesAvailable?: string[],
	theme?: any
	minArtistCount?: number
	selectedArtists: CTX["artists"]['selected']
	artistOptions: CTX['artists']['options']
	invalid: CTX["invalid"]
	addArtist: CTX["addArtist"]
	removeLastArtist: CTX["removeLastArtist"]
	setArtist: CTX["setArtist"]
	setArtistType: CTX["setArtistType"]
	goToEditArtist: CTX["goToEditArtist"],
	showComment?: boolean

}> = ({
	selectedArtists,
	artistOptions,
	invalid,
	addArtist,
	removeLastArtist,
	setArtist,
	setArtistType,
	goToEditArtist,
	artistTypesAvailable,
	showComment,
	...props
}) => {
		const minArtistCount =
			typeof props.minArtistCount === "number" ? props.minArtistCount : 1
		const ArtistTypeOptions = artistTypesAvailable || ArtistTypes

		return (
			<Container>
				<InfoLabel
					style={{ marginTop: "32px", marginBottom: "8px" }}
					labelText="Artist(s)"
					htmlFor=""
				>
					Enter the artist name. Primary refers to the main artist performing. Add
					others by clicking the “Add Artist” and selecting the type of artist
					involved in the new box. Please bear in mind that these artists (such as
					producers) are for the entire release. Track specific artists (such as
					feautures) can be added later.{" "}
				</InfoLabel>
				{selectedArtists.map(({ type, artist }, index) => (
					<DividedContainer key={index}>
						<FormGroup
							style={{ flexGrow: 1, paddingRight: "12px", marginTop: "8px" }}
						>
							<DropdownInput
								theme={props.theme}
								value={type}
								options={ArtistTypeOptions}
								placeholder="Type"
								name="artistType"
								invalid={invalid?.artists && invalid.artists[index]?.type}
								onChange={(e) => setArtistType(index, e || null)}
							/>
						</FormGroup>
						<FormGroup
							style={{ flexGrow: 2, paddingLeft: "12px", marginTop: "8px" }}
						>
							<DropdownInputEdit
								invalid={invalid?.artists && invalid.artists[index]?.artist}
								options={artistOptions.map((a) => ({
									id: a.id,
									label: a.name,
								}))}
								style={{ marginBottom: "0px", marginTop: "0px" }}
								name="name"
								buttonAction={() => goToEditArtist(artist && artist?.id)}
								onAddButtonClick={() => goToEditArtist()}
								placeholder="Artist Name"
								value={artist?.name}
								buttonText={!!artist ? "Edit" : "Add an Artist"}
								onChange={(e) => setArtist(index, e)}
							/>
						</FormGroup>
					</DividedContainer>
				))}
				<ButtonContainer>
					<Button
						onClick={(e) => {
							e.preventDefault()
							addArtist()
						}}
						theme={{
							backgroundColor: "#ffffff0C",
							color: "#ffffff59",
							fontWeight: 500,
							borderRadius: "8px",
							padding: "10px 12px",
						}}
						style={{ marginRight: "12px" }}
					>
						Add Artist
					</Button>
					{selectedArtists.length > minArtistCount && (
						<Button
							onClick={(e) => {
								e.preventDefault()
								removeLastArtist()
							}}
							theme={{
								backgroundColor: "#ffffff0C",
								color: "#ffffff59",
								fontWeight: 500,
								borderRadius: "8px",
								padding: "10px 12px",
							}}
							style={{ marginRight: "12px" }}
						>
							Remove Artist
						</Button>

					)}
					{showComment &&<Comment>Other types of artists can be added after <br/>uploading the tracks and editing them</Comment>}
				</ButtonContainer>
			</Container>
		)
	}

export default ArtistsSelector2
