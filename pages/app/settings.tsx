import { server } from "../../config"
import {
	Background,
	BigTitle,
	Container,
	darkTheme,
	LabelActionButton,
	LabelAnnotationSuperscript,
	Subtitle,
} from "../../styles/frontend"
import AppHeader from "../../components/frontend/Header/AppHeader"
import {
	DividedContainer,
	Form,
	FormGroup,
	Label,
} from "../../components/frontend/CreateReleaseForms/CreateReleaseForms_styles"
import { Input2 as Input } from "../../styles/styles"
import { useState } from "react"
import { DividerLine } from "../../components/frontend/ReleaseOverview/ReleaseOverview_styles"
import Button from "../../components/button/button"
//import { validatePasswordPolicy } from "../../lib/password"
import { useRouter } from "next/router"
import { ThemeProvider } from "styled-components"
import { GlobalAppConfig } from "../../models/database/config"
import { signOut } from "next-auth/react"
import { withAuthSession } from "../../middleware/nextAuthSession"
import { GetServerSideProps } from "next"
import User from "@models/database/user"
import { IDBUser } from "@models/database/user/interface"

function settings(props) {
	const router = useRouter()
	const user: IDBUser = props.user
	console.log("user", user)

	const [firstName, setFirstName] = useState(user?.firstName)
	const [lastName, setLastName] = useState(user?.lastName)
	const [email, setEmail] = useState(user?.email || "")
	const [instagram, setInstagram] = useState(user?.instagram || "")
	const [paypal, setPaypal] = useState(user?.paypalEmail || "")
	const [twint, setTwint] = useState(user?.twintPhoneNumber || "")
	const [preferredPayment, setPreferredPayment] = useState(
		user?.preferredPayment || ""
	)
	const [showInvalid, setShowInvalid] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	const [oldPassword, setOldPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [newPasswordConfirm, setNewPasswordConfirm] = useState("")

	const submitChangePassword = async (e) => {
		e.preventDefault()
		if (oldPassword.length <= 0) {
			setErrorMessage("Please type in your old password")
			setShowInvalid(true)
			return
		} else if (newPassword.length <= 0) {
			setErrorMessage("Please type in a new password")
			setShowInvalid(true)
			return
		}
		if (newPassword !== newPasswordConfirm) {
			setErrorMessage("The Provided passwords do not match")
			setShowInvalid(true)
			return
		}
		// else if (validatePasswordPolicy(newPassword)) {
		// 	setErrorMessage("The Provided passwords do not match")
		// 	setShowInvalid(true)
		// 	return
		// }

		try {
			console.log("SERVER:", server)

			const fetchResult = await fetch(
				`${server}/api/users/password/change?old_password=${encodeURIComponent(
					oldPassword
				)}&new_password=${encodeURIComponent(newPassword)}`,
				{
					method: "PUT",
				}
			)
			if (fetchResult.status === 200) router.push("/app/dashboard")
			else if (fetchResult.status === 403)
				setErrorMessage("You typed your current password wrong")
			else setErrorMessage("An Error ocurred")
		} catch (e) {
			console.log("Error at change password")
			setErrorMessage("An Error ocurred.")
		}
	}

	const saveChanges = async (e) => {
		e.preventDefault()
		const fetchResult = await fetch(`${server}/api/users/info`, {
			method: "PUT",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				firstName,
				lastName,
				email,
				instagram,
				paypalEmail: paypal,
				twintPhoneNumber: twint,
				preferredPayment,
			}),
		})
		if (fetchResult.status === 200) {
			router.push("/app/dashboard")
		} else {
			setErrorMessage("An Error ocurred")
		}
	}

	const setPayment = (e, type: string) => {
		e.preventDefault()
		setPreferredPayment(type)
	}

	const logout = async (e) => {
		signOut({ callbackUrl: `${server}/login` })
		e.preventDefault()
	}

	return (
		<ThemeProvider theme={darkTheme}>
			<Background>
				<AppHeader
					disabled={user?.type === "ADMIN"}
					theme={darkTheme}
					label="free"
					appConfig={props.appConfig}
				/>
				<Container>
					<BigTitle>Welcome, {user?.firstName}</BigTitle>
					<Subtitle>User Info</Subtitle>
					<Form autocomplete="off">
						{/* First / Last Name  */}

						<DividedContainer>
							<FormGroup style={{ width: "50%", marginRight: "4px" }}>
								<Label htmlFor="first&#8205;Name">First Name</Label>
								<Input
									autocomplete="off"
									invalid={showInvalid && firstName.length <= 0}
									type="text"
									name="first&#8205;Name"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
								/>
							</FormGroup>
							<FormGroup style={{ width: "50%", marginLeft: "4px" }}>
								<Label htmlFor="lastN&#8205;ame">Last&#8205; Name</Label>
								<Input
									invalid={showInvalid && lastName.length <= 0}
									type="text"
									name="lastN&#8205;ame"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
								/>
							</FormGroup>
						</DividedContainer>

						{/* Email */}

						<FormGroup>
							<Label htmlFor="email">E-Mail</Label>
							<Input
								disabled
								type="email"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								invalid={showInvalid && email.length <= 0}
							/>
						</FormGroup>

						{/* Reset Password */}

						<FormGroup>
							<Label htmlFor="passwordReset">Password</Label>
							<Input
								name="oldPassword"
								type="password"
								value={oldPassword}
								onChange={(e) => setOldPassword(e.target.value)}
								placeholder="Your old password"
								autocomplete="off"
							/>
							<Input
								name="newPassword"
								type="password"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								placeholder="New password"
								//invalid={showInvalid && !validatePasswordPolicy(newPassword)}
								autocomplete="off"
							/>
							<Input
								name="newPasswordConfirm"
								type="password"
								value={newPasswordConfirm}
								onChange={(e) => setNewPasswordConfirm(e.target.value)}
								placeholder="Confirm new password"
								invalid={showInvalid && newPasswordConfirm !== newPassword}
								autocomplete="off"
							/>
							<Button
								style={{ marginTop: "12px" }}
								theme={{
									backgroundColor: "#0000",
									color: "#fff",
									border: "1.35px solid #FFFFFF",
								}}
								onClick={submitChangePassword}
							>
								RESET PASSWORD
							</Button>
						</FormGroup>

						{/* Instagram Name */}

						<FormGroup>
							<Label htmlFor="instagram">
								Instagram{" "}
								<small style={{ opacity: "0.2" }}>(faster support)</small>
							</Label>
							<Input
								name="instagram"
								type="text"
								value={instagram}
								onChange={(e) => setInstagram(e.target.value)}
								placeholder="Instagram Username"
							/>
						</FormGroup>
						<DividerLine style={{ marginTop: "48px" }} />

						{/* Payment */}

						<Subtitle>Payment info</Subtitle>

						<FormGroup>
							<Label
								htmlFor="paypal"
								style={{ display: "flex", alignItems: "flex-start" }}
							>
								PayPal{" "}
								{preferredPayment === "PAYPAL" ? (
									<LabelAnnotationSuperscript>
										PREFERRED
									</LabelAnnotationSuperscript>
								) : (
									<LabelActionButton onClick={(e) => setPayment(e, "PAYPAL")}>
										Set to preferred
									</LabelActionButton>
								)}{" "}
							</Label>
							<Input
								name="paypal"
								type="email"
								value={paypal}
								onChange={(e) => setPaypal(e.target.value)}
								placeholder="PayPal E-Mail"
							/>
						</FormGroup>

						<FormGroup>
							<Label
								htmlFor="twint"
								style={{ display: "flex", alignItems: "flex-start" }}
							>
								TWINT Phone Number{" "}
								{preferredPayment === "TWINT" ? (
									<LabelAnnotationSuperscript>
										PREFERRED
									</LabelAnnotationSuperscript>
								) : (
									<LabelActionButton onClick={(e) => setPayment(e, "TWINT")}>
										Set to preferred
									</LabelActionButton>
								)}{" "}
							</Label>
							<Input
								name="twint"
								type="text"
								value={twint}
								onChange={(e) => setTwint(e.target.value)}
								placeholder="TWINT Phone Number"
							/>
						</FormGroup>

						{/* Logout and Save Buttons */}

						<DividedContainer style={{ marginTop: "48px" }}>
							<Button
								theme={{
									padding: "12 0",
									backgroundColor: "#0000",
									color: "#fff",
								}}
								onClick={logout}
							>
								LOG OUT
							</Button>
							<Button style={{ marginLeft: "auto" }} onClick={saveChanges}>
								SAVE CHANGES
							</Button>
						</DividedContainer>
					</Form>
				</Container>
			</Background>
		</ThemeProvider>
	)
}

