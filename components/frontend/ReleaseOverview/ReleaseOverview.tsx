import { IDBFreeBeat } from "@models/database/release/FreeBeat"
import Image from "next/image"
import { FC } from "react"
import {
	AttributeContainer,
	AttributeLabel,
	AttributeValue,
	ColumnContainer,
	DividerLine,
	GoToUserButton,
	LeftColumn,
	ReleaseCoverContainer,
	RightColumn,
	StoresButton,
	StoresOptionsLine,
} from "./ReleaseOverview_styles"
import TrackList, { TrackListSoundtrack } from "./TrackList/TrackList"

const ReleaseOverview: FC<{
	storesEditable?: boolean
	goToEditTrack?: () => void
	theme?: any
	goToArtistAccount?: () => void
	setAllStores?: () => void
	storesString: string
	showUserButton?: boolean
	goToEdit?: () => void
	imageSource: string | null
	releaseTitle: string
	musicLabelName: string
	artistsString: string
	primaryGenre: string
	secondaryGenre: string | null
	digitalReleaseDate: Date
	originalReleaseDate: Date
	languageName: string
	explicitLyrics: boolean
	copyrightYear: number
	copyrightOwner: string
	publishingRightsYear: number
	publishingRightsOwner: string
	goToEditStores?: () => void
	soundtracks: TrackListSoundtrack[]
	freeBeats?: (IDBFreeBeat & { resolvedUrl?: string })[]
}> = ({
	storesEditable,
	goToEditTrack,
	theme,
	goToArtistAccount,
	setAllStores,
	storesString,
	showUserButton,
	goToEdit,
	imageSource,
	releaseTitle,
	musicLabelName,
	artistsString,
	primaryGenre,
	secondaryGenre,
	digitalReleaseDate,
	originalReleaseDate,
	languageName,
	explicitLyrics,
	copyrightYear,
	copyrightOwner,
	publishingRightsYear,
	publishingRightsOwner,
	goToEditStores,
	soundtracks,
	freeBeats,
}) => {
	const accessUser = () => {
		// e.preventDefault();
		console.log("Clicked access user")
		// window.open(`/admin/users/database?user=${release.user}`)
	}
	return (
		<ColumnContainer>
			<LeftColumn>
				<AttributeContainer>
					<AttributeLabel>Title</AttributeLabel>
					<AttributeValue>{releaseTitle}</AttributeValue>
				</AttributeContainer>
				<AttributeContainer>
					<AttributeLabel
						onClick={accessUser}
						style={{ display: "flex", opacity: 1 }}
					>
						<AttributeLabel>Artist</AttributeLabel>
						{showUserButton && (
							<GoToUserButton onClick={() => accessUser()}>
								View Account
							</GoToUserButton>
						)}
					</AttributeLabel>
					<AttributeValue>{artistsString}</AttributeValue>
				</AttributeContainer>
				<AttributeContainer>
					<AttributeLabel>Label</AttributeLabel>
					<AttributeValue>{musicLabelName}</AttributeValue>
				</AttributeContainer>
				<DividerLine />
				<TrackList
					gotoEditTrack={goToEditTrack}
					theme={theme}
					tracks={soundtracks}
				/>
				<DividerLine />
				<AttributeContainer style={{ marginTop: "24px" }}>
					<AttributeLabel>Primary Genre</AttributeLabel>
					<AttributeValue>{primaryGenre}</AttributeValue>
				</AttributeContainer>
				<AttributeContainer>
					<AttributeLabel>Secondary Genre</AttributeLabel>
					<AttributeValue>{secondaryGenre || "-"}</AttributeValue>
				</AttributeContainer>
				<DividerLine />
				<AttributeContainer style={{ marginTop: "24px" }}>
					<AttributeLabel>Digital Release Date</AttributeLabel>
					<AttributeValue>
						{digitalReleaseDate
							? new Date(digitalReleaseDate).toLocaleDateString("de-DE")
							: "-"}
					</AttributeValue>
				</AttributeContainer>
				<AttributeContainer>
					<AttributeLabel>Original Release Date</AttributeLabel>
					<AttributeValue>
						{originalReleaseDate
							? new Date(originalReleaseDate).toLocaleDateString("de-DE")
							: "-"}
					</AttributeValue>
				</AttributeContainer>
				<DividerLine />
				<AttributeContainer style={{ marginTop: "24px" }}>
					<StoresOptionsLine>
						<AttributeLabel>Stores</AttributeLabel>
						{storesEditable && (
							<>
								<StoresButton
									onClick={(e) => {
										e.preventDefault()
										setAllStores()
									}}
								>
									All Stores
								</StoresButton>
								<StoresButton
									style={{ marginLeft: "auto" }}
									onClick={(e) => {
										e.preventDefault()
										goToEditStores()
									}}
								>
									Edit
								</StoresButton>
							</>
						)}
					</StoresOptionsLine>

					<AttributeValue>{storesString}</AttributeValue>
				</AttributeContainer>
				{freeBeats && freeBeats.length > 0 && (
					<AttributeContainer style={{ marginTop: "24px" }}>
						<AttributeLabel>Free Beats</AttributeLabel>

						<AttributeValue wrapWord>
							{freeBeats.map((l) => {
								if (l.type === "LINK") {
									return (
										<div style={{ marginTop: "4px" }}>
											<a href={l.link || ""} target="_blank">
												{l.link || ""}
											</a>
										</div>
									)
								} else if (l.type === "FILE") {
									return (
										<div style={{ marginTop: "4px" }}>
											<a href={l.resolvedUrl || ""} download target="_blank">
												{l.name || ""}
											</a>
										</div>
									)
								}
							})}
						</AttributeValue>
					</AttributeContainer>
				)}
			</LeftColumn>
			<RightColumn>
				<ReleaseCoverContainer>
					{imageSource && (
						<Image priority={true} src={imageSource} layout="fill" />
					)}
				</ReleaseCoverContainer>
				<AttributeContainer style={{ marginTop: "24px" }}>
					<AttributeLabel>Language</AttributeLabel>
					<AttributeValue>{languageName}</AttributeValue>
				</AttributeContainer>
				<AttributeContainer>
					<AttributeLabel>Explicit Lyrics</AttributeLabel>
					<AttributeValue>{explicitLyrics ? "Yes" : "No"}</AttributeValue>
				</AttributeContainer>
				<DividerLine />
				<AttributeContainer style={{ marginTop: "24px" }}>
					<AttributeLabel>Copyright</AttributeLabel>
					<AttributeValue>
						{copyrightYear} {copyrightOwner}
					</AttributeValue>
				</AttributeContainer>
				<AttributeContainer>
					<AttributeLabel>Publishing Rights</AttributeLabel>
					<AttributeValue>
						{publishingRightsYear} {publishingRightsOwner}
					</AttributeValue>
				</AttributeContainer>
			</RightColumn>
		</ColumnContainer>
	)
}

export default ReleaseOverview
