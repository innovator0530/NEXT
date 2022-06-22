import {
	getReleasesOverview,
	OverviewRelease,
} from "controller/releases/getReleases"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { ThemeProvider } from "styled-components"
import DialogModal from "../../../components/admin/DialogModal/DialogModal"
import AppHeader from "../../../components/frontend/Header/AppHeader"
import ReleasesList from "../../../components/frontend/ReleasesList/ReleasesList"
import TagFilter from "../../../components/frontend/TagFilter/TagFilter"
import { server } from "../../../config"
import { usePagination } from "../../../hooks/usePagination"
import { withAuthSession } from "../../../middleware/nextAuthSession"
import { ReleaseStatus } from "../../../models/database/release/IRelease"
import {
	Background,
	BigTitle,
	Container,
	darkTheme,
} from "../../../styles/frontend"
import { getReleaseCounts } from "../../api/releases"
const LIST_PAGE_SIZE = 5

export const RELEASE_LIST_TAGS = [
	{
		code: "ALL",
		name: "All",
	},
	{
		code: "APPROVED",
		name: "Approved",
	},
	{
		code: "ACTION_NEEDED",
		name: "Action Needed",
		additionalTags: ["ACTION_NEEDED_DRAFT"],
	},
	{
		code: "PENDING",
		name: "Pending",
	},
	{
		code: "DRAFT",
		name: "Drafts",
	},
]

type ReleaseTag = ReleaseStatus | "ALL"

const releases: React.FC<{
	releases: OverviewRelease[]
	isContextUser: boolean
	releasesCount: Map<ReleaseTag, Number>
}> = function (props) {
	console.log("releases", props.releases)
	const [allReleases, setAllReleases] = useState<OverviewRelease[]>(
		props.releases
	)
	const [releases, setReleases] = useState<OverviewRelease[]>(props.releases)
	const [draftToBeDeleted, setDraftToBeDeleted] =
		useState<OverviewRelease | null>(null)
	const [deleteDraftModalOpen, setDeleteDraftModalOpen] = useState(false)
	const tags = RELEASE_LIST_TAGS.map((t: any) => ({
		...t,
		amount: props.releasesCount[t.code],
	}))

	const [selectedTag, setSelectedTag] = useState<number>(0)

	useEffect(() => {
		if (tags[selectedTag].code === "ALL") {
			setReleases([...allReleases])
		} else {
			const tag = tags[selectedTag]
			setReleases([
				...allReleases.filter(
					(r) =>
						r.status === tag.code ||
						(tag.additionalTags && tag.additionalTags.includes(r.status))
				),
			])
		}
	}, [selectedTag])
	const router = useRouter()

	const deleteDraft = (draft: OverviewRelease) => {
		setDraftToBeDeleted(draft)
		setDeleteDraftModalOpen(true)
	}
	const finishDeleteDraft = async () => {
		const fr = await fetch(
			`${server}/api/releases/${draftToBeDeleted.id}/draft`,
			{ method: "delete" }
		)
		console.log(fr.status)
		if (fr.status === 200) {
			router.push("/app/dashboard")
		}
	}

	// Pagination
	const [isLoading, setIsLoading] = useState(false)
	const [hasMore, setHasMore] = useState(true)

	const fetchReleases = async () => {
		if (!hasMore) return
		const tagIndex = selectedTag
		let url
		if (tagIndex > 0) {
			if (releases.length <= 0) {
				setHasMore(false)
				return
			}
			let tagsStr = tags[tagIndex].code
			const tag = tags[tagIndex]
			if (tag.additionalTags) {
				tagsStr += "," + tag.additionalTags.join(",")
			}
			url = `${server}/api/releases?limit=${LIST_PAGE_SIZE}&exclusive_start_last_action_time=${
				releases[releases.length - 1].lastActionTime
			}&allowadmincontext=true&release_status=${tagsStr}`
		} else {
			if (allReleases.length <= 0) {
				setHasMore(false)
				return
			}
			url = `${server}/api/releases?limit=${LIST_PAGE_SIZE}&exclusive_start_last_action_time=${
				allReleases[allReleases.length - 1].lastActionTime
			}&allowadmincontext=true`
		}

		const res = await fetch(url)
		const result = await res.json()

		if (result.length < 1) {
			setHasMore(false)
			return
		}

		if (tagIndex > 0) {
			setReleases((releases) => [...releases, ...result])
		} else {
			setAllReleases((allReleases) => [...allReleases, ...result])
			setReleases((releases) => [...releases, ...result])
		}
	}

	const { lastElementRef } = usePagination(
		() => fetchReleases(),
		isLoading,
		hasMore
	)

	useEffect(() => {
		fetchReleases()
		setHasMore(true)
	}, [selectedTag])

	return (
		<ThemeProvider theme={darkTheme}>
			<Background>
				<AppHeader
					userContext={props.isContextUser}
					theme={darkTheme}
					label={props.isContextUser ? "User Access Mode" : "free"}
				/>
				<Container>
					<BigTitle>My Releases</BigTitle>
					<TagFilter
						fields={tags}
						selectedTag={selectedTag}
						onSelectTag={(n) => setSelectedTag(n)}
					/>
					<ReleasesList
						lastElementRef={lastElementRef}
						onDeleteDraft={deleteDraft}
						releases={releases}
					/>
				</Container>
			</Background>

			{deleteDraftModalOpen && (
				<DialogModal
					title="Delete this draft?"
					open={deleteDraftModalOpen}
					onCancel={() => setDeleteDraftModalOpen(false)}
					onConfirm={() => finishDeleteDraft()}
					email={""}
				/>
			)}
		</ThemeProvider>
	)
}

export const getServerSideProps = withAuthSession(async function (
	{ req, res },
	session
) {
	// Fetch Releases
	// const [releases, counts] = await Promise.all([
	// 	getReleases(
	// 		session.user.id,
	// 		LIST_PAGE_SIZE,
	// 		"title,artists,genres,coverUrl,status,_id,lastActionTime"
	// 	),
	//
	// ])
	// const releasesSerializable = releases.map((r) => ({
	// 	...r.toObject(),
	// 	_id: r._id.toString(),
	// 	lastActionTime: r.lastActionTime.toISOString(),
	// }))
	const releaseCounts = await getReleaseCounts(session.user.id).catch(
		console.log
	)
	return {
		props: {
			releasesCount: releaseCounts,
			releases: await getReleasesOverview(session.user.id, "small_thumb", 100),
			isContextUser: !!session.user.isContextUser,
		},
	}
},
true)

export default releases
