import { Schema } from "mongoose";
import { MongoObjectId } from "../mongodb";
import { IDBReleaseArtist, ReleaseArtistSchema } from "./Artist";

export interface IDBSoundtrack {
	name: string
	musicLabelId?: MongoObjectId
	fileUrl?: string
	artists?: IDBReleaseArtist[]
	language?: {
		name?: string
		code?: string
	},
	metadataLanguage?: {
		name?: string
		code?: string
	},
	primaryGenre?: string
	secondaryGenre?: string
	explicit?: boolean
	isrc?: string
	publishingRightsBy?: string
	publishingRightsYear?: number
	fugaAssetId?:number,
	duration?:number
}




export const SoundtrackSchema = new Schema<IDBSoundtrack>(
	{
		name: { type: String, required: true },
		musicLabelId: { type: Schema.Types.ObjectId },
		fileUrl: { type: String, required: true },
		artists: { type: Array, of: ReleaseArtistSchema },
		language: {
			code: { type: String },
			name: { type: String },
		},
		metadataLanguage: {
			code: { type: String },
			name: { type: String },
		},
		primaryGenre: { type: String },
		secondaryGenre: { type: String },
		explicit: { type: Boolean },
		isrc: { type: String },
		publishingRightsBy: { type: String },
		publishingRightsYear: { type: Number },
		fugaAssetId: {type:Number},
		duration:{type:Number}
	},
	{ _id: false }
)