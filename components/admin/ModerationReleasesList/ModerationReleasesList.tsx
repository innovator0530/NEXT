import Image from "next/image"
import { useRouter } from "next/router"
import {
	ListContainer,
	ListItemContainer,
	ReleaseInfoContainer,
	ReleaseDetailsContainer,
	ReleaseCoverContainer,
	ReleaseTitle,
	ReleaseSubtitle,
	ReleaseSubmittedContainer,
	ResubmittedSuperscript,
	TrackCountContainer,
	ReleaseOptionsContainer,
	ModerateButton,
	StoresSubtitle,
} from "./ModerationReleasesList_styles"
import { stores as storeOptions } from "../../../models/options/stores"
import { FC, Ref } from "react"
import { APIModerationReleasesOverview } from "controller/moderation/getReleases"

const ModerationReleasesListItem: FC<{
	release: APIModerationReleasesOverview
	buttonAction: () => void
	checkOff: () => void
	buttonText: string
	lastElementRef?: Ref<any> | null
}> = ({ release, buttonAction, checkOff, buttonText, lastElementRef }) => {
	const router = useRouter()
	let releaseSubitle = "By "
	const artists = release.artistsString || "-"
	releaseSubitle += artists + " · " + (release.primaryGenre || "-")
	const gotoRelease = buttonAction

	// const stores = release.stores||[];
	// let storesDisplayed = "-";
	// if(stores.length > 0 && stores.length < (storeOptions.length-5)){
	//     storesDisplayed = "Stores: " +stores.join(', ');
	// }
	// else if(stores.length >= (storeOptions.length-5)){
	//     storesDisplayed = "All Stores";
	//     if(stores.length < storeOptions.length){
	//         const missingStores = storeOptions.filter(s=>!stores.includes(s));
	//         storesDisplayed +=", except "+missingStores.join(', ');
	//     }
	// }
	return (
		<ListItemContainer
			ref={lastElementRef}
			gridTemplateColumns={
				release.status === "APPROVED" &&
				!release.approvalCheckedOff &&
				"40% 20% 10% 30%"
			}
		>
			<ReleaseInfoContainer>
				<ReleaseCoverContainer>
					{release.coverUrl && <Image src={release.coverUrl} layout="fill" />}
				</ReleaseCoverContainer>
				<ReleaseDetailsContainer>
					<ReleaseTitle>{release.title}</ReleaseTitle>
					<ReleaseSubtitle>{releaseSubitle}</ReleaseSubtitle>
					{/* {release.status==='APPROVED'&&<StoresSubtitle storesStr={storesDisplayed}/>} */}
				</ReleaseDetailsContainer>
			</ReleaseInfoContainer>
			<ReleaseSubmittedContainer>
				{new Date(release.dateSubmitted).toLocaleDateString("de-de")}
				{release.timesSubmitted > 1 && (
					<ResubmittedSuperscript>RESUBMITTED</ResubmittedSuperscript>
				)}
			</ReleaseSubmittedContainer>
			<TrackCountContainer>{release.trackCount}</TrackCountContainer>

			<ReleaseOptionsContainer>
				<ModerateButton onClick={gotoRelease}>
					{buttonText || "Moderate"}
				</ModerateButton>
				{release.status === "APPROVED" && !release.approvalCheckedOff && (
					<ModerateButton onClick={checkOff}>Check&nbsp;Off</ModerateButton>
				)}
				{/* <ModerateButton light>
                    {"· · ·"}
                </ModerateButton> */}
			</ReleaseOptionsContainer>
		</ListItemContainer>
	)
}

const ModerationReleasesList: FC<{
	releases: APIModerationReleasesOverview[]
	checkOff: (release: APIModerationReleasesOverview) => Promise<void>
	buttonAction: (release: APIModerationReleasesOverview) => Promise<void>
	buttonText: string
	style?: any
	lastElementRef?: Ref<any>
}> = function ({
	releases,
	checkOff,
	buttonAction,
	buttonText,
	style,
	lastElementRef,
}) {
	return (
		<ListContainer style={style}>
			{releases.map((release, index) => (
				<ModerationReleasesListItem
					checkOff={() => checkOff(release)}
					buttonAction={() => buttonAction(release)}
					buttonText={buttonText}
					key={release.id || release.id}
					release={release}
					lastElementRef={index === releases.length - 1 ? lastElementRef : null}
				/>
			))}
		</ListContainer>
	)
}

export default ModerationReleasesList
