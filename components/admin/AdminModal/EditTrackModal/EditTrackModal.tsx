import { release } from "os"
import React, { useState } from "react"
import { genres } from "../../../../models/options/genres"
import {
	Language,
	TrackLanguages
} from "../../../../models/options/languages"
import {
	Release,
	ReleaseArtist,
	Soundtrack,
} from "../../../../models/releases.models"
import { Form } from "../../../../styles/styles"
import Button from "../../../button/button"
import ArtistsSelector from "../../../form-components/ArtistsSelector/ArtistsSelector"
import DropdownInput from "../../../form-components/DropdownInput/DropdownInput"
import { Input } from "../../../form-components/Form_styles"
import Toggle from "../../../form-components/Toggle/Toggle"
import UPCInput from "../../../form-components/UPCInput/UPCInput"
import { CoverDescriptionsContainer } from "../../../frontend/CreateReleaseForms/CoverUploader/CoverUploader_styles"
import {
	DividedContainer,
	FormGroup,
	Label,
} from "../../../frontend/CreateReleaseForms/CreateReleaseForms_styles"
import AdminModal from "../AdminModal"
import {
	CloseCross,
	ModalMain,
	ModalSide,
	ModalTitle,
	ModalTitleContainer,
	SaveButtonsContainer,
	SideButton,
	SideNavigationContainer,
} from "../AdminModal_styles"
import EditReleaseInfo from "../EditReleaseModal/EditReleaseInfo"

