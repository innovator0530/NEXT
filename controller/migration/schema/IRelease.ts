import { IDBReleaseArtist } from "./Artist"
import { IDBFreeBeat } from "./FreeBeat"
import { IDBSoundtrack } from "./Soundtrack"

export const PriceCategories = ["Budget", "Back", "Mid", "Front", "Premium"]

export type PriceCategory = "Budget" | "Back" | "Mid" | "Front" | "Premium"

export type FugaCatalogTier = "BUDGET" | "BACK" | "MID" | "FRONT" | "PREMIUM"

export const FugaCatalogTiers = ["BUDGET", "BACK", "MID", "FRONT", "PREMIUM"]

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
/**
 * @TJS-pattern ^[0-9a-f]{24}$
 */
export type MongoIdStr = string

/**
 * @TJS-pattern ^REWAVE-ASSETS-STORAGE:\/\/assets\/users\/[0-9a-f]{24}\/upload_[0-9a-f]{24,40}[a-z_\.]{3,20}$
 */
export type AssetURLStr = string

/**
 * @TJS-pattern ^[0-9]{12,13}$
 * // alt: @TJS-pattern ^auto|[0-9]{12,13}$
 */
type RewaveUPCStr = string

/**
 * @TJS-pattern ^REWAVE[0-9]{8}$
 */
type RewaveIdStr = string

/**
 * @TJS-type integer
 * @min 1000
 * @max 99999999999
 */
export type FugaIdType = number

export interface IDBRelease {
	/**
	 * @minLength 1
	 */
	title: string
	status: ReleaseStatus
	artists: IDBReleaseArtist[]

	user: MongoIdStr

	submitted: Date

	// optional
	coverUrl: AssetURLStr
	musicLabelId: MongoIdStr

	/**
	 * @minLength 2
	 */
	primaryGenre: string
	secondaryGenre?: string
	language: {
		/**
		 * @length 2
		 */
		code: string
		/**
		 * @minLength 1
		 */
		name: string
	}
	explicit: boolean
	/**
	 * items.minLength 1
	 */
	soundtracks: IDBSoundtrack[]
	digitalReleaseDate: Date
	originalReleaseDate: Date
	/**
	 * @minLength 1
	 */
	copyrightBy: string
	/**
	 * @min 2000
	 * @max 2050
	 */
	copyrightYear: number
	/**
	 * @minLength 1
	 */
	publishingRightsBy: string
	/**
	 * @min 2000
	 * @max 2050
	 */
	publishingRightsYear: number
	moderationComment?: string
	rejectionReason?: string
	/**
	 * @min 1
	 */
	stores: {
		/**
		 * @minLength 1
		 */
		name: string
		/**
		 * @minLength 1
		 */
		id: string
	}[]
	freeBeats: IDBFreeBeat[]
	upc: RewaveUPCStr
	lastActionTime: Date
	timesSubmitted: number
	rewaveId: RewaveIdStr
	priceCategory: PriceCategory
	approvalCheckedOff?: boolean
	isProcessing?: boolean

	fugaProductId: FugaIdType
}