export const getServerSideProps: GetServerSideProps = withAuthSession(
	async function ({ req, res }, session) {
		// get user and notifications;
		const [dbUser] = await Promise.all([
			User.findOneById(session.user.id, {
				firstName: 1,
				lastName: 1,
				email: 1,
				instagram: 1,
				paypalEmail: 1,
				twintPhoneNumber: 1,
				preferredPayment: 1,
			}),
		])

		;[
			"firstName",
			"lastName",
			"email",
			"instagram",
			"twintPhoneNumber",
			"paypalEmail",
			"preferredPayment",
		].forEach((k) => {
			if (!dbUser[k]) {
				dbUser[k] = null
			}
		})

		console.log("user", dbUser)
		const {
			firstName,
			lastName,
			email,
			instagram,
			twintPhoneNumber,
			paypalEmail,
			preferredPayment,
		} = dbUser

		return {
			props: {
				user: {
					firstName,
					lastName,
					email,
					instagram,
					twintPhoneNumber,
					paypalEmail,
					preferredPayment,
				},
				userContext: !!session.user.isContextUser,
			},
		}
	},
	false
)

// export const getServerSideProps: GetServerSideProps = withAuthSession(async function ({ req, res }, session) {
// 	// get user and notifications;
// 	const [dbUser, notifications] = await Promise.all([
// 		User.findOne({ _id: session.user._id }, { firstName: 1 }),
// 		getNotifications(session.user._id, PAGE_SIZE)
// 	])
// 	// console.log('dbUser :>> ', dbUser);
// 	// console.log(`notifications`, notifications)
// 	return {
// 		props: { user: { firstName: dbUser.firstName || '' }, notifications, userContext: !!session.user.isContextUser },
// 	}
// }, true)

// export const getServerSideProps = withSession(async function ({ req, res }) {
// 	const user: SessionUser = req.session.get("user")
// 	if (!user || !user.isLoggedIn) {
// 		return {
// 			redirect: {
// 				destination: "/login",
// 				permanent: false,
// 			},
// 		}
// 	}
// 	if (user.status !== "APPROVED"&&user.status!=='APPROVAL_NEEDED') {
// 		return {
// 			redirect: {
// 				destination: "/app/account-pending",
// 			},
// 		}
// 	}

// 	const fetchResult = await fetch(`${server}/api/users`, {
// 		headers: { cookie: req.headers.cookie },
// 	})
// 	const userFromDb = await fetchResult.json()

// 	// Fetching App Config

// 	const cfr = await fetch(`${server}/api/config`);
// 	const config:GlobalAppConfig = await cfr.json();

// 	if(!config.loginEnabled){
// 		req.session.destroy();
// 		return{
// 			redirect:{
// 				destination:`/login?message=${encodeURIComponent('Login has been temporarily disabled for all users')}`
// 			}
// 		}
// 	}

// 	return {
// 		props: { user: { ...user, ...userFromDb },appConfig:config  },
// 	}
// })

export default settings
