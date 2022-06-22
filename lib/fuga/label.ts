import Label from "@models/database/label"
import { fetchFuga } from "./fuga"

export const createLabel = async (labelName: string) => {
	await fetchFuga(`/labels`, "POST", {
		name: labelName,
	})
}

export const deleteLabel = async (fugaLabelId: number) => {
	await fetchFuga(`/labels/${fugaLabelId}`, "DELETE")
}

export const findLabelIdFromFuga = async (
	labelName: string
): Promise<number> => {
	const { data } = await fetchFuga(
		`/labels?search=${labelName.trim()}`,
		"GET",
		null,
		false,
		{},
		"v2"
	)
	console.log("data", data)
	// console.log(`Searching Labels in FUGA results`, data)
	const label = data?.label?.find(
		(l) => l.name.toLowerCase().trim() === labelName.toLowerCase().trim()
	)
	if (!label) {
		throw new Error("Label not found!")
	} else {
		return label.id as number
	}
}

export const confirmLabelExistsAtFuga = async (
	labelId: number
): Promise<boolean> => {
	try {
		const { data } = await fetchFuga(`/labels/${labelId}`)
		if (!data || !data.name) {
			console.log(`data`, data)
			throw new Error("invalid response")
		} else {
			return true
		}
	} catch (e) {
		console.log(`e`, e)
		return false
	}
}
