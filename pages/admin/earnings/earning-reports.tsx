import { withAuthSession } from "@middleware/nextAuthSession"
import { useState } from "react"
import { ThemeProvider } from "styled-components"
import { v4 as uuid } from "uuid"
import ValidationErrorsModal from "../../../components/admin/AdminModal/ValidationErrorsModal/ValidationErrorsModal"
import HistoryList from "../../../components/admin/HistoryList/HistoryList"
import Subheader from "../../../components/admin/Subheader/Subheader"
import AppHeader from "../../../components/frontend/Header/AppHeader"
import { server } from "../../../config"
import {
	EarningReportsUploadContainer,
	EarningsLoadingInfo,
	EarningsUploadButton,
	Title
} from "../../../styles/admin"
import { Background, Container, lightTheme } from "../../../styles/frontend"

const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
]

function earningReports(props) {
	const [earningsHistory, setEarningsHistory] = useState(props.earningsHistory)
	const [errorModalOpen, setErrorModalOpen] = useState(false)
	const [files, setFiles] = useState<FileList>(null)
	const [errorMessages, setErrorMessages] = useState<
		{ message: string; filename: string }[]
	>([])
	const [loadingText, setLoadingText] = useState("")
	const upload = async (files: File[], replace = false) => {
		const uploadSessionId = uuid()

		let dots = 0
		const interval = setInterval(() => {
			let text = "Uploading "
			for (let i = 0; i < dots; i++) {
				text += "."
			}
			dots = ++dots % 4
			setLoadingText(text)
		}, 300)
		for (let i = 0; i < files.length; i++) {
			const formData = new FormData()
			formData.append(replace ? "replace" : "file", files[i])
			await fetch(
				`${server}/api/earnings/upload-session/file?session=${uploadSessionId}`,
				{
					body: formData,
					method: "POST",
				}
			)
		}
		const fetchResult = await fetch(
			`${server}/api/earnings/upload-session/complete?session=${uploadSessionId}`,
			{
				method: "POST",
			}
		)
		const fetchJson = await fetchResult.json()
		if (fetchJson.validationErrors) {
			setErrorMessages(fetchJson.validationErrors)
			if (fetchJson.validationErrors.length > 0) {
				setErrorModalOpen(true)
			} else {
				setErrorMessages([])
				setErrorModalOpen(false)
			}
		} else {
			setErrorMessages([])
			setErrorModalOpen(false)
		}
		const fr = await fetch(`${server}/api/earnings/upload-session/history`)
		const earningsHistory = await fr.json()
		setEarningsHistory(earningsHistory)
		clearInterval(interval)
		setLoadingText("")
	}
	const fileChange = (e) => {
		e.preventDefault()
		setFiles(e.target.files)
		console.log("Uploading!")

		upload(e.target.files)
	}

	const selectFiles = (e) => {
		const fileInput = document.createElement("input")
		fileInput.type = "file"
		fileInput.onchange = fileChange
		fileInput.click()
	}

	const replaceExisting = (filename: string) => {
		let file
		for (let i = 0; i < files.length; i++) {
			if (files.item(i).name === filename) file = files.item(i)
		}
		const filesNew = [file]
		upload(filesNew, true)
	}
	return (
		<ThemeProvider theme={lightTheme}>
			<Background>
				<AppHeader theme={lightTheme} label="admin" />
				<Subheader
					links={[
						{
							name: "Earnings Payout Requests",
							href: "/admin/earnings/payout-requests",
						},
						{
							name: "User Earning Reports",
							active: true,
							href: "/admin/earnings/earning-reports",
						},
					]}
				/>
				<Container width={990}>
					<Title>User Earning Reports</Title>
					<EarningReportsUploadContainer>
						{/* <input type="file" onChange={fileChange} /> */}
						<EarningsUploadButton onClick={selectFiles}>
							Upload
						</EarningsUploadButton>
						<EarningsLoadingInfo>{loadingText}</EarningsLoadingInfo>
					</EarningReportsUploadContainer>

					<Title
						style={{ fontSize: "28px", lineHeight: "28px", marginTop: "48px" }}
					>
						History
					</Title>

					<HistoryList
						titles={["Month", "Upload Date", "Uploaded Reports"]}
						users={earningsHistory.map((e) => {
							const time = new Date(e.time)
							return {
								firstName:
									monthNames[time.getUTCMonth()] + " " + time.getUTCFullYear(),
								email: new Date(e.uploaded).toLocaleDateString("de-DE"),
								thirdColumn: "" + e.amount,
							}
						})}
					/>
				</Container>
				{errorModalOpen && (
					<ValidationErrorsModal
						validationErrors={errorMessages}
						replaceExisting={replaceExisting}
						close={() => setErrorModalOpen(false)}
					/>
				)}
			</Background>
		</ThemeProvider>
	)
}

export const getServerSideProps = withAuthSession(async ({ req },session) => {

	const fr = await fetch(`${server}/api/earnings/upload-session/history`, {
		headers: { cookie: req.headers.cookie },
	})
	const earningsHistory = await fr.json()
	return {
		props: { earningsHistory },
	}
})
export default earningReports
