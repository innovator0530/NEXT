import { ensureSubgenreExists } from "@lib/fuga/subgenres"
import { mainGenresWithIds } from "@models/options/genres"

export const genreToIdAndSubgenre = (
	genre: string
): { mainGenre: { id: string; name: string }; subGenre: string } => {
	const mainGenre = mainGenresWithIds.find(
		(g) => g.name === genre.substring(0, g.name.length)
	)
	if (!mainGenre) {
		throw new Error("Main Genre not found")
	}
	const subGenre = genre.substring(mainGenre.name.length + 1)
	return {
		mainGenre,
		subGenre,
	}
}

// Converts Genres in FUGA format and creates subgenres if they exist

interface ManageProductGenresResult {
	primaryGenreId: string
	primarySubgenreId?: number
	secondaryGenreId?: string
	secondarySubgenreId?: number
}
export const manageProductGenres = async (
	primaryGenre: string,
	secondaryGenre?: string
): Promise<ManageProductGenresResult> => {
	const {
		mainGenre: { id: primaryGenreId },
		subGenre: primarySubgenre,
	} = genreToIdAndSubgenre(primaryGenre)
	const result: ManageProductGenresResult = { primaryGenreId }
	if (primarySubgenre.length > 1) {
		result.primarySubgenreId =  (await ensureSubgenreExists(primarySubgenre)).subgenreId;
	}

	if (
		secondaryGenre &&
		typeof secondaryGenre === "string" &&
		secondaryGenre.length > 1
	) {
		try {
			const {
				mainGenre: { id: secondaryGenreId },
				subGenre: secondarySubgenre,
			} = genreToIdAndSubgenre(secondaryGenre)
			result.secondaryGenreId = secondaryGenreId
			if (
				secondarySubgenre &&
				typeof secondarySubgenre === "string" &&
				secondarySubgenre.length > 1
			) {
				result.secondarySubgenreId =(await ensureSubgenreExists(secondarySubgenre)).subgenreId;
			}
		} catch (e) {}
	}
	return result
}
