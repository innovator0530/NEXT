import { getUsersByStatus } from "@controller/user-database/getUsersWithStatus"
import { withAuthSession } from "@middleware/nextAuthSession"
import ReleasesFilter from "components/admin/FilterButtons/FilterButtons"
import NewUsersList from "components/admin/NewUsersList/NewUsersList"
import { useState } from "react"
import { ThemeProvider } from "styled-components"
import { Title } from "styles/admin"
import DialogModal from "../../../components/admin/DialogModal/DialogModal"
import Subheader from "../../../components/admin/Subheader/Subheader"
import AppHeader from "../../../components/frontend/Header/AppHeader"
import { server } from "../../../config"
import { Background, Container, lightTheme } from "../../../styles/frontend"

export interface UserListUser {
	_id: string
	email: string
	firstName: string
	lastName: string
	createdAt?: number | Date
	thirdColumn?: string
}

function newUsers(props) {
	const [newUsers, setNewUsers] = useState<UserListUser[]>(props.newUsers)
	const bannedUsers: UserListUser[] = props.bannedUsers
	const [userTypeDisplayed, setUserTypeDisplayed] = useState("APPROVAL_NEEDED")
	const approvedUsers: UserListUser[] = props.approvedUsers

	const displayedUsers =
		userTypeDisplayed === "APPROVAL_NEEDED" ? newUsers : bannedUsers
	const [modalOpen, setModalOpen] = useState<boolean>(false)

	const [userToCheckOff, setUserToCheckOff] = useState<UserListUser>(null)

	const checkOffUser = (user: UserListUser) => {
		setUserToCheckOff(user)
		setModalOpen(true)
	}

	const checkOffUserConfirmed = async () => {
		const fetchResult = await fetch(
			`${server}/api/users/${userToCheckOff._id}/status`,
			{
				method: "PUT",
				body: JSON.stringify({ status: "APPROVED" }),
				headers: { "content-type": "application/json" },
			}
		)
		if (fetchResult.status === 200) {
			setNewUsers([...newUsers.filter((u) => u._id !== userToCheckOff._id)])
		}
		setUserToCheckOff(null)
		setModalOpen(false)
	}

	return (
		<ThemeProvider theme={lightTheme}>
			<Background>
				<AppHeader theme={lightTheme} label="admin" />
				<Subheader
					links={[
						{
							name: "New / Deleted Users",
							active: true,
							href: "/admin/users/new",
						},
						{
							name: "Overview Database",
							href: "/admin/users/database",
						},
					]}
				/>
				<Container width={990}>
					<Title>New / Deleted Users</Title>
					<ReleasesFilter
						containerStyle={{ marginTop: "16px" }}
						options={[
							{ code: "APPROVAL_NEEDED", name: "New Users" },
							{ code: "BANNED", name: "Banned Users" },
						]}
						type={userTypeDisplayed}
						setType={setUserTypeDisplayed}
					/>
					<NewUsersList
						buttonText={
							userTypeDisplayed === "APPROVAL_NEEDED" ? "Check off" : "Unban"
						}
						checkOffUser={checkOffUser}
						users={displayedUsers}
					/>
					{/*
					<Title style={{fontSize:'28px',lineHeight:'28px',marginTop:'48px'}}>History</Title>
					<HistoryList
						titles={['Name','E-Mail','Date']}
						checkOffUser={checkOffUser}
						users={approvedUsers}
					/> */}
				</Container>
			</Background>
			{modalOpen && (
				<DialogModal
					title={
						userTypeDisplayed === "APPROVAL_NEEDED" ? "CHECK OFF" : "UNBAN"
					}
					open={modalOpen}
					onCancel={() => setModalOpen(false)}
					onConfirm={checkOffUserConfirmed}
					email={userToCheckOff ? userToCheckOff.email : "Invalid Email"}
				/>
			)}
		</ThemeProvider>
	)
}

export const getServerSideProps = withAuthSession(async ({ req }) => {
	const newUsers = await getUsersByStatus("APPROVAL_NEEDED")
	const bannedUsers = await getUsersByStatus("BANNED")
	return {
		props: {
			newUsers,
			bannedUsers,
		},
	}
})

export default newUsers
