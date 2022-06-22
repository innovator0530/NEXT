import { ArtistTypes } from "@models/options/artistTypes";
import { Schema, Types } from "mongoose";
import { ArtistType } from "context/CreateReleaseState/models/ArtistState.model"
import {MODEL_NAME as ARTIST_MODEL_NAME}  from  "../artist";

export interface IDBReleaseArtist {
	artistId: Types.ObjectId,
	type: ArtistType
}

export const ReleaseArtistSchema = new Schema<IDBReleaseArtist>(
	{
		artistId: { type: Types.ObjectId, ref: ARTIST_MODEL_NAME },
		type: { type: String, required: true, enum: ArtistTypes },
	},
	{ _id: false }
)