import Checkbox from "components/checkbox/Checkbox"
import { ArtistType } from "context/CreateReleaseState/models/ArtistState.model"
import React, { useContext, useRef, useState } from "react"
import { CreateReleaseContext } from "../../context/CreateReleaseState/CreateReleaseState"
import { CreateReleaseState } from "../../context/CreateReleaseState/models/CreateReleaseState.model"
import { stores } from "../../models/options/stores"
import { darkTheme, Subtitle } from "../../styles/frontend"
import { Input2 } from "../../styles/styles"
import Button from "../button/button"
import { Container } from "../form-components/LinkSelector/LinkSelector_styles"
import {
	ButtonContainer,
	Comment,
	ErrorMessageContainer,
	Form,
	Label,
} from "../frontend/CreateReleaseForms/CreateReleaseForms_styles"
import ReleaseOverview from "../frontend/ReleaseOverview/ReleaseOverview"

// for some reason, you cannot import this function from  the lib folder
export const getArtistsString = (
	selectedArtists: {
		type: ArtistType
		artist: { name: string }
	}[]
): string => {
	const primaryArtists = selectedArtists
		.filter((a) => a.type === "primary")
		.map((a) => a.artist?.name)
		.join(",")
	const featuringArtists = selectedArtists
		.filter((a) => a.type === "featuring")
		.map((a) => a.artist.name)
		.join(",")
	return primaryArtists + (featuringArtists ? " feat. " + featuringArtists : "")
}

export const getStoresString = (selectedStoreIds: string[]): string => {
	const allStoreIds = stores.map((s) => s.id)
	const missing = allStoreIds.reduce(
		(acc, curr) => (selectedStoreIds.includes(curr) ? acc : [...acc, curr]),
		[]
	)
	const isAllStores = allStoreIds.reduce(
		(acc, curr) => acc && selectedStoreIds.includes(curr),
		true
	)
	if (isAllStores) return "All Stores"
	else if (missing.length <= 5)
		return (
			"All Stores except " +
			missing.map((id) => stores.find((s) => s.id === id).name).join(", ")
		)
	else if (selectedStoreIds.length < 1) return "-"
	else
		return selectedStoreIds
			.map((id) => stores.find((s) => s.id === id)?.name)
			.join(", ")
}

