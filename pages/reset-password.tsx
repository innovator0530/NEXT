import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import Button from "../components/button/button"
import Footer from "../components/login/footer/footer"
import { server } from "../config"
import {
	Background,
	Bubble1,
	Bubble2,
	Bubble3,
	Container,
	errorColor,
	ImageContainer,
	Instructions,
	Label,
	LoginForm,
} from "../styles/login"
import { Input2 as Input } from "../styles/styles"

function resetPassword(props) {
	const router = useRouter()
	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState("Please set a new password")
	const [password, setPassword] = useState<string>("")
	const [passwordRepeat, setPasswordRepeat] = useState<string>("")
	const submitPasswordReset = (e) => {
		e.preventDefault()
		if (password !== passwordRepeat) {
			setError(true)
			setErrorMessage("The passwords you typed in did not match")
			return
		}
		setError(false)
		setErrorMessage("Loading...")
		fetch(`${server}/api/users/password/reset`, {
			method: "PUT",
			body: JSON.stringify({
				email: props.email,
				password,
				token: props.token,
			}),
			headers: { "content-type": "application/json" },
		})
			.then((status) => {
				console.log("status", status)
				if (status.status === 200) {
					router.push("/login")
				} else {
					setError(true)
					setErrorMessage("Something went wrong")
				}
			})
			.catch((e) => {
				setError(true)
				setErrorMessage(`Something went wrong`)
			})
	}
	const formInvalid = (e) => {
		e.preventDefault()
		setErrorMessage("Please check your input!")
		setError(true)
	}
	return (
		<Background>
			<Container>
				<Bubble1 />
				<Bubble2 />
				<Bubble3 />
				<LoginForm
					onSubmit={(e) => submitPasswordReset(e)}
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
						{errorMessage}
					</Instructions>
					<Label htmlFor="password">New password</Label>
					<Input
						id="password"
						type="password"
						autoComplete="off"
						placeholder="Your new password"
						value={password}
						required
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Label htmlFor="passwordRepeat">Repeat new password</Label>
					<Input
						id="passwordRepeat"
						type="password"
						autoComplete="off"
						placeholder="Repeat password"
						value={passwordRepeat}
						required
						onChange={(e) => setPasswordRepeat(e.target.value)}
					/>

					<Button style={{ marginTop: "32px" }} type="submit">
						RESET PASSWORD
					</Button>
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

export const getServerSideProps = ({ req, query }) => {
	const { email, token } = query
	if (!email || !token) {
		return {
			redirect: {
				destination:
					"/login?message=" +
					encodeURIComponent(
						"Your Link was invalid. Please try to sign in with your current password or contact support."
					), //  Please retry by clicking \"Forgot Password\"
				permanent: false,
			},
		}
	}

	return {
		props: {
			email,
			token,
		},
	}
}

export default resetPassword
