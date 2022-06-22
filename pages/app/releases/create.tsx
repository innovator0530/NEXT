import {
	Background,
	BigTitle,
	Container,
	CreateReleaseStageIndicator,
	CreateReleaseTitle,
	CreateReleaseTitleComment,
	darkTheme,
} from "../../../styles/frontend"
import { ThemeProvider } from "styled-components"
import AppHeader from "../../../components/frontend/Header/AppHeader"
import {
	CreateReleaseContext,
	CreateReleaseProvider,
} from "../../../context/CreateReleaseState/CreateReleaseState"
import { FC, useContext } from "react"
import CreateReleasePage1 from "../../../components/create-release/CreateReleasePage1"
import CreateReleasePage2 from "../../../components/create-release/CreateReleasePage2"
import CreateReleasePage3 from "../../../components/create-release/CreateReleasePage3"
import EditTrack from "../../../components/create-release/EditTrack"
import { withAuthSession } from "../../../middleware/nextAuthSession"
import EditArtist from "../../../components/create-release/EditArtist"
import { getLabels } from "../../api/releases/labels"
import EditLabel from "../../../components/create-release/EditLabel"
import CreateReleasePage4 from "../../../components/create-release/CreateReleasePage4"
import { ArtistState } from "../../../context/CreateReleaseState/models/ArtistState.model"
import { LabelState } from "../../../context/CreateReleaseState/models/LabelState.model"
import EditStores from "../../../components/create-release/EditStores"
import {
	getArtistIdsInRelease,
	getArtists,
} from "controller/release-delivery/artists"
import { useWarnIfUnsavedChanges } from "hooks/useWarnIfUnsavedChanges"
import { GetReleaseDraft } from "@models/api/ReleaseDraft.model"
import { getReleaseDraft } from "@controller/release-draft/getReleaseDraft"

const ENABLE_UNSAVED_CHANGES_WARNING = true

const Pages = () => {
	const { page, pageBeforeEdit, unsavedChanges } =
		useContext(CreateReleaseContext)
	let stage = 1
	switch (page) {
		case "EDIT_LABEL":
		case "EDIT_ARTIST":
			if (pageBeforeEdit === "EDIT_TRACK") {
				stage = 3
			} else {
				stage = 1
			}
			break
		case "PAGE_2":
			stage = 2
			break
		case "PAGE_3":
			stage = 3
			break
		case "PAGE_4":
			stage = 4
			break
	}
	if (ENABLE_UNSAVED_CHANGES_WARNING) {
		useWarnIfUnsavedChanges(
			unsavedChanges,
			'There are unsaved changes to your release. You may click "Save as Draft"  or submit  your release. Leave anyway?'
		)
		console.log("unsavedChanges", unsavedChanges)
	}
	return (
		<Container>
			<CreateReleaseTitle>
				<BigTitle>Create Release</BigTitle>
				<CreateReleaseStageIndicator>{stage}/4</CreateReleaseStageIndicator>
			</CreateReleaseTitle>
			<CreateReleaseTitleComment>
				*Make sure your release follows the{" "}
				<a
					className="link"
					target="_blank"
					href="https://support.rewave.ch/hc/en-us/articles/360012502320-Content-Style-Guide-MUST-READ--Impressum"
				>
					Content Style Guide (Link)
				</a>
			</CreateReleaseTitleComment>
			{(() => {
				switch (page) {
					case "PAGE_1":
						return <CreateReleasePage1 />
					case "PAGE_2":
						return <CreateReleasePage2 />
					case "PAGE_3":
						return <CreateReleasePage3 />
					case "PAGE_4":
						return <CreateReleasePage4 />
					case "EDIT_TRACK":
						return <EditTrack />
					case "EDIT_ARTIST":
						return <EditArtist />
					case "EDIT_LABEL":
						return <EditLabel />
					case "EDIT_STORES":
						return <EditStores />
					default:
						return <div>Error!</div>
				}
			})()}
		</Container>
	)
}

const CreateRelease: FC<{
	artists: ArtistState[]
	labels: LabelState[]
	importReleaseEmail?: string
	existingDraft?: GetReleaseDraft
}> = function (props) {
	return (
		<CreateReleaseProvider
			importReleaseEmail={props.importReleaseEmail}
			labels={props.labels}
			artists={props.artists}
			existingDraft={props.existingDraft}
		>
			<ThemeProvider theme={darkTheme}>
				<Background>
					<AppHeader userContext={false} theme={darkTheme} label="test" />
					{/* userContext={userContext} theme={darkTheme} label={userContext ? 'User Access Mode' : 'free'} appConfig={appConfig} */}
					<Pages />
				</Background>
			</ThemeProvider>
		</CreateReleaseProvider>
	)
}

export const getServerSideProps = withAuthSession(
	async ({ req, res, query }, session) => {
		let draft: GetReleaseDraft = null
		let releaseUserId
		let artistIds: string[] = []
		let labelIds: string[] = []
		if (typeof query.draft === "string") {
			const result = await getReleaseDraft(
				session.user.id,
				query.draft,
				session.user.type === "ADMIN"
			)
			if (result.successful === true) {
				draft = result.release
				releaseUserId = result.releaseUserId
				artistIds = getArtistIdsInRelease(draft)
				labelIds = [draft.musicLabelId]
			}
		}

		let artists: ArtistState[] = []
		try {
			const artistsResult = await getArtists(session.user.id, artistIds)
			artists = artistsResult
		} catch (e) {
			console.log(e)
		}

		let labels: LabelState[] = []
		try {
			labels = await getLabels(session.user.id, labelIds)
		} catch (e) {
			console.log(`e`, e)
		}

		if (
			draft &&
			session.user.type === "ADMIN" // &&
			// session.user.id !== releaseUserId
		) {
			try {
				const artistsResult = await getArtists(releaseUserId, artistIds)
				artists = artistsResult
			} catch (e) {
				console.log(e)
			}

			try {
				labels = await getLabels(releaseUserId, labelIds)
			} catch (e) {
				console.log(`e`, e)
			}
		}

		return {
			props: {
				artists,
				labels,
				importReleaseEmail: query?.importReleaseEmail || "",
				existingDraft: draft,
			},
		}
	}
)

export default CreateRelease
