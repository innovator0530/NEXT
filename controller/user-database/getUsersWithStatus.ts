import User from "@models/database/user"
import { IUserDocument } from "@models/database/user/interface"

export const getUsersByStatus = async (
	status: "APPROVAL_NEEDED" | "BANNED",
	projection = { firstName: 1, lastName: 1, email: 1 }
): Promise<Partial<IUserDocument>[]> => {
	const users = await User.find({ status }, projection).sort({ createdAt: -1 })

	return users.map((u) => ({ ...u.toObject(), _id: u._id.toString() }))
}
