import { Schema } from "mongoose"

export interface IDBFreeBeat {
	name: string
	link?: string
	url?: string
	type: "LINK" | "FILE"
}

export const FreeBeatSchema = new Schema<IDBFreeBeat>(
	{
		name: { type: String },
		type: { type: String, enum: ["LINK", "FILE"], required: true },
		link: { type: String },
		url: { type: String },
	},
	{ _id: false }
)
