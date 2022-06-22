import { PriceCategory } from "@models/options/priceCategories"
import { Document, Model, Types } from "mongoose"
import { IDBReleaseArtist } from "./Artist"
import { IDBFreeBeat } from "./FreeBeat"
import { IDBSoundtrack } from "./Soundtrack"

export type ReleaseStatus =
	| "PENDING"
	| "APPROVED"
	| "ACTION_NEEDED"
	| "REJECTED"
	| "DRAFT"
	| "ACTION_NEEDED_DRAFT"

export const ReleaseStatuses = [
	"PENDING",
	"APPROVED",
	"ACTION_NEEDED",
	"REJECTED",
	"DRAFT",
	"ACTION_NEEDED_DRAFT",
]

export interface IDBRelease {
	title: string
	status: ReleaseStatus
	artists: IDBReleaseArtist[]
	user: Types.ObjectId
	submitted: Date

	// optional
	coverUrl?: string
	musicLabelId?: Types.ObjectId
	primaryGenre?: string
	secondaryGenre?: string
	language?: { code: string; name: string }
	explicit?: boolean
	soundtracks?: IDBSoundtrack[]
	digitalReleaseDate?: Date
	originalReleaseDate?: Date
	copyrightBy?: string
	copyrightYear?: number
	publishingRightsBy?: string
	publishingRightsYear?: number
	moderationComment?: string
	rejectionReason?: string
	stores?: { name: string; id: string }[]
	freeBeats?: IDBFreeBeat[]
	upc?: string
	lastActionTime?: Date
	timesSubmitted?: number
	rewaveId?: string
	priceCategory?: PriceCategory
	approvalCheckedOff?: boolean
	isProcessing?: boolean
	fugaProductId?: number
}

export interface IReleaseDocument extends Document, IDBRelease {
	id: string
}

export interface IReleaseModel extends Model<IReleaseDocument> {
	getSoundtrackUrls: () => Promise<string[]>
	setSoundtrackUrls: (urls: { old: string; new: string }[]) => void
	getCoverUrl: () => Promise<string>
	setCoverUrl: (url: { old: string; new: string }) => void
	findOneById: (id: string) => Promise<IReleaseDocument>
	findLatestByStatus: <T = keyof Partial<IReleaseDocument>>(
		status: ReleaseStatus | "APPROVAL_CHECKED_OFF",
		limit?: number,
		projection?: T,
		exclusiveStartTime?: Date
	) => Promise<Partial<IReleaseDocument>[]>
}
