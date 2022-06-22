import {
	IUserQueryResult,
	queryUsers,
} from "@controller/user-database/queryUsers"
import { withAuthSession } from "@middleware/nextAuthSession"
import Subheader from "components/admin/Subheader/Subheader"
import UserDatabaseList from "components/admin/UserDatabaseList/UserDatabaseList"
import UserProfileModal from "components/admin/UserProfileModal/UserProfileModal"
import AppHeader from "components/frontend/Header/AppHeader"
import { server } from "config"
import { usePagination } from "hooks/usePagination"
import { useRouter } from "next/router"
import { FC, useEffect, useState } from "react"
import { ThemeProvider } from "styled-components"
import { Button, Title, UserDatabaseTitleContainer } from "styles/admin"
import { Input2 } from "styles/styles"
import { Background, Container, lightTheme } from "../../../styles/frontend"

const database: FC<{ users: IUserQueryResult[] }> = function ({ users:initialUsers }) {
	const router = useRouter()

	const [selectedUserId, setSelectedUserId] = useState(null)
	const [userModalOpen, setUserModalOpen] = useState<boolean>(false)
	const [searchTerm,setSearchTerm] = useState('');
	const [searchTermInputValue, setSearchTermInputValue ] = useState<string>('');
	const [users,setUsers] = useState<IUserQueryResult[]>(initialUsers);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(true);

	const [user, setUser] = useState<any>(null)

	const selectUser = async (id: string) => {
		setSelectedUserId(id)
		const fr = await fetch(`${server}/api/users/database/${id}`)
		const result = await fr.json()
		console.log('result', result);
		if (fr.status == 200) {
			setUser(result)
			setUserModalOpen(true)
		} else {
			console.log("Error", result)
		}
	}

	if (
		router.query.user &&
		router.query.user.length > 0 &&
		selectedUserId == null
	) {
		selectUser(router.query.user as string)
	}

	const refetch = async ()=>{
		if(!hasMore){
			return;
		}
		setIsLoading(true);
		let url = `${server}/api/users/database`
		if(searchTerm && searchTerm.length > 2){
			url+=`?search=${encodeURIComponent(searchTerm)}`;
		}
		if(searchTerm && searchTerm.length > 2 && users.length > 0){
			url += `&exclusive_start_email=${encodeURIComponent(users[users.length-1].email)}`
		}
		else if(users.length > 0){
			url += `?exclusive_start_email=${encodeURIComponent(users[users.length-1].email)}`
		}
		const result = await fetch(url);
		const json = await result.json()
		const newUsers = json?.users;
		setUsers([...users,...newUsers]);
		if(newUsers.length <= 0){
			setHasMore(false);
		}
		setIsLoading(false);
	}

	const {lastElementRef} = usePagination(refetch,isLoading,hasMore)

	const startSearch = async ()=>{
		if(isLoading){
			alert('Wait for loading to be finished!');
		}
		if(searchTermInputValue.length>0 &&  searchTermInputValue.length < 3){
			alert("Search term must be at least 3 letters long");
		}
		else if(searchTermInputValue!==searchTerm){
			console.log('searchTermInputValue', searchTermInputValue);
			setUsers([]);
			setHasMore(true);
			setSearchTerm(''+searchTermInputValue);
		}
	}

	useEffect(()=>{
		refetch()
	},[searchTerm])

	return (
		<ThemeProvider theme={lightTheme}>
			<Background>
				<AppHeader theme={lightTheme} label="admin" />
				<Subheader
					links={[
						{
							name: "New / Deleted Users",
							href: "/admin/users/new",
						},
						{
							name: "Overview Database",
							active: true,
							href: "/admin/users/database",
						},
					]}
				/>
				<Container width={990}>
					<UserDatabaseTitleContainer>
						<Title style={{ marginRight: "24px" }}>Overview Database</Title>
						{/* <Button theme={{padding: '10px 16px', background:'rgba(0, 0, 0, 0.04)'}}>Download Database</Button> */}
					</UserDatabaseTitleContainer>
					<UserDatabaseTitleContainer>
						<Input2 value={searchTermInputValue} onKeyPress={(e)=>{e.key==='Enter'&&startSearch()}} onChange={(e)=>setSearchTermInputValue(e.target.value)} placeholder="Search for E-Mail or name" />
						<Button onClick={startSearch} theme={{padding: '10px 16px', background:'rgba(0, 0, 0, 0.04)'}}>Search</Button>
					</UserDatabaseTitleContainer>

					<UserDatabaseList lastElementRef={lastElementRef} openUser={selectUser} users={users} />
				</Container>
				{userModalOpen && (
					<UserProfileModal
						refreshUser={() => selectUser(selectedUserId)}
						closeModal={() => setUserModalOpen(false)}
						user={user}
					/>
				)}
			</Background>
		</ThemeProvider>
	)
}

export const getServerSideProps = withAuthSession(
	async ({ req, query }, session) => {
		const users = (await queryUsers({})).users
		return {
			props: {
				users,
			},
		}
	}
)

export default database
