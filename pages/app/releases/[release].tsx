import { useRouter } from "next/router"
import {
	Background,
	BigTitle,
	Container,
	darkTheme,
	ModerationComment,
	ModerationCommentTitle,
	RewaveIdField,
} from "../../../styles/frontend"
import {
	ComplexTitle,
	ComplexTitleBackButton,
	ComplexTitleStatusLabel,
} from "../../../styles/releases"
import AppHeader from "../../../components/frontend/Header/AppHeader"
import { FC, useState } from "react"
import { Release, releaseStatusToString } from "../../../models/releases.models"
import ReleaseOverview from "../../../components/frontend/ReleaseOverview/ReleaseOverview"
import { ThemeProvider } from "styled-components"
import { server } from "../../../config"
import Button from "../../../components/button/button"
import Link from "next/link"
import { GlobalAppConfig } from "../../../models/database/config"
import { withAuthSession } from "@middleware/nextAuthSession"
import {
	getReleaseForOverview,
	ReleaseOverviewAPI,
} from "controller/releases/getRelease"
import { getLiveLinksForRelease } from "@controller/releases/getLiveLinks"
import { getFugaStatusForRelease } from "@controller/releases/getStatus"

const ReleaseDetails: FC<{
	release: ReleaseOverviewAPI
	isUserContext: boolean
	liveLinks?: { platform: string; link: string }[]
	fugaStatus: string
}> = function ({ release, isUserContext, liveLinks, fugaStatus }) {
	// console.log(props);

	const router = useRouter()
	const q = router.query
	const releaseid = q.release

	let commentBgColor = "rgba(191, 158, 73, 0.15)"
	let commentHeadingColor = "rgba(191, 158, 73, 0.8)"
	let commentColor = "rgba(191, 158, 73, 0.5)"
	if (release.status === "REJECTED") {
		commentBgColor = "rgba(191, 73, 73, 0.2)"
		commentHeadingColor = "#BF4949"
		commentColor = "rgba(191, 73, 73, 0.774)"
	}
	console.log("release", release)
	return (
		<ThemeProvider theme={darkTheme}>
			<Background>
				<AppHeader
					userContext={isUserContext}
					theme={darkTheme}
					label={isUserContext ? "User Access Mode" : "free"}
				/>
				<Container>
					<ComplexTitle>
						<ComplexTitleBackButton href="/app/releases">
							{"< BACK"}
						</ComplexTitleBackButton>
						<BigTitle>My Releases</BigTitle>
						<ComplexTitleStatusLabel status={release.status}>
							{"/ " + releaseStatusToString(release.status)}
							{release.status === "APPROVED" && (
								<>
									{" / "}
									{fugaStatus}
								</>
							)}
						</ComplexTitleStatusLabel>
					</ComplexTitle>
					{(release.status === "ACTION_NEEDED" ||
						release.status === "REJECTED" ||
						release.status === "ACTION_NEEDED_DRAFT") &&
						release.moderationComment &&
						release.moderationComment.length > 0 && (
							<ModerationComment
								fontColor={commentColor}
								backgroundColor={commentBgColor}
							>
								<ModerationCommentTitle fontColor={commentHeadingColor}>
									Moderation Comment
								</ModerationCommentTitle>
								{release.moderationComment}
							</ModerationComment>
						)}
					{(release.status === "ACTION_NEEDED" ||
						release.status === "ACTION_NEEDED_DRAFT") && (
						<Link href={`/app/releases/create?draft=${release.id}`}>
							<Button
								style={{ marginTop: "12px", width: "100%" }}
								theme={{
									backgroundColor: "#0000",
									border: "1px solid #fff",
									color: "#fff",
								}}
								disabled={release.isProcessing}
							>
								{release.isProcessing
									? "Release is processing..."
									: "Edit Release"}
							</Button>
						</Link>
					)}
					{release.rewaveId && (
						<RewaveIdField>Release-ID: {release.rewaveId}</RewaveIdField>
					)}
					{release.upc && release.upc !== "auto" && (
						<RewaveIdField>UPC: {release.upc}</RewaveIdField>
					)}
					{liveLinks && liveLinks.length > 0 && (
						<>
							<div>
								<RewaveIdField style={{ color: "#777" }}>
									Live Links:
								</RewaveIdField>
								{liveLinks.map((l) => (
									<RewaveIdField style={{ color: "#777" }} key={l.platform}>
										{l.platform}:{" "}
										<a target="_blank" href={l.link}>
											{l.link}
										</a>
									</RewaveIdField>
								))}
							</div>
						</>
					)}
					<ReleaseOverview
						storesEditable={false}
						storesString={"STORES"}
						showUserButton={false}
						imageSource={release.coverUrl}
						releaseTitle={release.title}
						musicLabelName={release.musicLabelName}
						artistsString={release.artistsString}
						primaryGenre={release.primaryGenre}
						secondaryGenre={release.secondaryGenre}
						digitalReleaseDate={new Date(release.digitalReleaseDate)}
						originalReleaseDate={new Date(release.originalReleaseDate)}
						languageName={release.languageName}
						explicitLyrics={release.explicitLyrics}
						copyrightYear={release.copyrightYear}
						copyrightOwner={release.copyrightOwner}
						publishingRightsYear={release.publishingRightsYear}
						publishingRightsOwner={release.publishingRightsOwner}
						soundtracks={release.soundtracks.map((s) => ({
							name: s.title,
							fileUrl: s.soundtrackUrl,
							isrc: s.isrc,
						}))}
						theme={darkTheme}
					/>
				</Container>
			</Background>
		</ThemeProvider>
	)
}

export const getServerSideProps = withAuthSession(
	async ({ req, res, query }, session) => {
		console.log("query", query)
		const releaseData = (
			await getReleaseForOverview(query.release as string, session.user.id)
		)?.release
		if (!releaseData) {
			return {
				redirect: {
					permanent: false,
					destination: "/app/releases",
				},
			}
		} else {
			let liveLinks = []
			try {
				liveLinks = await getLiveLinksForRelease(query.release as string)
			} catch (e) {}
			let fugaStatus = ""
			try {
				fugaStatus = (await getFugaStatusForRelease(query.release as string))
					.status
			} catch (e) {}
			return {
				props: {
					fugaStatus,
					release: releaseData,
					isUserContext: !!session.user.isContextUser,
					liveLinks,
				},
			}
		}
	},
	true
)

export default ReleaseDetails
