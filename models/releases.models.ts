export const releaseStatusToString = (status: string) => {
	switch (status) {
		case "PENDING":
			return "Pending"
		case "APPROVED":
			return "Approved"
		case "ACTION_NEEDED":
			return "Action Needed"
		case "REJECTED":
			return "Rejected"
		case "DRAFT":
			return "Draft"
		case "ACTION_NEEDED_DRAFT":
			return "Action Needed (Draft)"
		default:
			return "Invalid Status"
	}
}

export interface ReleaseArtist {
	name: string
	type: string
}

export interface Release {
	id?: string
	_id?: string
	status: string // PENDING, APPROVED, ACTION_NEEDED, REJECTED, DRAFT
	title: string
	artists: ReleaseArtist[]
	coverUrl?: string
	musicLabel: string
	genres: string[]
	language: string
	explicit: boolean
	soundtracks: Soundtrack[]
	upc: string
	priceCategory: string
	digitalReleaseDate?: Date
	originalReleaseDate?: Date
	copyrightBy: string // is a music label
	copyrightYear: number
	publishingRightsBy: string // is a music label
	publishingRightsYear: number
	stores: string[]
	freeBeats?: string[]
	rejectionReason?: string
	moderationComment?: string
	submitted?: Date | string
	rewaveId?: string
	timesSubmitted?: number
	user?: string
	approvalCheckedOff?: boolean
	lastActionTime?: string
}

export interface Soundtrack {
	internalId?: number
	loading?: boolean
	name: string
	duration?: number // seconds
	fileUrl: string
	musicLabel?: string
	artists?: ReleaseArtist[]
	explicit?: boolean
	upc?: string
	publishingRightsBy?: string
	publishingRightsYear?: number
	genres?: string[]
	language?: string
}
