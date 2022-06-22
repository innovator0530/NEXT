import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			// The user's ID
			id: string
			email: string
			type: "ADMIN" | "USER"
			completionStatus: "COMPLETE" | "INCOMPLETE"
			// Is defined and true if the current user is an admin and uses the App as a regular User
			isContextUser?: boolean
			isBanned?: boolean
		}
		// The User ID of the context user. If this is set, the the above user will be replaced by the user with this ID
		adminContextUser?: string | null
	}

	/**
	 * The shape of the user object returned in the OAuth providers' `profile` callback,
	 * or the second parameter of the `session` callback, when using a database.
	 *
	 * Currently: Only Google OAuth Profile
	 */
	interface User {
		email: string
		// firstName?: string;
		// lastName?: string;
		name: string
		// type?: 'USER' | 'ADMIN',
		// completionStatus?: 'COMPLETE' | 'INCOMPLETE';
		createdAt: Date
		emailVerified?: Date
		image?: string
		isBanned?: boolean
	}
	/**
	 * Usually contains information about the provider being used
	 * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
	 */
	interface Account {}
	/** The OAuth profile returned from your provider */
	interface Profile {}
}

declare module "next-auth/jwt" {
	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
	interface JWT {
		/** OpenID ID Token */
		idToken?: string
		email: string
		completionStatus: "COMPLETE" | "INCOMPLETE"
		userType: "USER" | "ADMIN"
		isBanned?: boolean
		sub: string
	}
}
