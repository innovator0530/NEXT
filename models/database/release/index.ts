import mongoose, { Model, Schema } from "mongoose"
import { SoundtrackSchema } from "./Soundtrack"
import { ReleaseArtistSchema } from "./Artist"
import { FreeBeatSchema } from "./FreeBeat"
import { IDBRelease, IReleaseDocument, IReleaseModel } from "./IRelease"
import {
	releaseGetCoverUrl,
	releaseGetSoundtrackUrls,
	releaseSetCoverUrl,
	releaseSetSoundtrackUrls,
} from "./methods"
import { releaseFindOneById, releaseFindLatestByStatus } from "./services"
import { PriceCategories } from "@models/options/priceCategories"

const MODEL_NAME = "Release"

const schema = new Schema<IDBRelease, IReleaseModel>({
	// required
	title: { type: String, required: true },
	status: {
		type: String,
		required: true,
		enum: [
			"PROCESSING",
			"PENDING",
			"APPROVED",
			"ACTION_NEEDED",
			"REJECTED",
			"DRAFT",
			"ACTION_NEEDED_DRAFT",
		],
		index: true,
	},
	artists: { type: Array, of: ReleaseArtistSchema },
	user: { type: Schema.Types.ObjectId, required: true, index: true },
	submitted: { type: Date, required: true },

	// optional
	coverUrl: { type: String },
	musicLabelId: { type: Schema.Types.ObjectId },
	primaryGenre: { type: String },
	secondaryGenre: { type: String },
	language: {
		code: { type: String },
		name: { type: String },
	},
	explicit: { type: Boolean },
	soundtracks: { type: Array, of: SoundtrackSchema },
	digitalReleaseDate: { type: Date },
	originalReleaseDate: { type: Date },
	copyrightBy: { type: String },
	copyrightYear: { type: Number },
	publishingRightsBy: { type: String },
	publishingRightsYear: { type: Number },
	moderationComment: { type: String },
	rejectionReason: { type: String },
	stores: {
		type: Array,
		of: {
			name: { type: String },
			id: { type: String },
		},
	},
	freeBeats: { type: Array, of: FreeBeatSchema },
	upc: { type: String },
	lastActionTime: { type: Date },
	timesSubmitted: { type: Number, default: 0 },
	rewaveId: { type: String, index: true },
	priceCategory: { type: String, enum: PriceCategories },
	approvalCheckedOff: { type: Boolean },
	isProcessing: { type: Boolean },
	fugaProductId: { type: Number },
})
schema.index({ user: 1, lastActionTime: -1 })
schema.index({ status: 1, lastActionTime: -1 })

schema.method("getSoundtrackUrls", releaseGetSoundtrackUrls)
schema.method("setSoundtrackUrls", releaseSetSoundtrackUrls)
schema.method("getCoverUrl", releaseGetCoverUrl)
schema.method("setCoverUrl", releaseSetCoverUrl)

schema.virtual("id").get(function (this: IReleaseDocument) {
	return this._id.toString()
})

// Statics
schema.static("findOneById", releaseFindOneById)
schema.static("findLatestByStatus", releaseFindLatestByStatus)

const Release: IReleaseModel =
	(mongoose.models[MODEL_NAME] as IReleaseModel) ||
	mongoose.model<IReleaseDocument, IReleaseModel>(MODEL_NAME, schema)

export default Release
