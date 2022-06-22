import ReleaseAction from "@models/database/releaseAction"

export const createReleaseAction = async ({
	releaseId,
	userId,
	type,
}: {
	releaseId: string
	userId: string
	type: "APPROVED" | "REJECTED" | "ACTION_NEEDED"
}) => {
	try {
		await ReleaseAction.create({
			release: releaseId,
			user: userId,
			time: new Date(),
			type,
		})
	} catch (e) {
		console.log("Error at creating Release Action:", e)
	}
}
