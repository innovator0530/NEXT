import React, { useState } from "react"
import { Background, Container, lightTheme } from "../../styles/frontend"
import { ThemeProvider } from "styled-components"
import AppHeader from "../../components/frontend/Header/AppHeader"
import { NoButton, SettingsDisableContainer, SettingsDisableLabel, SettingsSubtitle, Title, YesButton } from "../../styles/admin"
import { server } from "../../config"
import { GlobalAppConfig } from "../../models/database/config"
import Button from "../../components/button/button"
import Link from "next/link"

function settings(props) {
    const config:GlobalAppConfig = props.config;
    const [loginEnabled, setLoginEnabled] = useState<boolean>(config.loginEnabled)
    const [signupEnabled, setSignupEnabled] = useState<boolean>(config.signupEnabled)
    const [newReleasesEnabled, setNewReleasesEnabled] = useState<boolean>(config.newReleasesEnabled)

    const update = async ({loginEnabled,signupEnabled, newReleasesEnabled})=>{
        const fr = await fetch(`${server}/api/config`,{
            method:'PUT',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify({loginEnabled,signupEnabled, newReleasesEnabled})
        })
        if(fr.status === 200){
            alert('Saved successfully');
        }
        else{
            const json = await fr.json();
            alert('An Error ocurred: '+json.message);
        }
    }

    const updateLoginEnabled = (status: boolean) =>{
        setLoginEnabled(status);
        update({loginEnabled:status,signupEnabled, newReleasesEnabled})
    } 

    const updateSignupEnabled = (status: boolean) =>{
        setSignupEnabled(status);
        update({loginEnabled,signupEnabled:status, newReleasesEnabled})
    } 

    const updateNewReleasesEnabled = (status: boolean) =>{
        setNewReleasesEnabled(status);
        update({loginEnabled,signupEnabled, newReleasesEnabled:status});
    } 

	return (
		<ThemeProvider theme={lightTheme}>
			<Background>
				<AppHeader theme={lightTheme} label="admin" />
				<Container width={990}>
					<Title>Settings</Title>
                    <SettingsSubtitle>Disable</SettingsSubtitle>
                    <SettingsDisableContainer>
                        <SettingsDisableLabel>Login Enabled</SettingsDisableLabel>
                        <YesButton active={loginEnabled} onClick={()=>updateLoginEnabled(true)}>Yes</YesButton>
                        <NoButton active={!loginEnabled} onClick={()=>updateLoginEnabled(false)}>No</NoButton>
                    </SettingsDisableContainer>

                    <SettingsDisableContainer>
                        <SettingsDisableLabel>Register Enabled</SettingsDisableLabel>
                        <YesButton active={signupEnabled} onClick={()=>updateSignupEnabled(true)}>Yes</YesButton>
                        <NoButton active={!signupEnabled} onClick={()=>updateSignupEnabled(false)}>No</NoButton>
                    </SettingsDisableContainer>

                    <SettingsDisableContainer>
                        <SettingsDisableLabel>New Releases Enabled</SettingsDisableLabel>
                        <YesButton active={newReleasesEnabled} onClick={()=>updateNewReleasesEnabled(true)}>Yes</YesButton>
                        <NoButton active={!newReleasesEnabled} onClick={()=>updateNewReleasesEnabled(false)}>No</NoButton>
                    </SettingsDisableContainer>

                    <SettingsSubtitle>User Settings</SettingsSubtitle>
                    <Link href="/app/settings">
                    <Button theme={{backgroundColor:'rgba(0, 0, 0, 0.04)', pading:'10px 16px'}}>Go To User Settings</Button>
                    </Link>
                    
				</Container>
			</Background>
		</ThemeProvider>
	)
}


export const getServerSideProps = async (req, res)=>{
    // Fetch App Config:
    const fr = await fetch(`${server}/api/config`);
    const config = await fr.json();
    return({
        props:{
            config
        }
    })
}

export default settings
