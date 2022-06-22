import type { Adapter, AdapterSession, AdapterUser } from "next-auth/adapters"
import { Account } from "next-auth"
import mongoose from "mongoose"
import User from "../../models/database/user"
import AccountSchema from "../../models/database/auth-account"
import Session from "../../models/database/auth-session"
import VerificationTokenSchema from "../../models/database/auth-verification-token"

const MONGODB_CONN_STR = process.env.MONGODB_CONNECTION_STRING

const DEBUG_LOGS = true

export async function MongooseDBAdapter(): Promise<Adapter> {
	if (!(global as any).mongoose) {
		;(global as any).mongoose = await mongoose.connect(MONGODB_CONN_STR, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		})
	}

	return {
		// Current Usage: Is called when a user is created via Google Auth
		// data contains: email, name, createdAt, emailVerified and image
		// Creates user in database that needs to be "completed" later by the user
		async createUser(data) {
			const user: any = data
			if (DEBUG_LOGS) console.log("Creating User:", data)

			const newUser = await User.createFromNextAuth(
				user.email,
				user.name,
				user.emailVerified,
				user.image
			)

			const result: AdapterUser = {
				id: newUser.id,
				email: newUser.email,
				name: newUser.name,
				emailVerified: newUser.emailVerified,
				createdAt: newUser.createdAt,
			}
			if (DEBUG_LOGS) console.log("result", result)
			return result
		},

		async getUser(id) {
			if (DEBUG_LOGS) console.log("Getting user by id:", id)
			const user = await User.findOneById(id)
			if (DEBUG_LOGS) console.log("Got:", user)
			if (!user) return null
			return user as unknown as AdapterUser
		},

		async getUserByEmail(email) {
			if (DEBUG_LOGS) console.log("getting use by Email:", email)
			const user = await User.findOneByEmail(email)
			if (!user) return null
			return user as unknown as AdapterUser
		},

		async getUserByAccount(provider_providerAccountId) {
			if (DEBUG_LOGS)
				console.log("Getting User by account:", provider_providerAccountId)
			const account = await AccountSchema.findOne(provider_providerAccountId)
			if (!account) return null
			const userId = account.toObject().userId
			const user = await User.findOneById(userId)
			if (!user) return null
			return user as unknown as AdapterUser
		},
		async updateUser(data) {
			if (DEBUG_LOGS) console.log("Updating user:", data)
			const user = await User.findOneAndUpdate({ _id: data.id }, { $set: data })
			return user as unknown as AdapterUser
		},
		async deleteUser(id) {
			const userId = id
			await Promise.all([
				AccountSchema.deleteMany({ userId }),
				Session.deleteMany({ userId }),
				User.deleteOne({ _id: userId }),
			])
		},
		linkAccount: async (data) => {
			const account = data as Account
			await AccountSchema.create(account)
			return account
		},
		async unlinkAccount(provider_providerAccountId) {
			const { value: account } = await AccountSchema.findOneAndDelete(
				provider_providerAccountId
			)
			return account
		},
		async getSessionAndUser(sessionToken) {
			if (DEBUG_LOGS) console.log("Getting session: ", sessionToken)
			const session = await Session.findOne({ sessionToken })
			if (!session) return null
			const user = await User.findOne({ _id: session.userId })
			if (DEBUG_LOGS) console.log("Found User:", user)
			if (!user) return null
			const result: any = {
				user: { ...user, id: user._id },
				session,
			}
			if (session.adminContextUser) {
				result.user.adminContextUser = session.adminContextUser
			}
			if (DEBUG_LOGS) console.log("Result", result)
			return result
		},
		async createSession(data) {
			if (DEBUG_LOGS) console.log("Creating Session:", data)
			const session = data as AdapterSession
			await Session.create(session)
			return session
		},
		async updateSession(data) {
			if (DEBUG_LOGS) console.log("Updating session:", data)
			const { value: session } = await Session.findOneAndUpdate(
				{ sessionToken: data.sessionToken },
				{ $set: data }
			)
			return session
		},
		async deleteSession(sessionToken) {
			const { value: session } = await Session.findOneAndDelete({
				sessionToken,
			})
			return session
		},
		async createVerificationToken(data) {
			if (DEBUG_LOGS) console.log("Creating Verification Token", data)
			await VerificationTokenSchema.create(data)
			return data
		},
		async useVerificationToken(identifier_token) {
			if (DEBUG_LOGS) console.log("Using Verification Token:", identifier_token)
			const findResult = await VerificationTokenSchema.findOneAndDelete({
				token: identifier_token.token,
			})
			let returnValue: any | null = findResult
			if (!findResult) returnValue = null
			delete findResult._id
			return returnValue
		},
	}
}
