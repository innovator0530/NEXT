import {
	generateMigrationReport,
	getMigrationDetails,
	isMigrationReportRunning,
} from "@controller/migration/migration"
import { withAuthSession } from "@middleware/nextAuthSession"
import AppHeader from "components/frontend/Header/AppHeader"
import { server } from "config"
import { useEffect, useState } from "react"
import { ThemeProvider } from "styled-components"
import { Button, Title } from "styles/admin"
import { Background, Container, lightTheme } from "styles/frontend"
import { IDBMigrationReport } from "@models/database/migration-reports"

const releasesDbLink =
	(process.env.DB_BROWSER_URL ||
		"https://db.admin.new.rewave.ch/db/rewave-alpha") + "/releases"

function migration(props) {
	const { migrationReportRunning: initialMigrationReportRunning } = props
	const [migrationReportRunning, setMigrationReportRunning] = useState(
		initialMigrationReportRunning
	)

	const [reports, setReports] = useState<IDBMigrationReport[]>([])

	const startGeneratingMigrationReport = async () => {
		if (migrationReportRunning) {
			return
		}
		setMigrationReportRunning(true)
		const fr = await fetch(`${server}/api/migration`, { method: "post" })
		const result = await fr.text()
		alert(result)
	}

	const fetchReports = async (allowUnfinished?: boolean) => {
		const fr = await fetch(
			`${server}/api/migration${allowUnfinished ? "?allowunfinished=true" : ""}`
		)
		const result = await fr.json()
		console.log("result", result)
		setReports(result.reports)
	}

	useEffect(() => {
		;(async () => {
			fetchReports()
		})()
	}, [])
	return (
		<ThemeProvider theme={lightTheme}>
			<Background>
				<AppHeader theme={lightTheme} label="admin" />

				<Container width={990}>
					{migrationReportRunning ? (
						<div>Migration Report currently in Progress</div>
					) : (
						<Button
							onClick={startGeneratingMigrationReport}
							disabled={migrationReportRunning}
						>
							Generate new Report
						</Button>
					)}

					<div>
						<Title>Error Reports</Title>
						<Button onClick={() => fetchReports(true)}>
							Show unfinished Reports instead? (if available)
						</Button>
						{reports.map((report, index) => {
							return (
								<div key={report.releaseId}>
									<h3 style={{ color: "#777" }}>
										{index + 1}/{reports.length} Release
									</h3>
									<div>
										ID: {report.releaseId}
										(Links:{" "}
										<a
											target="_blank"
											href={`/admin/moderation/releases/${report.releaseId}`}
										>
											REWAVE
										</a>
										|
										<a
											target="_blank"
											href={`${releasesDbLink}/"${report.releaseId}"`}
										>
											Database
										</a>
										{report.fugaProductId && (
											<>
												|
												<a
													target="_blank"
													href={`https://next.fugamusic.com/product/${report.fugaProductId}`}
												>
													FUGA
												</a>
											</>
										)}
										)
									</div>
									<div>
										Report generated:{" "}
										{report.createdAt
											? new Date(report.createdAt).toISOString()
											: ""}
									</div>
									<div>{report.message || ""}</div>
									<div>
										<b>Errors:</b>
										<ul>
											{report.migrationErrors.map((err) => {
												return (
													<li>
														{err.message}
														{typeof err.details === "object" && (
															<ul style={{ color: "#aaa" }}>
																<li>{JSON.stringify(err.details, null, 4)}</li>
															</ul>
														)}
													</li>
												)
											})}
										</ul>
									</div>
									<hr style={{ marginTop: "40px" }} />
								</div>
							)
						})}
					</div>
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

export const getServerSideProps = withAuthSession(
	async ({ req, res }, session) => {
		// const migrationDetails = (await getMigrationDetails()) || null
		// console.log("migrationDetails", migrationDetails)
		// generateMigrationReport()
		const migrationReportRunning = await isMigrationReportRunning()
		return {
			props: {
				migrationReportRunning,
			},
		}
	}
)

export default migration
