// Checks data integrity
// Criteria for "Approved Releases" :
// - follow a JSON Schema
// - exactly match FUGA
// - assets exist (AWS S3/DO Spaces)

import { fetchFuga } from "@lib/fuga/fuga"
import MigrationReport, {
	IDBMigrationReport,
} from "@models/database/migration-reports"
import Release from "@models/database/release"
import { IReleaseDocument } from "@models/database/release/IRelease"
import Ajv, { AnySchema } from "ajv"
import addFormats from "ajv-formats"
import { cloneElement } from "react"
import { compareReleaseWithFuga } from "./compareFuga"
import { getMissingReleases } from "./missingReleases"
import releaseSchema from "./schema/json-schema/Release.json"
const ajv = new Ajv()
addFormats(ajv)
const validate = ajv.compile(releaseSchema)
declare var global

export interface ReleaseErrorReport {
	releaseId: string
	fugaProductId?: number | null
	message?: string
	migrationErrors: ReleaseReportError[]
}

export interface ReleaseReportError {
	code: MigrationReportErrorCode
	message: string
	details?: any
}

const MAX_PROCESSING_TIME = 1800000

type MigrationReportErrorCode =
	| "DATA_STRUCTURE_ERROR"
	| "FUGA_CONSISTENCY_ERROR"
	| "ERROR_STUCK_PROCESSING"
	| "OTHER_ERROR"
	| "ERROR_WHILE_VALIDATING"

const getReleaseMigrationReport = async (
	releaseId: string
): Promise<{ errors: ReleaseReportError[] }> => {
	const errors: ReleaseReportError[] = []
	try {
		const release = await Release.findOneById(releaseId)
		const releaseObject = JSON.parse(JSON.stringify(release.toJSON()))
		const valid = validate(releaseObject)
		// console.log("releaseObject", releaseObject)
		// Check Schema (AJV)
		if (!valid) {
			validate.errors.forEach((e) => {
				errors.push({
					code: "DATA_STRUCTURE_ERROR",
					message: `Validation Error - Value '${e.instancePath}' - Message: "${
						e.message || ""
					}"`,
					details: e,
				})
			})
		}
		// Check if the release is still processing;
		if (release.isProcessing) {
			const lastActionTime = new Date(release.lastActionTime).getTime()
			if (Date.now() - lastActionTime > MAX_PROCESSING_TIME) {
				errors.push({
					code: "ERROR_STUCK_PROCESSING",
					message:
						"The is processing for more than 30 minutes. This indicates that the processing failed for some reason.",
					details: { releaseLastActionTime: release.lastActionTime },
				})
			}
		}
		// Compare with FUGA
		const { errors: fugaErrors } = await compareReleaseWithFuga(release)
		errors.push(...fugaErrors)

		if (errors.length > 0) {
			return { errors }
		} else {
			return { errors: [] }
		}
	} catch (e) {
		console.log("e", e)
		return {
			errors: [
				...errors,
				{
					message: `Some fatal Error ocurred while trying to validate this Release (ID ${releaseId}) Error Message: ${e?.message}`,
					code: "ERROR_WHILE_VALIDATING",
					details: e,
				},
			],
		}
	}
}

export const getMigrationDetails = async (): Promise<{
	releaseErrorReports: ReleaseErrorReport[]
}> => {
	try {
		const reports: ReleaseErrorReport[] = []
		const releaseIds = await Release.find(
			{},
			{ _id: 1, status: 1, rewaveId: 1, fugaProductId: 1 }
		)
		console.log("releaseIds.length", releaseIds.length)

		for (let i = 0; i < releaseIds.length; i++) {
			// for (let i = 0; i < 10; i++) {
			const releaseId = releaseIds[i]?._id?.toString()
			const fugaProductId = releaseIds[i]?.fugaProductId || null
			try {
				console.log("releaseId", releaseId, `(${i}/${releaseIds.length})`)
				const { errors } = await getReleaseMigrationReport(releaseId)
				const report = {
					releaseId,
					fugaProductId,
					message: `Error(s) with Release ${
						releaseIds[i]?.rewaveId || releaseId
					}`,
					migrationErrors: errors,
				}
				reports.push(report)
				if (report.migrationErrors.length > 0) {
					await MigrationReport.create({
						sessionId: global.MIGRATION_REPORT_SESSION_ID,
						...report,
					})
				}
			} catch (e) {
				const report: ReleaseErrorReport = {
					releaseId,
					fugaProductId,
					message: `Error while trying to validate release, ${e?.message}`,
					migrationErrors: [],
				}
				console.log("e", e)
				await MigrationReport.create({
					sessionId: global.MIGRATION_REPORT_SESSION_ID,
					...report,
				})
				reports.push(report)
			}
		}

		// Find releases at FUGA that are missing at REWAVE
		try {
			const { errors: missingReleasesErrors } = await getMissingReleases()
			reports.push(...missingReleasesErrors)
			for (let i = 0; i < missingReleasesErrors.length; i++) {
				await MigrationReport.create({
					sessionId: global.MIGRATION_REPORT_SESSION_ID,
					...missingReleasesErrors[i],
				})
			}
		} catch (e) {
			console.log("e", e)
			const report: Partial<IDBMigrationReport> = {
				releaseId: "multiple",
				sessionId: global.MIGRATION_REPORT_SESSION_ID,
				message: `Finding missing releases failed. Message: ${e?.message}`,
				migrationErrors: [],
			}
			await MigrationReport.create(report)
			reports.push({
				message: report.message,
				migrationErrors: [],
				releaseId: "multiple",
			})
		}

		return { releaseErrorReports: reports }
	} catch (e) {
		console.log("e", e)
	}
}

export const getMostRecentMigrationReport = async (
	allowIncomplete?: boolean
) => {
	const query: any = {}
	if (!allowIncomplete) {
		query.isSessionComplete = true
	}
	const results = await MigrationReport.find(query, {
		sessionId: 1,
		isSessionComplete: 1,
	})
		.sort({ sessionId: -1 })
		.limit(1)
	const session = results[0]
	if (!session) {
		throw new Error("Not found")
	}
	console.log("session.sessionId", session.sessionId)
	const reports = await MigrationReport.find({ sessionId: session.sessionId })
	return reports
}

export const generateMigrationReport = async () => {
	if (global.MIGRATION_REPORT_SESSION_ID) {
		throw new Error("Report is already running")
	} else {
		global.MIGRATION_REPORT_SESSION_ID = new Date().toISOString()
		console.log(
			"Starting new Migration Report Session with ID",
			global.MIGRATION_REPORT_SESSION_ID
		)
		try {
			await getMigrationDetails()
			await MigrationReport.updateMany(
				{ sessionId: global.MIGRATION_REPORT_SESSION_ID },
				{ $set: { isSessionComplete: true } }
			)
		} catch (e) {
			console.log("Error while generating report", e)
		}
		global.MIGRATION_REPORT_SESSION_ID = null
	}
}

export const isMigrationReportRunning = () => {
	return !!global.MIGRATION_REPORT_SESSION_ID
}
