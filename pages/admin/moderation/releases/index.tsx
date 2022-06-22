import { useRouter } from "next/router"
import {
	Background,
	BigTitle,
	Container,
	lightTheme,
} from "../../../../styles/frontend"
import AppHeader from "../../../../components/frontend/Header/AppHeader"
import { FC, useState } from "react"
import { Release } from "../../../../models/releases.models"
import ReleaseOverview from "../../../../components/frontend/ReleaseOverview/ReleaseOverview"
import { ThemeProvider } from "styled-components"
import { Title } from "../../../../styles/admin"
import ReleasesFilter from "../../../../components/admin/FilterButtons/FilterButtons"
import { SessionUser } from "../../../../models/user.models"
import { server } from "../../../../config"
import ModerationReleasesList from "../../../../components/admin/ModerationReleasesList/ModerationReleasesList"
import { withAuthSession } from "@middleware/nextAuthSession"
import {
	APIModerationReleasesOverview,
	moderationGetReleases,
} from "controller/moderation/getReleases"
import { usePagination } from "hooks/usePagination"

const ModerationReleases: FC<{
	releases: APIModerationReleasesOverview[]
}> = function (props) {
	const router = useRouter()
	const releasesProps: APIModerationReleasesOverview[] = props.releases

	const [releaseTypeDisplayed, setReleaseTypeDisplayed] =
		useState<string>("PENDING")
	const [releases, setReleases] = useState<APIModerationReleasesOverview[]>(
		releasesProps.filter((r) => r.status === releaseTypeDisplayed)
	)

	const setReleaseType = (type: string) => {
		setReleaseTypeDisplayed(type)
		setReleases([])
		setHasMore(true)
		refetch(true, type)
	}

	const listItemButtonAction = async (
		release: APIModerationReleasesOverview
	) => {
		if (releaseTypeDisplayed === "APPROVAL_CHECKED_OFF") {
			checkOffRelease(release, false)
		} else {
			router.push("/admin/moderation/releases/" + release.id)
		}
	}

	const checkOffRelease = async (
		release: APIModerationReleasesOverview,
		targetCheckedOff: boolean
	) => {
		console.log("checking off release", release)
		if (release.status !== "APPROVED") {
			console.error("Trying to Check of a release that is not approved")
			return
		}
		const fr = await fetch(
			`${server}/api/moderation/releases/${
				release.id
			}/check-off?target_checked_off=${targetCheckedOff ? "true" : "false"}`,
			{ method: "PUT" }
		)
		if (fr.status !== 200) {
			const result = await fr.json()
			console.error(result)
		} else {
			release.approvalCheckedOff = true
			setReleaseType(releaseTypeDisplayed)
		}
	}

	// Pagination
	const [isLoading, setIsLoading] = useState(false)
	const [hasMore, setHasMore] = useState(true)
	const refetch = async (clear?: boolean, type?: string) => {
		console.log("REFETCH")
		if (isLoading || (!clear && !hasMore)) return
		setIsLoading(true)
		let releaseType = type || releaseTypeDisplayed
		let url = `${server}/api/moderation/releases?status=${releaseType}`
		if (releases.length > 0 && !clear) {
			url += `&exclusive_start_time=${encodeURIComponent(
				releases[releases.length - 1].lastActionTime
			)}`
		}
		const result = await fetch(url)
		const json = await result.json()
		if (json.releases) {
			setReleases((releases) => [...releases, ...json.releases])
		}
		console.log(`json`, json)
		if (json.releases.length === 0) {
			setHasMore(false)
		}
		setIsLoading(false)
	}
	const { lastElementRef } = usePagination(refetch, isLoading, hasMore)

	return (
		<ThemeProvider theme={lightTheme}>
			<Background>
				<AppHeader theme={lightTheme} label="admin" />
				<Container width={990}>
					<Title>Moderation</Title>
					<ReleasesFilter
						options={[
							{ code: "PENDING", name: "Pending" },
							{ code: "ACTION_NEEDED", name: "Action Needed" },
							{ code: "APPROVED", name: "Approved" },
							{ code: "REJECTED", name: "Rejected" },
							{ code: "APPROVAL_CHECKED_OFF", name: "Checked Off" },
						]}
						type={releaseTypeDisplayed}
						setType={setReleaseType}
					/>
					<ModerationReleasesList
						buttonAction={listItemButtonAction}
						buttonText={
							releaseTypeDisplayed == "APPROVAL_CHECKED_OFF"
								? "Undo Check-Off"
								: "Moderate"
						}
						checkOff={(release) => checkOffRelease(release, true)}
						style={{ marginTop: "32px" }}
						releases={releases}
						lastElementRef={lastElementRef}
					/>
				</Container>
			</Background>
		</ThemeProvider>
	)
}

export const getServerSideProps = withAuthSession(
	async ({ req, query }, session) => {
		const releases = await moderationGetReleases("PENDING", 20)
		return {
			props: {
				releases,
			},
		}
	}
)

export default ModerationReleases
