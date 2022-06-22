import fetch from "cross-fetch"
import { FormDataEncoder } from "form-data-encoder"
import { FormData } from "formdata-node"
import { Readable } from "stream"

declare var global
const FUGA_HOST = process.env.FUGA_HOST
const FUGA_USERNAME = process.env.FUGA_USERNAME
const FUGA_PASSWORD = process.env.FUGA_PASSWORD

export class FugaError extends Error {
	constructor(
		msg: string,
		public fugaErrMsg: string,
		public code: string,
		public path: string,
		public statusCode: number
	) {
		super(msg)

		// Set the prototype explicitly.
		Object.setPrototypeOf(this, FugaError.prototype)
	}
}

export const ensureFugaLogin = async () => {
	if (
		!global.fugaAccessToken ||
		!global.fugaCookieVal ||
		!global.fugaCookieExpires ||
		Date.now() >= global.fugaCookieExpires.getTime()
	) {
		if (!FUGA_USERNAME || !FUGA_PASSWORD) {
			throw new Error("FUGA_USERNAME or FUGA_PASSWORD in env missing!")
		}
		const result = await fetchFuga(
			"/login",
			"POST",
			{ name: FUGA_USERNAME, password: FUGA_PASSWORD, secure: true },
			true
		)
		const setCookieHeader = result.headers.get("set-cookie")
		const cookieHeaderParsed: any = setCookieHeader
			?.split(";")
			.reduce((acc, curr) => {
				const parts = curr.split("=")
				return parts.length < 2
					? acc
					: { ...acc, [parts[0].trim()]: decodeURIComponent(parts[1].trim()) }
			}, {})

		if (!cookieHeaderParsed["connect.sid"] || !cookieHeaderParsed.Expires) {
			throw new Error("Invalid Set cookie!")
		}

		global.fugaCookieExpires = new Date(cookieHeaderParsed.Expires)
		global.fugaCookieVal = cookieHeaderParsed["connect.sid"]

		// Set Csrf Token
		if (!result.data.token) {
			throw new Error("No token after login!")
		} else {
			global.fugaCsrfToken = result.data.token
		}
	}
}

type FugaApiVersion = "v1" | "v2"

export const fetchFuga = async (
	path: string,
	method: RequestInit["method"] = "GET",
	body?: any | null,
	noAuth?: boolean,
	headers: any = {},
	apiVersion: FugaApiVersion = "v1"
): Promise<{
	data: any
	headers?: Response["headers"]
	statusCode: number
}> => {
	if (!FUGA_HOST) {
		throw new Error("Fuga Base URL missing (process.env.FUGA_BASE_URL)")
	}

	// Default Headers
	headers.Accept = "application/json"
	if (apiVersion === "v2") {
		headers.Host = "next.fugamusic.com"
	}
	// Add token
	if (!noAuth) {
		await ensureFugaLogin()
		headers["x-csrf-token"] = global.fugaCsrfToken
		headers["cookie"] = `connect.sid=${global.fugaCookieVal}`
	}
	// Request Options
	const init: RequestInit = {
		method,
		headers,
	}
	// Add body if available
	if (body) {
		headers["Content-Type"] = "application/json"
		init.body = JSON.stringify(body)
	}
	const fugaBaseUrl = `${FUGA_HOST}/api/${apiVersion}`
	let url = `${fugaBaseUrl}${path}`
	// console.log("url", url)
	// console.log("headers", headers)
	const fetchResult = await fetch(url, init)

	let json: any
	let clonedResponse
	if (Math.floor(fetchResult.status / 100) !== 2) {
		console.log("Cloning Response!!!")
		clonedResponse = await fetchResult.clone()
	}
	try {
		json = await fetchResult.json()
	} catch (e) {}
	if (Math.floor(fetchResult.status / 100) !== 2) {
		console.log("=== FUGA ERROR RESPONSE === ")
		console.log("method", method)
		if (json) {
			console.log(method, url)
			console.log(`json`, json)
			throw new FugaError(
				"FUGA API call failed! with Status" + fetchResult.status,
				json.message,
				json.code,
				path,
				fetchResult.status
			)
		} else {
			try {
				console.log("await clonedResponse.text()", await clonedResponse.text())
			} catch (e) {
				console.log("e", e)
			}
			console.log("response.headers", fetchResult.headers)
			console.log("url", url)
			// console.log(`responseBody`, responseBody)
			throw new Error("FUGA API call failed! with Status" + fetchResult.status)
		}
	}
	// console.log("fetchResult.status", fetchResult.status)
	if (fetchResult.status !== 200) {
		console.log("[WARNING]: fetchFuga result status is :", fetchResult.status)
	}
	return {
		data: json,
		headers: fetchResult.headers,
		statusCode: fetchResult.status,
	}
}