function EditTrackModal(props) {
	const open: Function = props.open

	const release: Release = props.release
	const [soundtrack, setSoundtrack] = useState<Soundtrack>(props.soundtrack)
	const [tabActive, setTabActive] = useState<string>("TITLE_ARTISTS") //2nd tab: PUBLISHING_RIGHTS
	const [showInvalid, setShowInvalid] = useState<boolean>(false)

	// Content State:
	const [title, setTitle] = useState<string>(soundtrack.name)
	const [label, setLabel] = useState<string>(
		soundtrack.musicLabel || release.musicLabel
	)
	const [artists, setArtists] = useState<ReleaseArtist[]>(
		soundtrack.artists && soundtrack.artists.length > 0
			? soundtrack.artists
			: release.artists
	)
	const [primaryGenre, setPrimaryGenre] = useState<string>(
		(soundtrack.genres && soundtrack.genres[0]) || release.genres[0]
	)
	const [secondaryGenre, setSecondaryGenre] = useState<string>(
		(soundtrack.genres && soundtrack.genres[1]) || release.genres[1]
	)
	// Second Tab
	const [language, setLanguage] = useState<Language>(
        
		soundtrack.language && soundtrack.language.length > 0&&TrackLanguages.some(
            (l) => l.code === soundtrack.language)
			? {
					code: soundtrack.language,
					name: TrackLanguages.find(
						(l) => l.code === soundtrack.language
					)?.name,
			  }
			: {
					code: release.language,
					name: TrackLanguages.find((l) => l.code === release.language)?.name,
			  }
	)
	const [explicit, setExplicit] = useState<boolean>(
		typeof soundtrack.explicit === "boolean"
			? soundtrack.explicit
			: release.explicit
	)
	const [publishingRightsYear, setPublishingRightsYear] = useState<number>(
		soundtrack.publishingRightsYear || release.publishingRightsYear
	)
	const [publishingRightsBy, setPublishingRightsBy] = useState<string>(
		soundtrack.publishingRightsBy && soundtrack.publishingRightsBy.length > 0
			? soundtrack.publishingRightsBy
			: release.publishingRightsBy
	)
	const [upc, setUpc] = useState(
		soundtrack.upc && soundtrack.upc.length > 0 ? soundtrack.upc : release.upc
	)

	const submitSave = (e) => {
		e.preventDefault()
		const newSoundtrack: Soundtrack = {
			...soundtrack,
			name: title,
			musicLabel: label,
			artists,
			genres: [primaryGenre, secondaryGenre],
			language: language.code,
			explicit,
			publishingRightsBy,
			publishingRightsYear,
			upc,
		}
		props.save(newSoundtrack, props.index)
	}
	const generateUPC = () => {
		setUpc("auto")
	}
	let modalHeight = 720
	switch (tabActive) {
		case "TITLE_ARTISTS":
			modalHeight = 720
			break
		case "PUBLISHING_RIGHTS":
			modalHeight = 980
			break
	}
	return (
		<AdminModal height={modalHeight} open={true}>
			<ModalSide>
				<SideNavigationContainer>
					<SideButton
						active={tabActive === "TITLE_ARTISTS"}
						onClick={() => setTabActive("TITLE_ARTISTS")}
					>
						Title &amp; Artists
					</SideButton>
					<SideButton
						active={tabActive === "PUBLISHING_RIGHTS"}
						onClick={() => setTabActive("PUBLISHING_RIGHTS")}
					>
						Publishing Rights
					</SideButton>
				</SideNavigationContainer>
			</ModalSide>
			<ModalMain>
				<ModalTitleContainer>
					<ModalTitle>Edit Track {props.index + 1}</ModalTitle>
					<CloseCross onClick={props.cancel}>
						<div className="bar" />
						<div className="bar angled" />
					</CloseCross>
				</ModalTitleContainer>
				{(() => {
					switch (tabActive) {
						case "TITLE_ARTISTS":
							return (
								<Form>
									{/* Track Title */}
									<FormGroup>
										<Label htmlFor="title">Title</Label>
										<Input
											invalid={showInvalid && title.length <= 0}
											required
											value={title}
											onChange={(e) => setTitle(e.target.value)}
											style={{ marginTop: "16px", marginBottom: "12px" }}
											name="title"
											type="text"
											placeholder="Same as release"
										/>
									</FormGroup>

									{/* Music Label */}
									<FormGroup>
										<Label labelText="Label*" htmlFor="label">
											Label
										</Label>
										<Input
											style={{ marginTop: "16px", marginBottom: "12px" }}
											name="title"
											type="text"
											placeholder="Label"
											value={label}
											onChange={(e) => setLabel(e.target.value)}
										/>
									</FormGroup>

									{/* Artists */}
									<ArtistsSelector
										minArtistCount={1}
										value={artists}
										onChange={setArtists}
										showInvalid={showInvalid}
									/>

									{/* Primary / Secondary Genre */}
									<DividedContainer>
										<FormGroup style={{ flexGrow: "1", paddingRight: "12px" }}>
											<Label labelText="Primary genre*" htmlFor="primaryGenre">
												Primary genre
											</Label>
											<DropdownInput
												style={{ marginTop: "16px" }}
												name="primaryGenre"
												placeholder="Your genre"
												value={primaryGenre}
												onChange={(e) => setPrimaryGenre(e)}
												options={genres}
											/>
										</FormGroup>
										<FormGroup style={{ flexGrow: "1", paddingLeft: "12px" }}>
											<Label labelText="Secondary " htmlFor="secondaryGenre">
												Secondary genre
											</Label>
											<DropdownInput
												style={{ marginTop: "16px" }}
												name="secondaryGenre"
												placeholder="Your genre"
												value={secondaryGenre}
												onChange={(e) => setSecondaryGenre(e)}
												options={genres}
											/>
										</FormGroup>
									</DividedContainer>
								</Form>
							)
						case "PUBLISHING_RIGHTS":
							return (
								<Form>
									{/* Language */}
									<FormGroup>
										<Label htmlFor="language">Language</Label>
										<DropdownInput
											required
											value={language.name}
											onChange={(e) => setLanguage(TrackLanguages.find(l=>l.name===e))}
											style={{ marginTop: "16px", marginBottom: "12px" }}
											name="language"
											options={TrackLanguages.map((l) => l.name)}
											placeholder="Your Language"
										/>
									</FormGroup>

									{/* Explicit Lyrics */}
									<FormGroup style={{}}>
										<Label htmlFor="explicitLyrics">Explicit Lyrics</Label>
										<Toggle
											value={explicit}
											onChange={(e) => setExplicit(e.target.value)}
											style={{ marginTop: "16px", marginBottom: "12px" }}
										/>
									</FormGroup>

									{/* Publishing Rights */}
									<Label
										style={{ marginTop: "32px", marginBottom: "0px" }}
										htmlFor="publishingRights"
									>
										Publishing Rights
									</Label>
									<DividedContainer>
										<FormGroup
											style={{
												flexGrow: 1,
												paddingRight: "12px",
												marginTop: "16px",
											}}
										>
											<Input
												style={{ marginBottom: "0", marginTop: "0px" }}
												type="number"
												min="2000"
												max="3000"
												placeholder="Year"
												name="publishingRightsYear"
												value={publishingRightsYear}
												onChange={(e) =>
													setPublishingRightsYear(e.target.value)
												}
											/>
										</FormGroup>
										<FormGroup
											style={{
												flexGrow: 2,
												paddingLeft: "12px",
												marginTop: "16px",
											}}
										>
											<Input
												style={{ marginBottom: "0", marginTop: "0px" }}
												name="publishingRights"
												type="text"
												placeholder="Copyright owner"
												value={publishingRightsBy}
												onChange={(e) => setPublishingRightsBy(e.target.value)}
											/>
										</FormGroup>
									</DividedContainer>

									{/* UPC */}
									<FormGroup>
										<Label htmlFor="upc">UPC (Universal Product Code)</Label>
										<UPCInput
											onClick={generateUPC}
											required
											value={upc}
											onChange={(e) => setUpc(e.target.value)}
											style={{ marginTop: "16px", marginBottom: "12px" }}
											name="upc"
											placeholder="UPC"
										/>
									</FormGroup>
								</Form>
							)
						default:
							return <ModalMain></ModalMain>
					}
				})()}
				<SaveButtonsContainer style={{ marginTop: "32px" }}>
					<Button
						onClick={props.cancel}
						theme={{
							backgroundColor: "#fff",
							color: "#212121",
							border: "1px solid rgba(0,0,0,0.2)",
							padding: "10px 16px",
						}}
					>
						Cancel
					</Button>
					<Button
						onClick={submitSave}
						style={{ marginLeft: "8px" }}
						theme={{
							backgroundColor: "#000",
							color: "#fff",
							padding: "10px 16px",
						}}
					>
						Save
					</Button>
				</SaveButtonsContainer>
			</ModalMain>
		</AdminModal>
	)
}

export default EditTrackModal
