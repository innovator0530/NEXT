import { hashPassword, validatePasswordHash } from "@lib/password"
import {
	EmailVerifiedStatusResult,
	IDBUser,
	IUserDocument,
	IUserModel,
	UserMethodResult,
} from "./interface"

const USER_ALREADY_EXISTS_ERROR = "USER_ALREADY_EXISTS"
const USER_CREDENTIALS_INVALID_ERROR = "USER_CREDENTIALS_INVALID"
const USER_NO_PASSWORD_AVAILABLE_ERROR = "USER_NO_PASSWORD_AVAILABLE"
const USER_NOT_FOUND_ERROR = "USER_NOT_FOUND"
const USER_WRONG_VERFICATION_CODE_ERROR = "USER_WRONG_VERIFICATION_CODE"
const USER_BANNED_ERROR = "USER_BANNED"

// virtuals

export function userGetId(this: IUserDocument) {
	return this._id.toString()
}

export function userGetFullName(this: IUserDocument): string | null {
	if (this.firstName || this.lastName) {
		return this.firstName + " " + this.lastName
	} else {
		return null
	}
}

// methods

// statics

export async function userFindOneById(
	this: IUserModel,
	id: string,
	projection?: any
): Promise<IUserDocument | null> {
	return await this.findOne({ _id: id }, projection)
}

export async function userFindOneByEmail(
	this: IUserModel,
	email: string,
	projection?: any
): Promise<IUserDocument | null> {
	return await this.findOne(
		{ email: { $regex: `^${email}$`, $options: "i" } },
		projection
	)
}

export async function userLogin(
	this: IUserModel,
	email: string,
	password: string
): Promise<UserMethodResult & { user: IUserDocument | null }> {
	const user = await this.findOneByEmail(email)

	if (!user) {
		return {
			successful: false,
			exceptionCode: USER_CREDENTIALS_INVALID_ERROR,
			exceptionMessage: "The provided credentials are invalid",
			user: null,
		}
	} else if (!user.passwordHash) {
		return {
			successful: false,
			exceptionCode: USER_NO_PASSWORD_AVAILABLE_ERROR,
			exceptionMessage:
				'Login via E-Mail/Password not possible. Please use "Forgot my password" and try again.',
			user: null,
		}
	} else if (user.status === "BANNED") {
		return {
			successful: false,
			exceptionCode: USER_BANNED_ERROR,
			exceptionMessage: "Your account has been temporarily disabled",
			user: null,
		}
	} else if (await validatePasswordHash(password, user.passwordHash)) {
		return {
			successful: true,
			user,
		}
	} else {
		return {
			successful: false,
			exceptionCode: USER_CREDENTIALS_INVALID_ERROR,
			exceptionMessage: "The provided credentials are invalid",
			user: null,
		}
	}
}

export async function userRegisterDefault(
	this: IUserModel,
	firstName: string,
	lastName: string,
	email: string,
	password: string,
	instagram?: string
): Promise<UserMethodResult> {
	try {
		const usersWithThisEmail = await this.find({
			email: { $regex: `^${email}$`, $options: "i" },
		})
		if (usersWithThisEmail.length > 0) {
			return {
				successful: false,
				exceptionCode: USER_ALREADY_EXISTS_ERROR,
				exceptionMessage: "A user with this E-Mail already exists.",
			}
		}
		const user = new this()
		user.firstName = firstName
		user.lastName = lastName
		user.email = email
		user.passwordHash = await hashPassword(password)
		if (instagram) user.instagram = instagram
	} catch (e: any) {
		if (e?.code === 11000 && e?.keyPattern.email == 1) {
			return {
				successful: false,
				exceptionCode: USER_ALREADY_EXISTS_ERROR,
				exceptionMessage: "A user with this E-Mail already exists.",
			}
		} else {
			console.log(`e`, e)
			return {
				successful: false,
				exceptionCode: "" + (e.code || "ERROR"),
				exceptionMessage: e?.message || "Something went wrong",
			}
		}
	}
	return {
		successful: true,
	}
}

export async function userCreateFromNextAuth(
	this: IUserModel,
	email: string,
	name: string,
	emailVerified?: Date,
	image?: string
): Promise<IUserDocument> {
	const user = new this()
	user.email = email
	user.name = name
	user.emailVerified = emailVerified
	if (image) user.image = image
	await user.save()

	return user
}

export async function userVerifyEmail(
	this: IUserModel,
	email: string,
	token: string
): Promise<UserMethodResult> {
	const user = await this.findOneByEmail(email)
	if (!user) {
		return {
			successful: false,
			exceptionCode: USER_NOT_FOUND_ERROR,
			exceptionMessage: "User not found",
		}
	}
	if (user.emailVerificationCode === token) {
		user.emailStatus = "OK"
		user.emailVerificationCode = ""
		await user.save()
		return { successful: true }
	} else {
		return {
			successful: false,
			exceptionCode: USER_WRONG_VERFICATION_CODE_ERROR,
			exceptionMessage:
				'Wrong verification code. Please try again by clicking "Forgot your password?"',
		}
	}
}

export async function userIsEmailVerified(
	this: IUserModel,
	email: string,
	password: string
): Promise<{ status: EmailVerifiedStatusResult }> {
	const user = await this.findOneByEmail(email)

	if (!user) {
		return { status: "INVALID_CREDENTIALS" }
	} else if (!user.passwordHash) {
		return { status: "FORCE_RESET_PASSWORD" }
	} else if (!(await validatePasswordHash(password, user.passwordHash))) {
		return { status: "INVALID_CREDENTIALS" }
	} else if (user.emailStatus === "OK") {
		return { status: "VERIFIED" }
	} else if (user.emailStatus === "VERIFICATION_NEEDED") {
		return { status: "VERIFICATION_NEEDED" }
	} else if (user.emailStatus === "FORCE_PASSWORD_RESET") {
		return { status: "FORCE_RESET_PASSWORD" }
	} else {
		return { status: "UNEXPECTED_ERROR" }
	}
}
