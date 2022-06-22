const cron = require("node-cron")
const { appendFileSync,createReadStream } = require("fs")
const { execSync } = require("child_process")
const AWS = require("aws-sdk")

const DELETE_TEMP_FILES_MIN_AGE_DAYS = 1
const DELETE_LOG_FILES_MIN_AGE_DAYS = 14
const DELETE_DB_DUMPS_MIN_AGE_DAYS = 7;

const s3Client = new AWS.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})
const s3BucketName = process.env.ARCHIVE_BUCKET_NAME
const ARCHIVE_STORAGE_CLASS = "GLACIER"
const DB_BACKUPS_PREFIX = "db-backups/"

const writeToLogs = (text) => {
	const today = new Date()
	const filename = `logs/cron-${today.getFullYear()}-${
		today.getMonth() + 1
	}-${today.getDate()}.log`
	const line = `[${today.toISOString()}] ${text}\n`
	appendFileSync(filename, line)
}

module.exports.installCronjobs = (stage) => {

    // Delete old Logfiles
	console.log(
		"Installing Cronjob: Deleting all logfiles older than",
		DELETE_LOG_FILES_MIN_AGE_DAYS,
		"days"
	)
	cron.schedule("20 4 * * *", () => {
		console.log(
			"Deleting all logfiles older than",
			DELETE_LOG_FILES_MIN_AGE_DAYS,
			"days"
		)
		const command = `find logs -type f -mtime +${DELETE_LOG_FILES_MIN_AGE_DAYS} -delete`
		execSync(command)
		writeToLogs(`Deleted old Logfiles (Command: ${command})`)
	})

    // Delete old Tempfiles
	console.log(
		"Installing Cronjob: Deleting all temporary files older than",
		DELETE_TEMP_FILES_MIN_AGE_DAYS,
		"days"
	)
	cron.schedule("54 */3 * * *", () => {
		console.log(
			"Deleting all temporary files older than",
			DELETE_TEMP_FILES_MIN_AGE_DAYS,
			"days"
		)
		const command = `find .temp -type f -mtime +${DELETE_TEMP_FILES_MIN_AGE_DAYS} -delete`
		execSync(command)
		writeToLogs(`Deleted old tempfiles (Command: ${command})`)
	})

    // Backup Database and upload to S3
	console.log("Installing Cronjob: Backup up database (Mongodump) and uploading it to AWS S3")
	// restore with: mongorestore --gzip --archive=/path/to/archive/file --nsFrom "rewave.*" --nsTo "rewave-restore-archive.*"
	cron.schedule("5 */12 * * *", async () => {
        console.log("[Cronjob] Backing up database");
		const today = new Date()
		const filename = `rewave-stage-${stage}-${today.getFullYear()}-${
			today.getMonth() + 1
		}-${today.getDate()}_${today.getHours()}:${today.getMinutes()}-mongodb-archive`
		const filePath = "db-dumps/" + filename
		const command = `mongodump ${process.env.MONGODB_CONNECTION_STRING} --gzip --archive=${filePath}`
		execSync(command)
		writeToLogs(`Dumped db (Command: ${command})`)

		// Upload dump to AWS S3
		const params = {
			Key: DB_BACKUPS_PREFIX + filename,
			Bucket: s3BucketName,
			Body: createReadStream(filePath),
			StorageClass: ARCHIVE_STORAGE_CLASS,
		}

		const s3Command = s3Client.upload(params)
		await s3Command.promise()
        writeToLogs("Uploaded db dump ",filename,"to S3");

        // Delete old local Backups
        const deleteCommand = `find db-dumps -type f -mtime +${DELETE_DB_DUMPS_MIN_AGE_DAYS} -delete`
		execSync(deleteCommand)
		writeToLogs(`Deleted old DB Dumps (Command: ${command})`)
	})
}
