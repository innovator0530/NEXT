import { useState } from "react"
import { Release, ReleaseArtist } from "../../../../models/releases.models"
import Button from "../../../button/button"
import { Form } from "../../../frontend/CreateReleaseForms/CreateReleaseForms_styles"
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
import EditReleaseInfo from "./EditReleaseInfo"
import EditReleaseLicenses from "./EditReleaseLicenses"

function EditReleaseModal(props) {
	const open: Function = props.open

	const release: Release = props.release
	const [tabActive, setTabActive] = useState<string>("RELEASE_INFO")
	const [showInvalid, setShowInvalid] = useState<boolean>(false)

	// Release Info Properties
	const [title, setTitle] = useState<string>(release.title)
	const [label, setLabel] = useState<string>(release.musicLabel)
	const [artists, setArtists] = useState<ReleaseArtist[]>(release.artists)
	const [genres, setGenres] = useState<string[]>(release.genres)

	// Licenses
	const [language, setLanguage] = useState<string>(release.language)
	const [digitalReleaseDate, setDigitalReleaseDate] = useState<Date>(new Date(		release.digitalReleaseDate)
	)
	const [originalReleaseDate, setOriginalReleaseDate] = useState<Date>(
		new Date(release.originalReleaseDate)
	)
	const [priceCategory, setPriceCategory] = useState<string>(
		release.priceCategory
	)
	const [explicit, setExplicit] = useState<boolean>(release.explicit)
	const [publishingRightsYear, setPublishingRightsYear] = useState<number>(
		release.publishingRightsYear
	)
	const [publishingRights, setPublishingRights] = useState<string>(
		release.publishingRightsBy
	)
	const [copyrightYear, setCopyrightYear] = useState<number>(
		release.copyrightYear
	)
	const [copyright, setCopyright] = useState<string>(release.copyrightBy)
	const [upc, setUpc] = useState<string>(release.upc)

	const submitSave = (e) => {
		e.preventDefault()
		props.save({
			...release,
			title,
			musicLabel: label,
			artists,
			genres,
			language,
			digitalReleaseDate,
			originalReleaseDate,
			priceCategory,
			explicit,
			publishingRightsYear,
			publishingRightsBy: publishingRights,
			copyrightYear,
			copyrightBy: copyright,
			upc,
		})
	}
    let modalHeight = 720;
    switch(tabActive){
        case "RELEASE_INFO": modalHeight=720; break;
        case "LICENSES": modalHeight = 980; break;
    }
	return (
		<AdminModal  height={modalHeight} open={true}>
			<ModalSide>
				<SideNavigationContainer>
					<SideButton
						active={tabActive === "RELEASE_INFO"}
						onClick={() => setTabActive("RELEASE_INFO")}
					>
						Release Info
					</SideButton>
					<SideButton
						active={tabActive === "LICENSES"}
						onClick={() => setTabActive("LICENSES")}
					>
						Licenses
					</SideButton>
					<SideButton
						active={tabActive === "STORES"}
						onClick={() => setTabActive("STORES")}
					>
						Stores
					</SideButton>
				</SideNavigationContainer>
			</ModalSide>
			<ModalMain>
				<ModalTitleContainer>
					<ModalTitle>Edit Release Info</ModalTitle>
					<CloseCross onClick={props.cancel}>
						<div className="bar" />
						<div className="bar angled" />
					</CloseCross>
				</ModalTitleContainer>
				{(() => {
					switch (tabActive) {
						case "RELEASE_INFO":
							return (
								<Form>
									<EditReleaseInfo
										showInvalid={showInvalid}
										title={title}
										setTitle={setTitle}
										label={label}
										setLabel={setLabel}
										artists={artists}
										setArtists={setArtists}
										genres={genres}
										setGenres={setGenres}
									/>
								</Form>
							)
						case "LICENSES":
							return (
								<Form >
									<EditReleaseLicenses
										showInvalid={showInvalid}
										language={language}
										setLanguage={setLanguage}
										digitalReleaseDate={digitalReleaseDate}
										setDigitalReleaseDate={setDigitalReleaseDate}
										originalReleaseDate={originalReleaseDate}
										setOriginalReleaseDate={setOriginalReleaseDate}
										priceCategory={priceCategory}
										setPriceCategory={setPriceCategory}
										explicit={explicit}
										setExplicit={setExplicit}
										publishingRightsYear={publishingRightsYear}
										setPublishingRightsYear={setPublishingRightsYear}
										publishingRights={publishingRights}
										setPublishingRights={setPublishingRights}
										copyrightYear={copyrightYear}
										setCopyrightYear={setCopyrightYear}
										copyright={copyright}
										setCopyright={setCopyright}
										upc={upc}
										setUpc={setUpc}
									/>
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

export default EditReleaseModal
