require("dotenv").config({ path: ".env.development.local" })

const mongoose = require("mongoose")
jest.setTimeout(200000)
;(async () => {
	global.mongoose = mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
})()

afterAll(() => {
	mongoose.disconnect()
})
