const { copyFileSync, appendFileSync, mkdirSync } = require("fs")
const { spawn, execSync } = require("child_process")

const stage = process.argv[2] || "dev"
console.log(`Stage is ${stage}`)
const loggingEnabled = stage !== "dev"
if (loggingEnabled) {
	try {
		mkdirSync("logs")
	} catch (e) {}
}

let port = 3000
if (process.env.PORT) {
	console.log("process.env.PORT", process.env.PORT)
	port = process.env.PORT
}
console.log("Using Port:", port)

const linuxDependencies = [
	"convert -version",
	"ffprobe -version",
	"mongodump --version",
	"file --version",
]

let envFile = ".env.development.local"
if (stage === "live" || stage === "alpha" || stage === "beta") {
	let srcEnvFile
	switch (stage) {
		case "live":
			srcEnvFile = ".env.production-live"
			break
		case "alpha":
			srcEnvFile = ".env.production-alpha"
			break
		case "beta":
			srcEnvFile = ".env.production-beta"
			break
	}
	copyFileSync(srcEnvFile, ".env.production")
	envFile = ".env.production"
	console.log(`copied "${srcEnvFile}" to ".env.production"`)
}

console.log(`Will now use "${envFile}" for environment configuration`)
require("dotenv").config({ path: envFile })

const { installCronjobs } = require("./cronjobs")

console.log("process.env.SERVER_BASE_URL", process.env.SERVER_BASE_URL)

const mongodb = require("mongodb")
const delayPromise = (delay) =>
	new Promise((resolve) => setTimeout(() => resolve(), delay))

;(async () => {
	// Check if system dependencies are installed
	linuxDependencies.forEach((l) => {
		execSync(l)
		console.log(`Command: "${l}" works`)
	})

	// Check if the database is reachable and check if the minimum population is fulfilled

	let dbClient
	while (!dbClient) {
		try {
			dbClient = await mongodb.connect(process.env.MONGODB_CONNECTION_STRING)
		} catch (e) {
			console.log("e", e)
			console.log("Failed Connecting to MongoDB. Retrying in 3 seconds")
			await delayPromise(3000)
		}
	}

	const db = await dbClient.db()

	let minimumRequirementSatisfied = false
	while (!minimumRequirementSatisfied) {
		const collections = await db.collections()
		console.log(
			`Found these collections in the db: ${collections.map(
				(c) => c.namespace
			)}`
		)
		const collectionNames = collections.map((c) => c.namespace.split(".").pop())

		if (
			!collectionNames.includes("rewaveids") &&
			!collectionNames.includes("isrcs")
		) {
			console.log(
				'Required collections "rewaveids" and "isrcs" not found. Retrying in 5 seconds'
			)
			await delayPromise(5000)
		} else {
			const isrc = (
				await db
					.collection("isrcs")
					.find()
					.sort({ isrc: -1 })
					.limit(1)
					.toArray()
			)[0]
			console.log("found latest isrc", isrc)
			const rewaveId = (
				await db
					.collection("rewaveids")
					.find()
					.sort({ rewaveId: -1 })
					.limit(1)
					.toArray()
			)[0]
			console.log("found latest rewaveId", rewaveId)
			if (!isrc || !isrc.isrc) {
				console.log(
					'Found no ISRC in ISRC collection or latest found ISRC is missing "isrc" property. Retrying in 5 seconds'
				)
				await delayPromise(5000)
			} else if (!rewaveId || !rewaveId.rewaveId) {
				console.log(
					'Found no rewaveid in rewaveids collection or latest found rewaveid is missing "rewaveId" property. Retrying in 5 seconds'
				)
				await delayPromise(5000)
			} else {
				minimumRequirementSatisfied = true
			}
		}
	}
	console.log("Minimum Database configuration satisfied!")
	dbClient.close()

	const options = loggingEnabled ? {} : { stdio: "inherit" }
	const args = ["run", "next", "--"]
	if (stage === "dev") {
		args.push("dev")
	} else {
		args.push("start")
	}
	args.push("-p", "" + port)
	const nextProcess = spawn("npm", args, options)
	if (loggingEnabled) {
		nextProcess.stdout.on("data", (data) => {
			process.stdout.write(data)
			const today = new Date()
			const filename = `logs/nextjs-stage-${stage}-${today.getFullYear()}-${
				today.getMonth() + 1
			}-${today.getDate()}.log`
			appendFileSync(filename, data)
		})
	}
	process.on("exit", () => {
		nextProcess.kill()
	})

	installCronjobs(stage)
})()
