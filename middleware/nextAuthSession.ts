import {
	GetServerSideProps,
	GetServerSidePropsContext,
	GetServerSidePropsResult,
} from "next"
import { Session } from "next-auth"
import { getSession } from "next-auth/react"
import { connectDatabase } from "../middleware/database"
import User from "../models/database/user"

const DEBUG_LOGS = false
const ADMIN_HOME = "/admin/users/new"

const userAllowedPages = ["/app/*"]

const adminAllowedPages = ["/admin/*", "/app/*"]

const isRouteAllowed = (url: string, userType: string) => {
	let allowedPages = []
	if (userType === "USER") {
		allowedPages = userAllowedPages
	} else if (userType === "ADMIN") {
		allowedPages = adminAllowedPages
	}
	const urlParts = url.split("/")
	return allowedPages.some((p) => {
		const parts = p.split("/")
		let maxIndex = parts.includes("*")
			? parts.indexOf("*") - 1
			: parts.length - 1
		let equal = true
		for (let i = 0; i <= maxIndex; i++) {
			if (parts[i] !== urlParts[i]) equal = false
		}
		return equal
	})
}

// A middleware (for getServerSideProps)
// for protected routes to
// ensure that user is authenticated, profile is valid and redirect accordlingly if requirements are not met
// Replaces User with ContextUser if an admin wants to use this user

export const withAuthSession = (
	fn: (
		context: GetServerSidePropsContext,
		session: Session
	) => Promise<GetServerSidePropsResult<any>>,
	replaceAdminWithContextUser?: boolean,
	preventRedirectIfUnauthenticated?: boolean,
	preventRedirectIfIncomplete?: boolean
): GetServerSideProps => {
	const newFn: GetServerSideProps = async (context) => {
		if (DEBUG_LOGS) console.log("context.req.url :>> ", context.req.url)
		const session: Session | null = await getSession(context)
		if (!session && !preventRedirectIfUnauthenticated) {
			return {
				redirect: {
					permanent: false,
					destination: "/login",
				},
			}
		}

		// Ensure the database is connected
		await connectDatabase()

		// Handle Admin User Context
		if (
			replaceAdminWithContextUser &&
			session?.user.type === "ADMIN" &&
			session.adminContextUser
		) {
			const contextUser = await User.findOneById(session.adminContextUser)
			if (!contextUser || contextUser.type !== "USER") {
				return {
					redirect: {
						permanent: false,
						destination: ADMIN_HOME,
					},
				}
			}
			session.user = {
				isContextUser: true,
				email: contextUser.email,
				type: "USER",
				completionStatus: contextUser.completionStatus,
				id: contextUser.id,
			}
		}

		if (DEBUG_LOGS) console.log("session :>> ", session)
		if (
			session &&
			!session.user.isContextUser &&
			session.user.completionStatus !== "COMPLETE" &&
			!preventRedirectIfIncomplete
		) {
			return {
				redirect: {
					permanent: false,
					destination: "/complete-profile",
				},
			}
		}

		if (!preventRedirectIfUnauthenticated) {
			const pageAllowed = isRouteAllowed(
				context.resolvedUrl,
				(session.user as any).type
			)
			let message = "Please login to use REWAVE"
			if (session.user.isBanned) {
				message = "Your account has been temporarily disabled"
			}
			if (!pageAllowed || session.user.isBanned) {
				return {
					redirect: {
						permanent: false,
						destination:
							session?.user?.type === "USER"
								? `/login?message=${encodeURIComponent(message)}`
								: ADMIN_HOME,
					},
				}
			}
		}

		return await fn(context, session)
	}
	return newFn
}
