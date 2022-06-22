import { fetchFuga, FugaError } from "@lib/fuga/fuga"
import { findLabelIdFromFuga, confirmLabelExistsAtFuga } from "@lib/fuga/label"
import Label from "@models/database/label"

export const isLabelEditable = async (labelId: string): Promise<boolean> => {
	const label = await Label.findOne({ _id: labelId })
	return label.editable
}

export const changeLabelName = async (
	labelId: string,
	name: string
): Promise<void> => {
	if (!(await isLabelEditable(labelId))) {
		// console.log(`labelId`, labelId)
		throw new Error("Label is not editable")
	}
	await Label.updateOne({ _id: labelId }, { $set: { name } })
}

// Create Label at Fuga and make it uneditable
export const labelDeployToFuga = async (
	labelId: string
): Promise<{ fugaLabelId: number }> => {
	const label = await Label.findOne({ _id: labelId })

	let data
	let fugaLabelId: number
	try {
		data = (
			await fetchFuga(`/labels`, "POST", {
				name: label.name,
			})
		)?.data
		if (!data?.id) {
			console.log(`data`, data)
			throw new Error("Did not receive FUGA Label ID")
		}
		fugaLabelId = data.id
	} catch (e) {
		// Label already exists at Fuga, trying to retrieve the existing ID
		if (
			e instanceof FugaError &&
			(e as FugaError).code === "DUPLICATE_LABEL_NAME"
		) {
			fugaLabelId = await findLabelIdFromFuga(label.name)
		} else {
			throw e
		}
	}

	await Label.updateOne(
		{ _id: labelId },
		{ $set: { editable: false, fugaId: fugaLabelId } }
	)
	return {
		fugaLabelId: fugaLabelId,
	}
}

export const getFugaLabelId = async (labelId: string): Promise<number> => {
	const label = await Label.findOneById(labelId)
	const labelName = label.name
	let fugaLabelId = label.fugaId
	if (!fugaLabelId) {
		// finds all labels with this label in the rewave db name but case insensitive and trim whitespace characters
		const labelsWithSameName = await Label.find({
			name: { $regex: `^\\s*${labelName}\\s*$`, $options: "i" },
		})
		const withId = labelsWithSameName.find((l) => !!l.fugaId)
		if (withId) {
			fugaLabelId = withId.fugaId
		}
	}

	if (fugaLabelId && (await confirmLabelExistsAtFuga(fugaLabelId))) {
		return fugaLabelId
	} else {
		const { fugaLabelId: fugaId } = await labelDeployToFuga(labelId)
		return fugaId
	}
}
