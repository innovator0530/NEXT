import { lightTheme } from "../../../styles/frontend"
import {
	CloseCross,
	Email,
	EmailContainer,
	MainInfoArea,
	Modal,
	ModalContainer,
	ModalTitleContainer,
	Name,
	NameArea,
	UpperTitle,
	PlanNameBadge,
	ButtonContainer,
	MetricsContainer,
	MetricsLabel,
	MetricsValue,
	TopHalf,
	BottomHalf,
	ProfileDataHeading,
	ProfileDataContainer,
	ProfileDataHR,
} from "./UserProfileModal_styles"
import { ThemeProvider } from "styled-components"
import { User } from "../../../models/user.models"
import Button from "../../button/button"
import DialogModal from "../DialogModal/DialogModal"
import { FC, useEffect, useState } from "react"
import { server } from "../../../config"
import { useRouter } from "next/router"
import { getSession } from "next-auth/react"

export interface UserProfile extends User {
	totalEarnings: number
	releaseCount: number
}

const UserProfileModal:FC<{
	user: UserProfile,
	refreshUser: ()=>void,
	closeModal: ()=>void
}> =  function ({user,refreshUser,closeModal}) {
	const [confirmResetModal, setConfirmResetModal] = useState<boolean>(false)
	const [confirmBanModal, setConfirmBanModal] = useState(false);
	const resetPassword = async () => {
		const fr = await fetch(
			`${server}/api/users/password/request-reset?email=${user.email}`,
			{ method: "PUT" }
		)
		setConfirmResetModal(false)
	}

	const banUserFinish = async ()=>{
		const fr = await fetch(`${server}/api/users/${user._id}/status`,{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify({status:'BANNED'})})
		setConfirmBanModal(false);
		refreshUser();
	}

	useEffect(()=>{
		;(async()=>{
			const session = await getSession();
		console.log('session', session);
		})()
		
	},[])

	if (confirmResetModal) {
		return (
			<DialogModal
				email={user.firstName + " " + user.lastName}
				title="Request password reset?"
				onConfirm={resetPassword}
				onCancel={() => setConfirmResetModal(false)}
				open={true}
			/>
		)
	}
	else if(confirmBanModal){
		return(
			<DialogModal
				email={user.firstName + " " + user.lastName}
				title="Ban this user?"
				onConfirm={banUserFinish}
				onCancel={() => setConfirmBanModal(false)}
				open={true}
			/>
		)
	}

	const router = useRouter()

	const accessAccount = (e) => {
		var windowReference:any = window.open();
		e.preventDefault()
		fetch(`${server}/api/users/use/${user._id}`, {
			method: "PUT",
		}).then((fr)=>{
			if (fr.status === 200) {
				windowReference.location = "/app/dashboard"
				// const atag = document.createElement('a');
				// atag.href="/app/dashboard";
				// atag.target = "_blank";
				// document.body.appendChild(atag);
				// atag.click();
				// atag.remove();
			} else {
				console.log("Accessing Account failed with status: ", fr.status)
				// const json = await fr.json()
				// console.log(json)
			}
		})
		
	}

	const banUser = async (e) => {
		e.preventDefault()
		setConfirmBanModal(true);
	}

	return (
		<ThemeProvider style={{ width: "100%", height: "100%" }} theme={lightTheme}>
			<ModalContainer open={true}>
				<Modal open={true}>
					<TopHalf>
						<ModalTitleContainer>
							<UpperTitle>USER PROFILE</UpperTitle>
							<CloseCross onClick={closeModal}>
								<div className="bar angled"></div>
								<div className="bar"></div>
							</CloseCross>
						</ModalTitleContainer>
						<MainInfoArea>
							<NameArea>
								<Name>{user.firstName + " " + user.lastName}</Name>
								<EmailContainer>
									<Email>{user.email}</Email>
									<PlanNameBadge>Free Plan</PlanNameBadge>
								</EmailContainer>
							</NameArea>
							<ButtonContainer>
								<Button
									theme={{
										backgroundColor: "#fff",
										padding: "10px 16px",
										border: " 1px solid rgba(0, 0, 0, 0.2)",
									}}
									onClick={accessAccount}
								>
									Access Account
								</Button>
								<div style={{ marginRight: "8px" }}></div>
								<Button
									theme={{
										backgroundColor: "#000",
										color: "#fff",
										padding: "10px 16px",
										border: " 1px solid rgba(0, 0, 0, 0.2)",
									}}
									onClick={banUser}
								>
									Ban
								</Button>
							</ButtonContainer>
						</MainInfoArea>
						<MetricsContainer>
							<MetricsLabel>Status</MetricsLabel>
							<MetricsLabel>Date joined</MetricsLabel>
							<MetricsLabel>Total Royalties</MetricsLabel>
							<MetricsLabel>Total Releases</MetricsLabel>
							<MetricsValue>
								{(() => {
									switch (user.status) {
										case "APPROVED":
											return "Active"
										case "APPROVAL_NEEDED":
											return "Active (Please check off)"
										case "BANNED":
											return "Banned"
										default:
											return "-"
									}
								})()}
							</MetricsValue>
							<MetricsValue>
								{new Date(user.createdAt).toLocaleDateString("de-DE")}
							</MetricsValue>
							<MetricsValue>${user.totalEarnings / 100} USD</MetricsValue>
							<MetricsValue>{user.releaseCount}</MetricsValue>
						</MetricsContainer>
						<ProfileDataHeading>Profile Data</ProfileDataHeading>
					</TopHalf>
					<BottomHalf>
						<ProfileDataContainer>
							<MetricsLabel>Name</MetricsLabel>
							<MetricsLabel>E-Mail</MetricsLabel>
							<MetricsValue>
								{user.firstName + " " + user.lastName}
							</MetricsValue>
							<MetricsValue>{user.email}</MetricsValue>
							<MetricsLabel>Password</MetricsLabel>
							<MetricsLabel>Instagram</MetricsLabel>
							<MetricsValue>
								<Button
									onClick={() => setConfirmResetModal(true)}
									theme={{ padding: "4px 8px", borderRadius: "8px" }}
								>
									Reset
								</Button>{" "}
							</MetricsValue>
							<MetricsValue>{user.instagram || "-"}</MetricsValue>
						</ProfileDataContainer>
						<ProfileDataHR />
						<ProfileDataContainer>
							<MetricsLabel>
								PayPal {user.preferredPayment === "PAYPAL" ? "(preferred)" : ""}
							</MetricsLabel>
							<MetricsLabel>
								Twint {user.preferredPayment === "TWINT" ? "(preferred) " : ""}
								Phone Number
							</MetricsLabel>
							<MetricsValue>{user.paypalEmail || "-"}</MetricsValue>
							<MetricsValue>{user.twintPhoneNumber || "-"}</MetricsValue>
						</ProfileDataContainer>
					</BottomHalf>
				</Modal>
			</ModalContainer>
		</ThemeProvider>
	)
}

export default UserProfileModal
