import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState } from "react"
import Button from "../components/button/button"
import Checkbox from "../components/checkbox/Checkbox"
import Footer from "../components/login/footer/footer"
import { server } from "../config"
import {
	Background,
	Bubble1,
	Bubble2,
	Bubble3,
	ColumnContainer,
	errorColor,
	HR,
	ImageContainer,
	Instructions,
	Label,
	LoginForm,
	LoginQuestion,
	SignupContainer,
	TermsLink,
} from "../styles/login"
import { Input2 as Input } from "../styles/styles"

const USE_MOCK_DATA = false //process.env.NODE_ENV === 'development';

const TitleImage = React.forwardRef<any, any>(({ href }, ref) => (
	<a href={href} ref={ref}>
		<Image src="/rewave_white.svg" width="141" height="23" />
	</a>
))

function signup() {
	const router = useRouter()

	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState(
		"To continue, register for REWAVE."
	)
	const [firstName, setFirstName] = useState<string>("")
	const [lastName, setLastName] = useState(USE_MOCK_DATA ? "Doe" : "")
	const [email, setEmail] = useState(
		USE_MOCK_DATA ? `${Math.random()}@saurwein.net` : ""
	)
	const [emailConfirm, setEmailConfirm] = useState(USE_MOCK_DATA ? email : "")
	const [password, setPassword] = useState(USE_MOCK_DATA ? "Password0!" : "")
	const [passwordConfirm, setPasswordConfirm] = useState(
		USE_MOCK_DATA ? "Password0!" : ""
	)
	const [instagram, setInstagram] = useState("")
	const [acceptTerms, setAcceptTerms] = useState(USE_MOCK_DATA)

	const passwordValid = (): boolean => {
		return password.length >= 0
	}

	const markError = (message: string) => {
		setError(true)
		setErrorMessage(message)
	}

	const formValid = (): boolean => {
		let isError = false

		if (firstName.length <= 0) {
			markError("Please input your first name")
			return false
		} else if (lastName.length <= 0) {
			markError("Please input your last name")
			return false
		} else if (email.length <= 0) {
			markError("Please input your email")
			return false
		} else if (emailConfirm !== email) {
			markError("Your provided emails do not match.")
			return false
		} else if (!passwordValid()) {
			markError("Your password does not meet our requirements.")
			return false
		} else if (password !== passwordConfirm) {
			markError("Your provided passwords do not match")
			return false
		} else if (!acceptTerms) {
			markError("Please Accept the terms.")
			return false
		}
		return true
	}

	const submitForm = async (e) => {
		e.preventDefault()
		console.log("submitting form!!!")
		if (!formValid()) {
			console.log("Form invalid!")
			return
		}
		const submitUser = {
			email,
			password,
			firstName,
			lastName,
			instagram,
		}
		console.log("Submitting User:", submitUser)

		try {
			const fetchResult = await fetch(`${server}/api/users`, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(submitUser),
			})
			const resultMessage = await fetchResult.json()
			console.log("Signin Result Message:", resultMessage)
			if (resultMessage.message === "email already exists") {
				markError("User exists already")
				window.scrollTo(0, 0)
			}
			if (fetchResult.status !== 200) {
				throw new Error("Post User not successful")
			}
			router.push(
				"/login?message=" +
					encodeURIComponent(
						"Signed up successfully! Please click on the verification link we have sent to your email"
					)
			)
		} catch (e) {
			console.error("Error at signing in:", e)
		}
	}
	const formInvalid = (e) => {
		console.log("Form invalid!")
		e.preventDefault()
	}
	return (
		<Background>
			<SignupContainer>
				<Bubble1 />
				<Bubble2 />
				<Bubble3 />
				<LoginForm
					style={{
						paddingTop: "75px",
						paddingBottom: "100px",
						margin: "0 20px",
					}}
					onSubmit={(e) => e.preventDefault()}
					onInvalid={formInvalid}
				>
					<ImageContainer>
						<Link href="/" passHref>
							<TitleImage />
						</Link>
					</ImageContainer>

					<Instructions style={error ? { color: errorColor } : {}}>
						{errorMessage}
					</Instructions>
					<ColumnContainer>
						<div style={{ width: "50%", paddingRight: "4px" }}>
							<Label htmlFor="firstName">First Name</Label>
							<Input
								invalid={error && firstName.length <= 0}
								id="firstName"
								type="text"
								autoComplete="given-name"
								placeholder="First Name"
								value={firstName}
								required
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</div>
						<div style={{ width: "50%", paddingLeft: "4px" }}>
							<Label htmlFor="lastName">Last Name</Label>
							<Input
								invalid={error && lastName.length <= 0}
								id="lastName"
								type="text"
								autoComplete="family-name"
								placeholder="Last Name"
								value={lastName}
								required
								onChange={(e) => setLastName(e.target.value)}
							/>
						</div>
					</ColumnContainer>

					<Label htmlFor="email">E-Mail</Label>
					<Input
						invalid={error && email.length <= 0}
						id="email"
						type="email"
						autoComplete="email"
						placeholder="Your E-Mail"
						value={email}
						required
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Label htmlFor="email-confirm">Confirm E-Mail</Label>
					<Input
						invalid={error && email !== emailConfirm}
						id="email-confirm"
						type="email"
						autoComplete="email"
						placeholder="Confirm E-Mail"
						value={emailConfirm}
						required
						onChange={(e) => setEmailConfirm(e.target.value)}
					/>
					<Label htmlFor="password">Password</Label>
					<Input
						invalid={error && !passwordValid()}
						id="password"
						type="password"
						placeholder="Password"
						value={password}
						required
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Label htmlFor="password-confirm">Confirm Password</Label>
					<Input
						invalid={error && password !== passwordConfirm}
						id="password-confirm"
						type="password"
						placeholder="Confirm Password"
						value={passwordConfirm}
						required
						onChange={(e) => setPasswordConfirm(e.target.value)}
					/>
					<Label htmlFor="instagram">
						Instagram{" "}
						<small style={{ color: "#ffffffcc" }}>(faster support)</small>
					</Label>
					<Input
						id="instagram"
						type="text"
						placeholder="Instagram Account"
						value={instagram}
						onChange={(e) => setInstagram(e.target.value)}
					/>

					<Checkbox
						required
						invalid={error && !acceptTerms}
						style={{ marginTop: "32px" }}
						checked={acceptTerms}
						onChange={(e) => setAcceptTerms(e.target.checked)}
					>
						<Label
							style={{ margin: 0 }}
							htmlFor="accept-terms"
							onClick={() => {
								console.log("click")
								setAcceptTerms(!acceptTerms)
							}}
						>
							I accept the{" "}
							<TermsLink
								target="_blank"
								href="/terms-of-use"
								name="Terms of Service"
							/>
						</Label>
					</Checkbox>

					<Button onClick={submitForm} style={{ marginTop: "32px" }}>
						REGISTER
					</Button>
					{error && (
						<Instructions style={error ? { color: errorColor } : {}}>
							{errorMessage}
						</Instructions>
					)}
					<HR style={{ marginTop: "32px" }} />
					<LoginQuestion style={{ marginTop: "32px" }}>
						Already have an Account?
					</LoginQuestion>

					<Button
						onClick={(e) => {
							e.preventDefault()
							router.push("/login")
						}}
						type="button"
						style={{ marginTop: "24px" }}
						theme={{
							backgroundColor: "#141414",
							color: "white",
							border: "1.35px solid #FFFFFF",
						}}
					>
						<Link href="/login">LOGIN</Link>
					</Button>
				</LoginForm>
				<Footer
					style={{
						position: "absolute",
						bottom: 24,
					}}
				/>
			</SignupContainer>
		</Background>
	)
}

export default signup
