import { withAuthSession } from "@middleware/nextAuthSession"
import { EmailVerifiedStatusResult } from "@models/database/user/interface"
import { GetServerSideProps } from "next"
import { signIn } from "next-auth/react"
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
	ForgotPassword,
	HR,
	ImageContainer,
	Instructions,
	Label,
	LoginForm,
	SignupInstruction,
} from "../styles/login"
import { Input2 as Input } from "../styles/styles"

const LOGIN_SUCCESS_REDIRECT_URL = server + "/app/dashboard"
const USER_HOME = "/app/dashboard"
const ADMIN_HOME = "/admin/users/new"

function login() {
	// const { mutateUser } = useUser({
	//   adminRedirectTo: "/admin/users/new",
	//   userRedirectTo: "/app/dashboard",
	//   redirectIfFound: true,
	// });

	const router = useRouter()

	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState(
		router.query.message || "To continue, log in to REWAVE."
	)

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const submitLogin = async (event) => {
		event.preventDefault()
		const body = {
			email,
			password,
		}
		try {
			const result = await signIn("credentials", {
				redirect: false,
				email,
				password,
			})
			console.log(`result`, result)

			if (!result.ok && result.error === "CredentialsSignin") {
				const result = await fetch(
					`${server}/api/users/is-email-verified?email=${encodeURIComponent(
						email
					)}&password=${encodeURIComponent(password)}`
				)
				if (result && result.status === 200) {
					const responseBody: { status: EmailVerifiedStatusResult } =
						await result.json()
					switch (responseBody.status) {
						case "FORCE_RESET_PASSWORD":
							setErrorMessage(
								'You must reset your password before logging in. If you haven\'t received an email, please click "Forgot your password".'
							)
							break
						case "UNEXPECTED_ERROR":
							setErrorMessage("An unexpected error ocurred")
							break
						case "INVALID_CREDENTIALS":
							setErrorMessage(
								"Please check whether your credentials are correct"
							)
							break
						case "VERIFICATION_NEEDED":
							setErrorMessage(
								'You must verify your E-Mail address before logging in. Please check your inbox. If you haven\'t received an email within 10 minutes, please click "Forgot your password".'
							)
							break
						case "VERIFIED":
							setErrorMessage(
								"An unexpected error ocurred (E-Mail is verified)"
							)
							break
						default:
							setErrorMessage(
								"An unexpected error ocurred (Invalid response of is-email-verified)"
							)
					}
				} else {
					setErrorMessage(
						"An unexpected error ocurred. Please check whether your credentials are correct"
					)
				}
			} else if (!result.ok) {
				setErrorMessage(`An Error ocurred (${result.error})`)
			} else {
				router.push(LOGIN_SUCCESS_REDIRECT_URL)
			}
		} catch (error) {
			setErrorMessage("An unexpected error happened")
			console.error("An unexpected error happened:", error)
		}
	}
	const formInvalid = (e) => {
		e.preventDefault()
		setErrorMessage("Please check your input!")
		setError(true)
	}

	const notificationText = errorMessage
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
					<Label htmlFor="email">Password</Label>
					<Input
						id="password"
						type="password"
						autoComplete="email"
						placeholder="Your Password"
						value={password}
						required
						onChange={(e) => setPassword(e.target.value)}
					/>
					<ForgotPassword>
						<Link href="/forgot-password">Forgot your password?</Link>
					</ForgotPassword>
					<Button style={{ marginTop: "32px" }} type="submit">
						LOGIN
					</Button>
					{/* Login With Google Button  */}
					{/* <Button
						style={{ marginTop: "24px" }}
						theme={{
							backgroundColor: "#141414",
							color: "white",
							border: "1.35px solid #FFFFFF",
						}}
						type="button"
						onClick={(e) => {
							e.preventDefault()
							signIn("google", { callbackUrl: LOGIN_SUCCESS_REDIRECT_URL })
						}}
					>
						LOGIN WITH GOOGLE
					</Button> */}
					<HR style={{ marginTop: "32px" }} />
					<SignupInstruction style={{ marginTop: "32px" }}>
						Don't have an account?
					</SignupInstruction>

					<Button
						onClick={(e) => {
							e.preventDefault()
							router.push("/signup")
						}}
						style={{ marginTop: "24px", fontWeight: "bold" }}
						theme={{
							backgroundColor: "#141414",
							color: "white",
							border: "1.35px solid #FFFFFF",
							fontWeight: 600,
						}}
					>
						<Link href="/signup">Sign up with E-Mail</Link>
					</Button>
					{/* Sign up With Google Button */}
					{/* <Button
              onClick={(e) => {
                e.preventDefault();
                signIn("google", { callbackUrl: LOGIN_SUCCESS_REDIRECT_URL });
              }}
              style={{ marginTop: "24px", fontWeight: 'bold' }}
              theme={{
                backgroundColor: "#141414",
                color: "white",
                border: "1.35px solid #FFFFFF",
                fontWeight: 600
              }}
            >
              <Link href="/signup">Sign up with Google</Link>
            </Button> */}
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

export const getServerSideProps: GetServerSideProps = withAuthSession(
	async (context, session) => {
		// Redirect accordingly if User is logged in already
		console.log(`session`, session)
		if (session && session.user && !session.user.isBanned) {
			return {
				redirect: {
					permanent: false,
					destination: session.user.type === "ADMIN" ? ADMIN_HOME : USER_HOME,
				},
			}
		}

		return { props: {} }
	},
	false,
	true
)

export default login
