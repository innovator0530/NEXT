import { fetchFuga } from "./fuga"
import { ArtistType } from "context/CreateReleaseState/models/ArtistState.model"

export const createPerson = async (
	name: string
): Promise<{ personId: number }> => {
	const { data } = await fetchFuga(`/people`, "POST", { name })
	if (!data?.id || typeof data?.id !== "number") {
		console.log(`data`, data)
		throw new Error("Creating Person failed. No Id returned")
	}
	return { personId: data.id }
}

export const findPersonIdByName = async (
	name: string
): Promise<{ personId: number } | null> => {
	const url = `/people?page=0&page_size=10&search=${encodeURIComponent(
		name.trim()
	)}`
	console.log("url", url)
	const { data } = await fetchFuga(url, "GET", null, false, {}, "v2")
	console.log("data", data)
	const foundPerson = data?.person?.find(
		(p) => p.name.toLowerCase().trim() === name.toLowerCase().trim()
	)
	if (foundPerson) {
		return { personId: foundPerson.id }
	} else {
		return null
	}
}

type ContributorType =
	| "ACTOR"
	| "ARRANGER"
	| "COMPOSER"
	| "ENGINEER"
	| "FEATURING"
	| "LYRICIST"
	| "MIXER"
	| "ORCHESTRA"
	| "PRODUCER"
	| "REMIXER"
const contributorTypes = [
	"ACTOR",
	"ARRANGER",
	"COMPOSER",
	"ENGINEER",
	"FEATURING",
	"LYRICIST",
	"MIXER",
	"ORCHESTRA",
	"PRODUCER",
	"REMIXER",
]

export const artistTypeToContributorType = (
	artistType: ArtistType
): ContributorType => {
	if (artistType === "primary" || artistType === "featuring") {
		throw new Error("primary or featuring artist should not be a contributor")
	}
	if (artistType === "with") {
		return "FEATURING"
	} else {
		const uppercase = artistType.toUpperCase()
		if (contributorTypes.includes(uppercase)) {
			return uppercase as ContributorType
		} else {
			console.log(`artistType`, artistType)
			throw new Error("Provided Artist type is not a valid Contributor Type")
		}
	}
}

export const addContributorToAsset = async (
	assetId: number,
	personId: number,
	contributorType: ContributorType
): Promise<void> => {
	await fetchFuga(`/assets/${assetId}/contributors`, "POST", {
		person: personId,
		role: contributorType,
	})
}
