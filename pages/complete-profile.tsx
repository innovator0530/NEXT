import { withAuthSession } from "@middleware/nextAuthSession"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState } from 'react'
import Button from "../components/button/button"
import Checkbox from "../components/checkbox/Checkbox"
import Footer from "../components/login/footer/footer"
import { server } from "../config"
import {
    Background, Bubble1,
    Bubble2,
    Bubble3, ColumnContainer, errorColor, HR, ImageContainer,
    Instructions, Label, LoginForm, LoginQuestion, SignupContainer, TermsLink
} from "../styles/login"
import { Input2 as Input } from "../styles/styles"

function completeProfile() {
    const router = useRouter();

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("To continue, register for REWAVE.")
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('');
    const [emailConfirm, setEmailConfirm] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [instagram, setInstagram] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);


    const formValid = (): boolean => {
        let isError = false;
        const markError = (message: string) => {
            isError = true;
        }
        if (firstName.length <= 0) {
            markError('Please input your first name');
            return false;
        }
        if (lastName.length <= 0) {
            markError('Please input your last name');
            return false;
        }
        if (!acceptTerms) {
            markError("Please Accept the terms.")
        }
        return !isError;
    }

    const submitForm = async (e) => {
        e.preventDefault();
        if (!formValid()) {
            return;
        }
        const submitUser = {
            firstName,
            lastName,
            instagram
        }
        console.log("Submitting User:", submitUser);

        try {
            const fetchResult = await fetch(`${server}/api/users/complete-profile`, {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(submitUser)
            })
            const resultMessage = await fetchResult.json();
            console.log("Signin Result Message:", resultMessage);
            if (fetchResult.status !== 200) {
                const text = await fetchResult.text();
                console.log(`text`, text)
                throw new Error('Post User not successful')
            }
            router.push('/app/dashboard')
            // router.push('/login?message=' + encodeURIComponent('Signed up successfully! Please click on the verification link we have sent to your email'));
        }
        catch (e) {
            console.error("Error at signing in:", e);
        }

    }
    const formInvalid = (e) => {
        e.preventDefault();
    }
    const goToLogin = (e)=>{
        e.preventDefault();
        router.push('/login')
    }
    return (
        <Background>
            <SignupContainer>
                <Bubble1 />
                <Bubble2 />
                <Bubble3 />
                <LoginForm
                    style={{ paddingTop: "75px", paddingBottom: "100px", margin: "0 20px" }}
                    onSubmit={submitForm}
                    onInvalid={formInvalid}
                >
                    <Link href="/">
                        <ImageContainer><Image src="/rewave_white.svg" width="141" height="23" /></ImageContainer>
                    </Link>
                    <Instructions style={error ? { color: errorColor } : {}}>{errorMessage}</Instructions>
                    <ColumnContainer>
                        <div style={{ width: '50%', paddingRight: '4px' }}>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input invalid={error && firstName.length <= 0} id="firstName" type="text" autoComplete="given-name" placeholder="First Name" value={firstName} required onChange={e => setFirstName(e.target.value)} />
                        </div>
                        <div style={{ width: '50%', paddingLeft: '4px' }}>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input invalid={error && lastName.length <= 0} id="lastName" type="text" autoComplete="family-name" placeholder="Last Name" value={lastName} required onChange={e => setLastName(e.target.value)} />
                        </div>
                    </ColumnContainer>


                    <Label htmlFor="instagram">
                        Instagram <small style={{ color: "#ffffffcc" }}>(faster support)</small>
                    </Label>
                    <Input id="instagram" type="text" placeholder="Instagram Account" value={instagram} onChange={e => setInstagram(e.target.value)} />

                    <Checkbox
                        required
                        invalid={error && !acceptTerms}
                        style={{ marginTop: "32px" }}
                        checked={acceptTerms} onChange={e => setAcceptTerms(e.target.checked)}>
                        <Label style={{ margin: 0 }} htmlFor="accept-terms" onClick={() => { console.log("click"); setAcceptTerms(!acceptTerms); }}>
                            I accept the <TermsLink target="_blank" href="/terms-of-use" name="Terms of Service" />
                        </Label>
                    </Checkbox>


                    <Button style={{ marginTop: "32px" }}>REGISTER</Button>
                    <HR style={{ marginTop: "32px" }} />
                    <LoginQuestion style={{ marginTop: "32px" }}>Already have an Account?</LoginQuestion>
                    <Button
                        onClick={goToLogin}
                        type="button"
                        style={{ marginTop: "24px" }}
                        theme={{ backgroundColor: "#141414", color: "white", border: "1.35px solid #FFFFFF" }}
                    >
                            LOGIN
                    </Button>

                </LoginForm>
                <Footer
                    style={{
                        position: "absolute",
                        bottom: 24
                    }}
                />
            </SignupContainer>
        </Background>
    )
}

export const getServerSideProps = withAuthSession(async ({ req, res },session) => {

    if(!session?.user || session.user.completionStatus !== 'INCOMPLETE'){
        return{
            redirect:{
                permanent: false,
                destination:'/login'
            }
        }
    }
//     // // Fetching App Config
//     // const cfr = await fetch(`${server}/api/config`);
//     // const config:GlobalAppConfig = await cfr.json();

//     // if(!config.signupEnabled){
//     // 	return{
//     // 		redirect:{
//     // 			destination:`/login?message=${encodeURIComponent('Signup has been temporarily disabled. Please try again in the next days.')}`
//     // 		}
//     // 	}
//     // }

    return {
        props: {}
    }
},false,true, true)

export default completeProfile