function CreateReleasePage4() {
	const {
		title,
		label,
		errorMessage,
		cover: { localDataURL, fileUrl },
		genres,
		releaseDates,
		language,
		explicitLyrics,
		copyright,
		publishingRights,
		selectedStoreIds,
		artists,
		goToEditStores,
		setAllStores,
		page4GoBack,
		page4GoToPage1,
		invalid,
		setBeatLink,
		beatLinksOrFiles,
		addBeatLink,
		removeLastBeatFileOrLink,
		confirmBeatsOriginal,
		setConfirmBeatsOriginal,
		addBeatFile,
		submitRelease,
		tracks,
	} = useContext(CreateReleaseContext)

	const fileInputRef = useRef()
	const clickAddBeatFile = (e) => {
		e.preventDefault()
		if (!fileInputRef.current) return
		;(fileInputRef.current as any).click()
	}

	const handleInput = (e) => {
		const files = e.target.files
		if (files[0]) {
			addBeatFile(e.target.files[0])
		}
	}

	const [submitButtonEnabled, setSubmitButtonEnabled] = useState(true)

	return (
		<div onSubmit={(e) => e.preventDefault()}>
			<Subtitle>Preview &amp; Distribute</Subtitle>

			{/* Release Overview */}
			<ReleaseOverview
				storesEditable={true}
				setAllStores={setAllStores}
				storesString={getStoresString(selectedStoreIds)}
				showUserButton={false}
				imageSource={localDataURL || fileUrl || ""}
				releaseTitle={title}
				musicLabelName={label?.selected?.name || "-"}
				artistsString={getArtistsString(artists.selected)}
				primaryGenre={genres.primaryGenre}
				secondaryGenre={genres.secondaryGenre}
				digitalReleaseDate={releaseDates.digital}
				originalReleaseDate={releaseDates.original}
				languageName={language?.name || "-"}
				explicitLyrics={explicitLyrics}
				copyrightYear={copyright.year}
				copyrightOwner={copyright.owner}
				publishingRightsYear={publishingRights.year}
				publishingRightsOwner={publishingRights.owner}
				goToEditStores={goToEditStores}
				theme={darkTheme}
				soundtracks={tracks.map((t) => ({
					name: t.title,
					localFile: t.localFile,
					fileUrl: t.url,
				}))}
			/>

			{/* Free Beats */}
			<Subtitle>Free Beat(s) / Samples</Subtitle>
			<Comment>
				If you used free beats or samples from YouTube or from elsewhere, please
				add the link(s) or attach relevant files here so we can process your
				release faster.
			</Comment>
			{beatLinksOrFiles.length < 1 && (
				<Container>
					<Checkbox
						invalid={true}
						style={{ marginTop: "16px" }}
						checked={confirmBeatsOriginal}
						onChange={(e) => setConfirmBeatsOriginal(e.target.checked)}
					>
						<Label
							style={{ margin: 0 }}
							htmlFor="accept-terms"
							onClick={() => {
								setConfirmBeatsOriginal(!confirmBeatsOriginal)
							}}
						>
							The beat(s) are 100% self-produced &amp; original.
						</Label>
					</Checkbox>
				</Container>
			)}
			<Container style={{ marginBottom: "48px" }}>
				{beatLinksOrFiles.map((entry, index) => (
					<div style={{ position: "relative" }}>
						<Input2
							disabled={entry.type === "FILE"}
							editable={entry.type === "LINK"}
							key={index}
							value={entry.type === "LINK" ? entry.link : entry.name}
							type="text"
							onChange={
								entry.type === "LINK"
									? (e) => setBeatLink(index, e.target.value)
									: () => {}
							}
							placeholder="Link"
						/>
						{entry.type === "FILE" &&
							entry.resolvedUrl &&
							typeof entry.resolvedUrl === "string" && (
								<a
									style={{
										position: "absolute",
										right: 20,
										top: 32,
										color: "#777",
										textDecoration: "underline",
									}}
									href={entry.resolvedUrl}
									download
									target="_blank"
								>
									Download
								</a>
							)}
					</div>
				))}
				<ButtonContainer alignLeft={true} marginTop={20}>
					<Button
						disabled={false}
						onClick={(e) => {
							e.preventDefault()
							addBeatLink()
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
						Add Link
					</Button>
					<Button
						disabled={false}
						onClick={clickAddBeatFile}
						theme={{
							backgroundColor: "#ffffff0C",
							color: "#ffffff59",
							fontWeight: 500,
							borderRadius: "8px",
							padding: "10px 12px",
						}}
						style={{ marginRight: "12px" }}
					>
						Attach File
					</Button>
					{beatLinksOrFiles.length >= 1 && (
						<Button
							onClick={(e) => {
								e.preventDefault()
								removeLastBeatFileOrLink()
							}}
							theme={{
								backgroundColor: "#ffffff0C",
								color: "#ffffff59",
								fontWeight: 500,
								borderRadius: "8px",
								padding: "10px 12px",
							}}
						>
							Remove
						</Button>
					)}
				</ButtonContainer>
				<input
					style={{ display: "none" }}
					type="file"
					onInput={handleInput}
					ref={fileInputRef}
				/>
			</Container>
			{/* <LinkSelector value={freeLinks} onChange={setFreeLinks} /> */}

			{/* Navigation Buttons  */}
			<ButtonContainer>
				<Button
					onClick={(e) => {
						e.preventDefault()
						page4GoBack()
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
				{/* Show "Back to Page 1" Button if Cover is invalid */}
				{invalid.cover && (
					<Button
						onClick={(e) => {
							e.preventDefault()
							page4GoToPage1()
						}}
						theme={{
							border: "1.35px solid #FFFFFF",
							color: "#fff",
							backgroundColor: "#0000",
							margin: "0 auto 0 0 ",
						}}
					>
						BACK TO PAGE 1
					</Button>
				)}
				{/* <Button  theme={{padding:'12px 22px',backgroundColor:'#0000',color:'rgba(255, 255, 255, 0.5)',fontWeight:'500'}} onClick={saveAsDraft}>Save as draft</Button> */}
				<Button
					disabled={!submitButtonEnabled}
					onClick={(e) => {
						e.preventDefault()
						if (submitButtonEnabled) {
							setSubmitButtonEnabled(false)

							submitRelease()
							setTimeout(() => {
								setSubmitButtonEnabled(true)
							}, 5000)
						}
					}}
				>
					SUBMIT
				</Button>
			</ButtonContainer>
			{/* Error Message */}
			<ErrorMessageContainer>{errorMessage}</ErrorMessageContainer>
		</div>
	)
}

export default CreateReleasePage4
