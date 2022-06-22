declare global {
	namespace NodeJS {
		interface ProcessEnv {
			// Hostname
			SERVER_BASE_URL: string

			// Database
			MONGODB_CONNECTION_STRING: string

			// Email Sending
			EMAIL_SERVER_HOST: string
			EMAIL_SERVER_PORT: string
			EMAIL_SERVER_USER: string
			EMAIL_SERVER_PASSWORD: string
			EMAIL_FROM: string

			// File Storage
			STORAGE_BUCKET_ENDPOINT: string
			STORAGE_BUCKET_NAME: string
			ARCHIVE_BUCKET_URL: string
			ARCHIVE_BUCKET_NAME: string
			TEMP_ASSET_URL_PREFIX: string
			STORAGE_ASSETS_DIR_NAME: string

			AWS_ACCESS_KEY_ID: string
			AWS_SECRET_ACCESS_KEY: string

			DO_SPACES_ACCESS_KEY_ID: string
			DO_SPACES_SECRET_ACCESS_KEY: string

			// Auth
			GOOGLE_OAUTH_ID: string
			GOOGLE_OAUTH_SECRET: string
			NEXTAUTH_URL: string
			NEXTAUTH_URL_INTERNAL: string
			NEXTAUTH_SECRET: string
			EMAIL_VERIFICATION_LINK_HOST: string

			// FUGA
			NEXT_PUBLIC_FUGA_IS_PRODUCTION: "true" | "false"
			FUGA_BASE_URL: string
			FUGA_HOST: string
			FUGA_USERNAME: string
			FUGA_PASSWORD: string
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
