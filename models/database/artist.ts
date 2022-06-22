import mongoose, { Document, Model, Schema } from "mongoose"
import { MongoObjectId } from "./mongodb"

export const MODEL_NAME = "Artist"

export interface IDBArtist {
	name: string
	user: MongoObjectId
	editable: boolean
	createdAt: Date

	spotifyId?: string
	spotifyLink?: string
	createNewSpotifyProfile?: boolean
	appleMusicId?: string
	createNewAppleMusicProfile?: boolean
	fugaId?: number
	fugaPublishingHouseId?: number // To add as a "publisher" of an asset
	fugaPersonId?: number
}

export interface IArtistDocument extends Document, IDBArtist {
	id: string
}

interface IArtistModel extends Model<IArtistDocument> {
	findByName: (name: string) => Promise<IArtistDocument[]>
	findOneById: (id: string, projection?: any) => Promise<IArtistDocument>
	findByIds: (ids: string[], projection?: any) => Promise<IArtistDocument[]>
}

const schema = new Schema<IDBArtist, IArtistModel>({
	// required
	name: { type: String, required: true },
	user: { type: Schema.Types.ObjectId, required: true, index: true },
	// Is editable when no relase has been submitted yet with this artist
	editable: { type: Boolean, required: true, default: true },
	createdAt: { type: Date, required: true, default: () => Date.now() },

	// optional
	spotifyId: { type: String },
	spotifyLink: { type: String },
	createNewSpotifyProfile: { type: Boolean },
	appleMusicId: { type: String },
	createNewAppleMusicProfile: { type: Boolean },
	fugaId: { type: Number },
	fugaPublishingHouseId: { type: Number },
	fugaPersonId: { type: Number },
})
schema.index({ user: 1, lastActionTime: -1 })
schema.index({ status: 1, lastActionTime: -1 })

schema.virtual("id").get(function (this: IArtistDocument) {
	return this._id.toString()
})

schema.static("findByName", async function (this: IArtistModel, name: string) {
	return await this.find({ name })
})
schema.static(
	"findOneById",
	async function (this: IArtistModel, id: string, projection?: any) {
		return await this.findOne({ _id: id }, projection)
	}
)
schema.static(
	"findByIds",
	async function (this: IArtistModel, ids: string[], projection?: any) {
		const result: IArtistDocument[] = []
		for (let i = 0; i < ids.length; i++) {
			result.push(await this.findOneById(ids[i], projection))
		}
		return result
	}
)

const Artist: IArtistModel =
	(mongoose.models[MODEL_NAME] as IArtistModel) ||
	mongoose.model<IArtistDocument, IArtistModel>(MODEL_NAME, schema)

export default Artist
