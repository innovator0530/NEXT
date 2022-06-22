import { ReleaseErrorReport } from "@controller/migration/migration"
import mongoose, { Document, Model, Schema } from "mongoose"

export interface IDBMigrationReport extends ReleaseErrorReport {
	sessionId: string
	isSessionComplete: boolean
	createdAt: Date
}

const MODEL_NAME = "ReleaseErrorReport"

export interface IMigrationReportDocument extends Document, IDBMigrationReport {
	id: string
}

export interface IMigrationReportModel extends Model<IMigrationReportDocument> {
	// createOne: (name:string, fugaPersonId:number)=>Promise<void>
}

const schema = new Schema<IDBMigrationReport, IMigrationReportModel>({
	// required
	releaseId: String,
	message: String,
	migrationErrors: { type: Array },
	// Is an ISO string, to be able to sort by time created
	sessionId: String,
	isSessionComplete: Boolean,
	fugaProductId: String,
	createdAt: { type: Date, default: () => Date.now() },
})

schema.virtual("id").get(function (this: IMigrationReportDocument) {
	return this._id.toString()
})

// schema.static('createOne',async function(this:IFugaPersonModel,name:string,fugaPersonId:number){
//     const p = new this();
//     p.name = name;
//     p.fugaPersonId = fugaPersonId;
//     await p.save();
// })

const MigrationReport: IMigrationReportModel =
	(mongoose.models[MODEL_NAME] as IMigrationReportModel) ||
	mongoose.model<IMigrationReportDocument, IMigrationReportModel>(
		MODEL_NAME,
		schema
	)

export default MigrationReport
