import { withAuthSession } from "@middleware/nextAuthSession"
import AppHeader from "components/frontend/Header/AppHeader";
import { useEffect } from "react";
import {ThemeProvider} from "styled-components";
import { Background, Container, lightTheme } from "styles/frontend";


function importRelease(props) {
	useEffect(()=>{
        const email = prompt("E-Mail (Leave Empty for no user)")
        console.log(`email`, email)
		window.location.href = '/app/releases/create?importReleaseEmail='+email;

    },[])

	return (
		<ThemeProvider theme={lightTheme}>
			<Background>
				<AppHeader theme={lightTheme} label="admin" />
			
				<Container width={990}>
					
				</Container>
			</Background>
			{/* {modalOpen && (
				<DialogModal
					title={
						userTypeDisplayed === "APPROVAL_NEEDED" ? "CHECK OFF" : "UNBAN"
					}
					open={modalOpen}
					onCancel={() => setModalOpen(false)}
					onConfirm={checkOffUserConfirmed}
					email={userToCheckOff ? userToCheckOff.email : "Invalid Email"}
				/>
			)} */}
		</ThemeProvider>
	)
}

export const getServerSideProps = withAuthSession(async ({req,res},session)=>{
    return{
        props:{}
    }
})

export default importRelease
