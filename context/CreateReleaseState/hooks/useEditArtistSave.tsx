import { server } from "../../../config"
import { CreateReleaseDispatch } from "../CreateReleaseState"
import { CreateReleaseState } from "../models/CreateReleaseState.model"

const isAppleMusicIdValid = (id: string): boolean => {

	return !id
		.split("")
		.reduce((acc, curr) => acc && isNaN(parseInt(curr)), false)

}

export const useEditArtistSave = (
	state: CreateReleaseState,
	dispatch: CreateReleaseDispatch
) => {
	const save = async () => {
		dispatch({ type: "EDIT_ARTIST_SAVE" })
		try {
			const artistToEdit = state.artists.artistToEdit
			console.log(`artistToEdit`, artistToEdit)
			if (!artistToEdit) {
				throw new Error("No Artist to edit!")
			}
			if (
				state.artists.artistToEdit.appleMusicId &&
				!isAppleMusicIdValid(state.artists.artistToEdit.appleMusicId)
			) {
				throw new Error(
					"The Apple Music Artist ID is 10 numbers long and you can find it at the end of the artist link. Example: https://music.apple.com/ch/artist/luciano/1168706047"
				)
			}
			// Validate Spotify - need either "Spotify ID" or "create new spotify profile"
			if (
				!state.artists.artistToEdit.spotifyId &&
				!state.artists.artistToEdit.createNewSpotifyProfile
			) {
				throw new Error(
					'Please input a spotify account ID or click "Create a new Spotify profile".'
				)
			}

			const method = artistToEdit.isNew ? "POST" : "PUT"
			let url = `${server}/api/releases/artists`
			if (!artistToEdit.isNew) url += `/${artistToEdit.id}`
			if (state.existingDraftId) {
				url += `?release_id=${state.existingDraftId}`
			}

			const createNewSpotifyProfile = !!artistToEdit.createNewSpotifyProfile
			const createNewAppleMusicProfile =
				!!artistToEdit.createNewAppleMusicProfile
			const result = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: state.artists.artistToEdit.name,
					spotifyId: createNewSpotifyProfile
						? null
						: state.artists.artistToEdit.spotifyId,
					spotifyLink: createNewSpotifyProfile
						? null
						: state.artists.artistToEdit.spotifyLink,
					createNewSpotifyProfile,
					appleMusicId: createNewAppleMusicProfile
						? null
						: state.artists.artistToEdit.appleMusicId,
					createNewAppleMusicProfile,
				}),
			})

			const json = await result.json()
			if (result.status !== 200) throw new Error(json?.message)
			if (json.artists && Array.isArray(json.artists)) {
				dispatch({
					type: "EDIT_ARTIST_SAVE_FINISHED",
					updatedArtists: json.artists,
				})
			} else {
				throw new Error(json?.message)
			}
		} catch (e) {
			console.log(e)
			dispatch({ type: "EDIT_ARTIST_SAVE_FAILED", errorMessage: e.message })
		}
	}
	return save
}
