import {
	ImageContainer,
	FirstColumnContainer,
	ListContainer,
	ListItemContainer,
	SecondColumnContainer,
	StatusLabel,
	ShowDetailsButton,
	ReleaseInfoContainer,
	ReleaseTitle,
	ReleaseDetails,
	ReleaseArtists,
} from "./ReleasesList_styles"
import Image from "next/image"
import Link from "next/link"
import Button from "../../button/button"
import { releaseStatusToString } from "../../../models/releases.models"
import { server } from "../../../config"
import { useRouter } from "next/router"
import { FC, Ref } from "react"
import { OverviewRelease } from "controller/releases/getReleases"

// interface ReleaseListEntry {
// 	id: string
// 	imageUrl?: string
// 	title: string
// 	artists: string
// 	genre: string
// 	status: string
// }

const ReleasesListItem = ({
	entry,
	onDeleteDraft,
	lastElementRef,
}: {
	entry: OverviewRelease
	onDeleteDraft: (release: OverviewRelease) => void
	lastElementRef: Ref<any> | null
}) => {
	let backgroundColor
	let fontColor
	const router = useRouter()
	switch (entry.status) {
		case "DRAFT":
			backgroundColor = "rgba(78, 78, 78, 0.2)"
			fontColor = "#898989"
			break
		case "PENDING":
			backgroundColor = "rgba(226, 226, 235, 0.1)"
			fontColor = "rgba(226, 226, 235, 0.8)"
			break
		case "APPROVED":
			backgroundColor = "rgba(31, 137, 55, 0.2)"
			fontColor = "#3E9C53"
			break
		case "ACTION_NEEDED":
		case "ACTION_NEEDED_DRAFT":
			backgroundColor = "rgba(191, 158, 73, 0.2)"
			fontColor = "#BF9E49"
			break
		case "REJECTED":
			backgroundColor = "rgba(191, 73, 73, 0.2)"
			fontColor = "#BF4949"
			break
	}

	return (
		<ListItemContainer ref={lastElementRef}>
			<FirstColumnContainer>
				<ImageContainer>
					{entry.coverUrl && <Image src={entry.coverUrl} layout="fill" />}
				</ImageContainer>
				<ReleaseInfoContainer>
					<ReleaseTitle>{entry.title}</ReleaseTitle>
					<ReleaseDetails>
						by&nbsp;
						<ReleaseArtists>{entry.primaryArtistName}</ReleaseArtists>&nbsp;
						{/* {entry.genre && <>&#8226;</>}&nbsp;
						{entry.genre || ""} */}
					</ReleaseDetails>
				</ReleaseInfoContainer>
			</FirstColumnContainer>
			<SecondColumnContainer>
				<StatusLabel theme={{ backgroundColor, fontColor }}>
					{releaseStatusToString(entry.status) || "Invalid Status"}
				</StatusLabel>
				{/* <ShowDetailsButton>Show Details</ShowDetailsButton> */}
				{entry.status === "DRAFT" && !entry.isProcessing && (
					<Button
						onClick={onDeleteDraft}
						theme={{
							color: "rgba(255, 255, 255, 0.64)",
							backgroundColor: "rgba(255, 255, 255, 0.05)",
						}}
					>
						Delete Draft
					</Button>
				)}
				<Link
					href={
						entry.status === "DRAFT"
							? `/app/releases/create?draft=${entry.id}`
							: "/app/releases/" + entry.id
					}
				>
					<div>
						{!entry.isProcessing && (
							<Button
								theme={{
									color: "rgba(255, 255, 255, 0.64)",
									backgroundColor: "rgba(255, 255, 255, 0.05)",
								}}
							>
								{entry.status === "DRAFT" ? "Edit Draft" : "Show Release"}
							</Button>
						)}
					</div>
				</Link>
			</SecondColumnContainer>
		</ListItemContainer>
	)
}

const ReleasesList: FC<{
	releases: OverviewRelease[]
	onDeleteDraft: (release: OverviewRelease) => void
	lastElementRef: Ref<any>
}> = function ({ releases, onDeleteDraft, lastElementRef }) {
	return (
		<ListContainer>
			{releases.map((release, index) => (
				<ReleasesListItem
					lastElementRef={index === releases.length - 1 ? lastElementRef : null}
					onDeleteDraft={() => onDeleteDraft(release)}
					key={release.id}
					entry={release}
				/>
			))}
		</ListContainer>
	)
}

export default ReleasesList
