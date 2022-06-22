import React, { useContext } from "react"
import { CreateReleaseContext } from "../../context/CreateReleaseState/CreateReleaseState"
import { Languages } from "../../models/options/languages"
import {
	PriceCategories,
	PriceCategory,
} from "../../models/options/priceCategories"
import { Subtitle } from "../../styles/frontend"
import DatePicker from "../form-components/DatePicker/DatePicker"
import DropdownInput from "../form-components/DropdownInput/DropdownInput"
import Toggle from "../form-components/Toggle/Toggle"
import {
	ButtonContainer,
	DividedContainer,
	ErrorMessageContainer,
	Form,
	FormGroup,
} from "../frontend/CreateReleaseForms/CreateReleaseForms_styles"
import InfoLabel from "../frontend/CreateReleaseForms/InfoLabel"
import { Input2 as Input } from "../../styles/styles"
import UPCInput from "../form-components/UPCInput/UPCInput"
import Button from "../button/button"

function CreateReleasePage2() {
	const {
		invalid,
		errorMessage,
		page2GoBack,
		page2GoToNext,

		language,
		setLanguage,

		releaseDates,
		setOriginalReleaseDate,
		setDigitalReleaseDate,

		priceCategory,
		setPriceCategory,

		explicitLyrics,
		setExplicitLyrics,

		copyright,
		setCopyrightYear,
		setCopyrightOwner,
		publishingRights,
		setPublishingRightsYear,
		setPublishingRightsOwner,

		upc,
		setUPC,
		allowEditUpc,

		saveAsDraft,
	} = useContext(CreateReleaseContext)

	const onSaveAsDraft = (e) => {
		e.preventDefault()
		saveAsDraft()
	}
	return (
		<Form>
			<Subtitle>Release Info</Subtitle>

			{/* Language */}
			<FormGroup style={{ marginBottom: "12px" }}>
				<InfoLabel labelText="Language" htmlFor="language">
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
					invalid={invalid.language}
					value={language?.name || ""}
					onChange={(e) => {
						setLanguage(Languages.find((l) => l.name === e) || null)
					}}
					style={{ marginTop: "16px" }}
					name="language"
					options={Languages.map((l) => l.name)}
					placeholder="Your Language"
				/>
			</FormGroup>

			{/* Release Dates */}
			<DividedContainer>
				<FormGroup style={{ flexGrow: "1", paddingRight: "12px" }}>
					<InfoLabel
						labelText="Digital Release Date"
						htmlFor="digitalReleaseDate"
					>
						Select the actual date the release should be available in digital
						stores. Please bear in mind, that stores can take 2 days - 5 weeks
						to publish your release.
					</InfoLabel>
					<DatePicker
						style={{ marginTop: "16px" }}
						name="digitalReleaseDate"
						value={releaseDates.digital}
						onChange={(e) => setDigitalReleaseDate(e)}
					/>
				</FormGroup>
				<FormGroup style={{ flexGrow: "1", paddingLeft: "12px" }}>
					<InfoLabel
						labelText="Original Release Date"
						htmlFor="originalReleaseDate"
						noPopover
					>
						<></>
					</InfoLabel>
					<DatePicker
						style={{ marginTop: "16px" }}
						name="originalReleaseDate"
						value={releaseDates.original}
						onChange={(e) => setOriginalReleaseDate(e)}
					/>
				</FormGroup>
			</DividedContainer>

			{/* Price Category */}
			<FormGroup>
				<InfoLabel labelText="Price Category" htmlFor="priceCategory">
					There are 5 price category options, from low to high: Budget,Back,
					Mid, Front, Premium. Price Category applies only to stores like iTunes
					where you can buy a single or an album. For more information
					concerning pricy category,{" "}
					<a
						href="https://support.rewave.ch/hc/en-us/articles/360012502320-Content-Style-Guide-MUST-READ-#h_856660712861545317614033"
						target="_blank"
					>
						click here".
					</a>
				</InfoLabel>
				<DropdownInput
					invalid={invalid.priceCategory}
					options={PriceCategories}
					required
					value={priceCategory}
					onChange={(e) => {
						switch (e) {
							case "Budget":
								setPriceCategory("Budget")
								break
							case "Back":
								setPriceCategory("Back")
								break
							case "Mid":
								setPriceCategory("Mid")
								break
							case "Front":
								setPriceCategory("Front")
								break
							case "Premium":
								setPriceCategory("Premium")
								break
							default:
								setPriceCategory(null)
								break
						}
					}}
					style={{ marginTop: "16px" }}
					name="priceCategory"
					placeholder="Select your Price Category"
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
					onChange={(e) => setExplicitLyrics(e.target.value)}
					style={{ marginTop: "16px", marginBottom: "12px" }}
				/>
			</FormGroup>

			{/* Copyright */}
			<InfoLabel
				style={{ marginTop: "32px", marginBottom: "0px" }}
				labelText="Copyright"
				htmlFor="copyright"
			>
				Provide the year when the release was created and the owner of the
				release. For more information concerning copyright,{" "}
				<a
					href="https://support.rewave.ch/hc/en-us/articles/360012502320-Content-Style-Guide-MUST-READ-#h_856660712861545317614033"
					target="_blank"
				>
					click here".
				</a>
			</InfoLabel>
			<DividedContainer>
				<FormGroup
					style={{ flexGrow: 1, paddingRight: "12px", marginTop: "16px" }}
				>
					<Input
						invalid={invalid.copyrightYear}
						style={{ marginBottom: "0", marginTop: "0px" }}
						type="number"
						min="2000"
						max="3000"
						placeholder="Year"
						name="copyrightYear"
						value={copyright.year}
						onChange={(e) => setCopyrightYear(parseInt(e.target.value))}
					/>
				</FormGroup>
				<FormGroup
					style={{ flexGrow: 2, paddingLeft: "12px", marginTop: "16px" }}
				>
					<Input
						invalid={invalid.copyrightOwner}
						style={{ marginBottom: "0", marginTop: "0px" }}
						name="copyright"
						type="text"
						placeholder="Copyright owner"
						value={copyright.owner}
						onChange={(e) => setCopyrightOwner(e.target.value)}
					/>
				</FormGroup>
			</DividedContainer>

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
						invalid={invalid.publishingRightsYear}
						style={{ marginBottom: "0", marginTop: "0px" }}
						type="number"
						min="2000"
						max="3000"
						placeholder="Year"
						name="publishingRightsYear"
						value={publishingRights.year}
						onChange={(e) => setPublishingRightsYear(parseInt(e.target.value))}
					/>
				</FormGroup>
				<FormGroup
					style={{ flexGrow: 2, paddingLeft: "12px", marginTop: "16px" }}
				>
					<Input
						invalid={invalid.publishingRightsOwner}
						style={{ marginBottom: "0", marginTop: "0px" }}
						name="publishingRights"
						type="text"
						placeholder="Publishing Rights owner"
						value={publishingRights.owner}
						onChange={(e) => setPublishingRightsOwner(e.target.value)}
					/>
				</FormGroup>
			</DividedContainer>

			{/* UPC */}
			<FormGroup>
				<InfoLabel labelText="UPC (Universal Product Code)" htmlFor="upc">
					The UPC code is a barcode which is used to identify the release in the
					distribution process. It is obligatory for distributing a release, and
					if you do not have one, we will assign one to your release.
				</InfoLabel>
				<UPCInput
					disabled={!allowEditUpc}
					invalid={invalid.upc}
					onClick={() => setUPC("auto")}
					required
					value={upc}
					onChange={(e) => setUPC(e.target.value)}
					style={{ marginTop: "16px", marginBottom: "12px" }}
					name="priceCategory"
					placeholder="UPC"
				/>
			</FormGroup>

			{/* Navigation Buttons  */}
			<ButtonContainer>
				<Button
					onClick={(e) => {
						e.preventDefault()
						page2GoBack()
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
						margin: " 0 0 auto 0",
						padding: "12px 22px",
						backgroundColor: "rgba(0,0,0,0)",
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
						page2GoToNext()
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

export default CreateReleasePage2
