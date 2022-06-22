import {
	APIModerationRelease,
	moderationGetRelease,
} from "controller/moderation/getRelease"
import { withAuthSession } from "@middleware/nextAuthSession"
import Link from "next/link"
import { useRouter } from "next/router"
import { FC, useState } from "react"
import { ThemeProvider } from "styled-components"
import {
	ComplexTitle,
	ComplexTitleBackButton,
	ComplexTitleStatusLabel,
} from "styles/releases"
import AppHeader from "../../../../../components/frontend/Header/AppHeader"
import ReleaseOverview from "../../../../../components/frontend/ReleaseOverview/ReleaseOverview"
import { releaseStatusToString } from "../../../../../models/releases.models"
import { Button } from "../../../../../styles/admin"
import {
	Background,
	BigTitle,
	Container,
	lightTheme,
	ModerationComment,
	ModerationCommentTitle,
	RewaveIdField,
} from "../../../../../styles/frontend"
import { server } from "config"
import { getLiveLinksForRelease } from "@controller/releases/getLiveLinks"
import { getValidationErrorsForRelease } from "@controller/releases/getValidationErrors"
import CommentModal from "components/admin/AdminModal/CommentModal/CommentModal"
import { getStoresString } from "components/create-release/CreateReleasePage4"

const ModerateRelease: FC<{
	release: APIModerationRelease
	isUserContext: boolean
	liveLinks?: { platform: string; link: string }[]
	validationErrors: string
}> = function ({ release, isUserContext, liveLinks, validationErrors }) {
	// console.log(props);

	console.log("release", release)

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

	const goToUserAccount = () => {
		window.open(`/admin/users/database?user=${release.userId}`)
	}

	const goToEditRelease = () => {
		router.push(`/app/releases/create?draft=${release.id}`)
	}

	console.log("validationErrors", validationErrors)

	const approveRelease = async (e) => {
		e.preventDefault()
		const result = await fetch(`${server}/api/releases/${releaseid}/approve`, {
			method: "PUT",
		})
		console.log("result", result)
		let json
		try {
			json = await result.json()
		} catch (e) {}
		if (json.message) {
			alert(json.message)
		}
		console.log("json", json)
	}

	const [actionAfterModal, setActionAfterModal] = useState<
		"reject" | "action_needed" | null
	>()
	const [commentModalVisible, setCommentModalVisible] = useState(false)

	const releaseSetActionNeeded = async (e) => {
		e.preventDefault()
		setActionAfterModal("action_needed")
		setCommentModalVisible(true)
	}

	const rejectRelease = async (e) => {
		e.preventDefault()
		setActionAfterModal("reject")
		setCommentModalVisible(true)
	}

	const commentModalSubmit = async (message: string) => {
		try {
			const result = await fetch(
				`${server}/api/releases/${releaseid}/${actionAfterModal}?moderation_comment=${encodeURIComponent(
					message || ""
				)}`,
				{ method: "PUT" }
			)
			console.log("result", result)
			let json
			try {
				json = await result.json()
			} catch (e) {}
			if (json.message) {
				alert(json.message)
			}
			setCommentModalVisible(false)
			console.log("json", json)
			if (result.status === 200) {
				// router.replace('/admin/moderation/releases')
			}
		} catch (E) {
			console.log("E", E)
		}
	}

	return (
		<ThemeProvider theme={lightTheme}>
			<Background>
				<AppHeader
					userContext={isUserContext}
					theme={lightTheme}
					label={isUserContext ? "User Access Mode" : "free"}
				/>
				<Container>
					<ComplexTitle>
						<ComplexTitleBackButton
							style={{ color: "#777" }}
							href="/admin/moderation/releases"
						>
							{"< BACK"}
						</ComplexTitleBackButton>
						<BigTitle style={{ color: "#ddd" }}>Release</BigTitle>
						<ComplexTitleStatusLabel status={release.status}>
							{"/ " + releaseStatusToString(release.status)}
						</ComplexTitleStatusLabel>
					</ComplexTitle>

					{/* Show Moderation Comment always, if available */}
					{release.moderationComment && release.moderationComment.length > 0 && (
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
						release.status === "REJECTED") && (
						<Link href={`/app/releases/create?draft=${release.id}`}>
							<Button
								style={{ marginTop: "12px", width: "100%" }}
								theme={{
									backgroundColor: "#0000",
									border: "1px solid #fff",
									color: "#fff",
								}}
							>
								Edit Release
							</Button>
						</Link>
					)}
					<RewaveIdField
						fontSiz="14px"
						style={{ color: "#f77", marginBottom: "3px" }}
					>
						{(validationErrors || "").split("\n").map((s) => <div>{s}</div>) ||
							"Error with fetching validation errors"}
					</RewaveIdField>
					{release.rewaveId && (
						<RewaveIdField style={{ color: "#777" }}>
							Release-ID: {release.rewaveId}
						</RewaveIdField>
					)}
					{release.upc && release.upc !== "auto" && (
						<RewaveIdField style={{ color: "#777" }}>
							UPC: {release.upc}
						</RewaveIdField>
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

					<Button
						onClick={goToEditRelease}
						theme={{
							borderColor: "rgba(0, 0, 0, 0.2)",
							backgroundColor: "#fff",
							backgroundColorHover: "#00000011",
							fontColor: "#212121",
						}}
						style={{ marginTop: "20px" }}
					>
						View / Edit Release
					</Button>
					<Button
						onClick={goToUserAccount}
						theme={{
							borderColor: "rgba(0, 0, 0, 0.2)",
							backgroundColor: "#fff",
							backgroundColorHover: "#00000011",
							fontColor: "#212121",
						}}
						style={{ marginTop: "20px", marginLeft: "10px" }}
					>
						View Artist Account
					</Button>
					{release.status === "PENDING" && (
						<>
							<Button
								onClick={approveRelease}
								theme={{
									borderColor: "rgba(0, 0, 0, 0.2)",
									backgroundColor: "#fff",
									backgroundColorHover: "#00000011",
									fontColor: "#212121",
								}}
								style={{ marginTop: "20px", marginLeft: "10px" }}
							>
								Approve
							</Button>
							<Button
								onClick={releaseSetActionNeeded}
								theme={{
									borderColor: "rgba(0, 0, 0, 0.2)",
									backgroundColor: "#fff",
									backgroundColorHover: "#00000011",
									fontColor: "#212121",
								}}
								style={{ marginTop: "20px", marginLeft: "10px" }}
							>
								Action Needed
							</Button>
							<Button
								onClick={rejectRelease}
								theme={{
									borderColor: "rgba(0, 0, 0, 0.2)",
									backgroundColor: "#fff",
									backgroundColorHover: "#00000011",
									fontColor: "#212121",
								}}
								style={{ marginTop: "20px", marginLeft: "10px" }}
							>
								Reject
							</Button>
						</>
					)}
					<ReleaseOverview
						storesEditable={false}
						storesString={getStoresString(release.stores.map((s) => s.id))}
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
						theme={lightTheme}
						freeBeats={release.freeBeats}
					/>
				</Container>
				<CommentModal
					visible={commentModalVisible}
					save={commentModalSubmit}
					title="Edit Moderation Comment"
					onCancel={() => setCommentModalVisible(false)}
				/>
			</Background>
		</ThemeProvider>
	)
}

export const getServerSideProps = withAuthSession(
	async ({ req, res, query }, session) => {
		const releaseData: APIModerationRelease = (
			await moderationGetRelease(query.release as string)
		).release
		let liveLinks
		try {
			liveLinks = await getLiveLinksForRelease(query.release as string)
		} catch (e) {}
		let validationErrors = "Error with fetching validation errors"
		try {
			const data = await getValidationErrorsForRelease(query.release as string)
			validationErrors = data.validationErrors
		} catch (e) {
			console.log("e", e)
		}
		if (!releaseData) {
			return {
				redirect: {
					permanent: false,
					destination: "/app/releases",
				},
			}
		} else {
			return {
				props: {
					release: releaseData,
					validationErrors,
					liveLinks,
				},
			}
		}
	}
)

export default ModerateRelease
