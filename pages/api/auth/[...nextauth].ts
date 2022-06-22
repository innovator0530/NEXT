import UserModel from "@models/database/user"
import { IUserDocument } from "@models/database/user/interface"
import NextAuth, { Session, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { MongooseDBAdapter } from "../../../lib/auth/nextauth-mongoose-adapter"

const DEBUG_LOGS = false
// const DEBUG_LOGS = process.env.NODE_ENV === "development"

export default async function auth(req, res) {
	return await NextAuth(req, res, {
		secret: process.env.NEXTAUTH_SECRET,
		session: {
			strategy: "jwt",
		},

		// Authentication Providers

		providers: [
			GoogleProvider({
				clientId: process.env.GOOGLE_OAUTH_ID,
				clientSecret: process.env.GOOGLE_OAUTH_SECRET,
				httpOptions: {
					// timeout: 30000 -> This does not work. See patches (set default timeout in node_modules/openid-client/lib/helpers/request.js)
				},
			}),
			CredentialsProvider({
				name: "credentials",
				credentials: {
					email: { label: "E-Mail", type: "text", placeholder: "E-Mail" },
					password: { label: "Password", type: "password" },
				},
				async authorize(credentials, req) {
					const result = await UserModel.login(
						credentials.email,
						credentials.password
					)
					if (
						result.successful &&
						result.user &&
						result.user.emailStatus === "OK"
					) {
						const res: Omit<User, "id"> = {
							email: result.user.email,
							firstName: result.user.firstName,
							lastName: result.user.lastName,
							type: result.user.type,
							completionStatus: result.user.completionStatus,
						}
						return res
					} else {
						return null
					}
				},
			}),
		],

		adapter: await MongooseDBAdapter(),
		callbacks: {
			async session({ session, token, user }) {
				DEBUG_LOGS && console.log(`session,token,user`, session, token, user)
				if (token) {
					DEBUG_LOGS && console.log("Session Callback. Is Token!")
					let adminContextUser = null
					if (token.userType === "ADMIN") {
						const user = await UserModel.findOneById(token.sub, {
							adminContextUser: 1,
						})
						if (user && user.adminContextUser) {
							adminContextUser = user.adminContextUser.toString()
						}
					}
					const result: Session = {
						user: {
							email: token.email,
							type: token.userType === "ADMIN" ? "ADMIN" : "USER",
							completionStatus:
								token.completionStatus === "COMPLETE"
									? "COMPLETE"
									: "INCOMPLETE",
							id: token.sub,
							isBanned: token.isBanned,
						},
						adminContextUser,
						expires: session.expires,
					}
					DEBUG_LOGS && console.log(`result`, result)
					return result
				} else {
					console.log("Session Callback. Is NOT Token!")
					const result: Session = {
						user: {
							email: user.email,
							type: user.type === "ADMIN" ? "ADMIN" : "USER",
							completionStatus:
								user.completionStatus === "COMPLETE"
									? "COMPLETE"
									: "INCOMPLETE",
							id: (user as any).id,
							isBanned: user.isBanned,
						},
						adminContextUser: user.adminContextUser as string | null,
						expires: session.expires,
					}
					console.log(`result`, result)
					return result
				}
			},

			async jwt({ token, user, account, profile, isNewUser }) {
				DEBUG_LOGS && console.log("JWT Callback")
				DEBUG_LOGS &&
					console.log(
						`token,user,account,profile,isNewUser`,
						token,
						user,
						account,
						profile,
						isNewUser
					)

				const userId = token.sub
				let userDb: IUserDocument
				if (!token.sub) {
					userDb = await UserModel.findOneByEmail(token.email)
					DEBUG_LOGS && console.log(`userDb`, userDb)
					token.sub = userDb.id
				} else {
					userDb = await UserModel.findOneById(userId, {
						completionStatus: 1,
						type: 1,
						status: 1,
					})
				}
				token.completionStatus = userDb.completionStatus

				token.userType = userDb.type
				token.isBanned = userDb.status === "BANNED"
				DEBUG_LOGS && console.log(`token`, token)
				return token
			},
		},
	})
}
