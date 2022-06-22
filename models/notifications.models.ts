export const NotificationTypes = ["APPROVED", "REJECTED", "ACTION_NEEDED"]

export const notificationTypeCodeToString = (code: string): string => {
	switch (code) {
		case "APPROVED":
			return "approved"
		case "REJECTED":
			return "rejected"
		case "ACTION_NEEDED":
			return "action needed"
		default:
			return "unknown"
	}
}

export interface Notification {
	time: number
	releaseId: string
	type: string
	coverUrl: string
	releaseTitle: string
}
