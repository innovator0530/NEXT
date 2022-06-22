import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import Button from "../components/button/button"
import Footer from "../components/login/footer/footer"
import { server } from "../config"
import {
	Background, Bubble1,
	Bubble2,
	Bubble3,
	Container, errorColor, ImageContainer,
	Instructions, Label, LoginForm
} from "../styles/login"
import { Input2 as Input } from "../styles/styles"

function login() {
	const router = useRouter()

	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState(
		"Forgot your password? Enter your E-Mail below. We will send you a link to reset your password."
	)
    const [requestSuccessful, setRequestSuccessful] = useState(false);

	const [email, setEmail] = useState()
	const submitLogin = async (event) => {
		event.preventDefault()
		try {
            const fr = await fetch(`${server}/api/users/password/request-reset?email=${email}`,{method:'PUT'});
            if(fr.status === 200){
                setErrorMessage("E-Mail sent successfully. Please check your inbox!");
                setRequestSuccessful(true);
            }
            else{
                const json = await fr.json();
                setErrorMessage(json?.message);
            }

		} catch (error) {
			console.error("An unexpected error happened:", error)
		}
	}
	const formInvalid = (e) => {
		e.preventDefault()
		setErrorMessage("Please check your input!")
		setError(true)
	}

	const notificationText = router.query.message || errorMessage
	return (
		<Background>
			<Container>
				<Bubble1 />
				<Bubble2 />
				<Bubble3 />
				<LoginForm
					onSubmit={(e) => submitLogin(e)}
					style={{
						paddingTop: "100px",
						paddingBottom: "130px",
						margin: "0 20px",
					}}
					onInvalid={formInvalid}
				>
					<Link href="/">
						<ImageContainer>
							<Image src="/rewave_white.svg" width="141" height="23" />
						</ImageContainer>
					</Link>
					<Instructions style={error ? { color: errorColor } : {}}>
						{notificationText}
					</Instructions>
                    {!requestSuccessful && <>
					<Label htmlFor="email">E-Mail</Label>
					<Input
						id="email"
						type="email"
						autoComplete="email"
						placeholder="Your E-Mail"
						value={email}
						required
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Button style={{ marginTop: "32px" }} type="submit">
						REQUEST RESET
					</Button>
                    </>}
				</LoginForm>
				<Footer
					style={{
						position: "absolute",
						bottom: 24,
					}}
				/>
			</Container>
		</Background>
	)
}

export default login
