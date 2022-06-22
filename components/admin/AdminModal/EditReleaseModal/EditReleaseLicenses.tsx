import { ThemeProvider } from "styled-components"
import { lightTheme } from "../../../../styles/frontend"
import DatePicker from "../../../form-components/DatePicker/DatePicker"
import DropdownInput from "../../../form-components/DropdownInput/DropdownInput"
import { Input } from "../../../form-components/Form_styles"
import {
	DividedContainer,
	FormGroup,
	Label,
} from "../../../frontend/CreateReleaseForms/CreateReleaseForms_styles"
import { PriceCategories } from "../../../../models/options/priceCategories"
import Toggle from "../../../form-components/Toggle/Toggle"
import UPCInput from "../../../form-components/UPCInput/UPCInput"

function EditReleaseLicenses({
	language,
	setLanguage,
	showInvalid,
	setDigitalReleaseDate,
	digitalReleaseDate,
	originalReleaseDate,
	setOriginalReleaseDate,
	priceCategory,
	setPriceCategory,
	explicit,
	setExplicit,
	publishingRightsYear,
	setPublishingRightsYear,
	publishingRights,
	setPublishingRights,
	copyrightYear,
	setCopyrightYear,
	copyright,
	setCopyright,
	upc,
	setUpc
}) {
	const generateUPC = () => {
		const digits = [0]
		for (let i = 0; i < 11; i++) {
			digits.push(Math.floor(Math.random() * 10))
		}
		setUpc(digits.join(""))
	}

	return (
		<ThemeProvider theme={lightTheme}>
			{/* Language */}
			<FormGroup>
				<Label htmlFor="language">Language</Label>
				<Input
					invalid={showInvalid && language.length <= 0}
					required
					value={language}
					onChange={(e) => setLanguage(e.target.value)}
					style={{ marginTop: "16px", marginBottom: "12px" }}
					name="language"
					type="text"
					placeholder="Your Language"
				/>
			</FormGroup>

			{/* Release Dates */}
			<DividedContainer>
				<FormGroup style={{ flexGrow: "1", paddingRight: "12px" }}>
					<Label htmlFor="digitalReleaseDate">Digital Release Date</Label>
					<DatePicker
						style={{ marginTop: "16px" }}
						name="digitalReleaseDate"
						value={new Date(digitalReleaseDate)}
						onChange={(e) => setDigitalReleaseDate(e)}
					/>
				</FormGroup>
				<FormGroup style={{ flexGrow: "1", paddingLeft: "12px" }}>
					<Label htmlFor="originalReleaseDate">Original Release Date</Label>
					<DatePicker
						style={{ marginTop: "16px" }}
						name="originalReleaseDate"
						value={new Date(originalReleaseDate)}
						onChange={(e) => setOriginalReleaseDate(e)}
					/>
				</FormGroup>
			</DividedContainer>

			{/* Price Category */}
			<FormGroup>
				<Label htmlFor="priceCategory">Price Category</Label>
				<DropdownInput
					invalid={showInvalid && !PriceCategories.includes(priceCategory)}
					options={PriceCategories}
					required
					value={priceCategory}
					onChange={(e) => setPriceCategory(e)}
					style={{ marginTop: "16px" }}
					name="priceCategory"
					placeholder="Select your Price Category"
				/>
				{/* <DropdownInput required value={priceCategory} onChange={(e)=>setPriceCategory(e.target.value)} style={{marginTop:'16px',marginBottom:'12px'}} name="priceCategory" placeholder="Select your Price Category"/> */}
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

			{/* Copyright */}
			<Label
				style={{ marginTop: "32px", marginBottom: "0px" }}
				htmlFor="copyright"
			>
				Copyright
			</Label>
			<DividedContainer>
				<FormGroup
					style={{ flexGrow: 1, paddingRight: "12px", marginTop: "16px" }}
				>
					<Input
						invalid={
							showInvalid &&
							(copyrightYear == null ||
								copyrightYear < 2000 ||
								copyrightYear > 2199)
						}
						style={{ marginBottom: "0", marginTop: "0px" }}
						type="number"
						min="2000"
						max="3000"
						placeholder="Year"
						name="copyrightYear"
						value={copyrightYear}
						onChange={(e) => setCopyrightYear(e.target.value)}
					/>
				</FormGroup>
				<FormGroup
					style={{ flexGrow: 2, paddingLeft: "12px", marginTop: "16px" }}
				>
					<Input
						invalid={showInvalid && copyright.length <= 0}
						style={{ marginBottom: "0", marginTop: "0px" }}
						name="copyright"
						type="text"
						placeholder="Copyright owner"
						value={copyright}
						onChange={(e) => setCopyright(e.target.value)}
					/>
				</FormGroup>
			</DividedContainer>

			{/* Publishing Rights */}
			<Label
				style={{ marginTop: "32px", marginBottom: "0px" }}
				htmlFor="publishingRights"
			>
				Publishing Rights
			</Label>
			<DividedContainer>
				<FormGroup
					style={{ flexGrow: 1, paddingRight: "12px", marginTop: "16px" }}
				>
					<Input
						invalid={
							showInvalid &&
							(publishingRightsYear == null ||
								publishingRightsYear < 2000 ||
								publishingRightsYear > 2199)
						}
						style={{ marginBottom: "0", marginTop: "0px" }}
						type="number"
						min="2000"
						max="3000"
						placeholder="Year"
						name="publishingRightsYear"
						value={publishingRightsYear}
						onChange={(e) => setPublishingRightsYear(e.target.value)}
					/>
				</FormGroup>
				<FormGroup
					style={{ flexGrow: 2, paddingLeft: "12px", marginTop: "16px" }}
				>
					<Input
						invalid={showInvalid && publishingRights.length <= 0}
						style={{ marginBottom: "0", marginTop: "0px" }}
						name="publishingRights"
						type="text"
						placeholder="Publishing Rights owner"
						value={publishingRights}
						onChange={(e) => setPublishingRights(e.target.value)}
					/>
				</FormGroup>
			</DividedContainer>

			{/* UPC */}
			<FormGroup>
				<Label htmlFor="upc">UPC (Universal Product Code)</Label>
				<UPCInput
					invalid={showInvalid && upc.replace(/\ /gm, "").length != 12}
					onClick={generateUPC}
					required
					value={upc}
					onChange={(e) => setUpc(e.target.value)}
					style={{ marginTop: "16px", marginBottom: "12px" }}
					name="priceCategory"
					placeholder="UPC"
				/>
			</FormGroup>
		</ThemeProvider>
	)
}

export default EditReleaseLicenses
