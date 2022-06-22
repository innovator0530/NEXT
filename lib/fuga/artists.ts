import { fetchFuga } from "./fuga"

export const createArtist = async (
	artistName: string,
	rewaveDbId: string
): Promise<{ newId: number }> => {
	const body: any = { name: artistName, proprietary_id: rewaveDbId }
	const { data } = await fetchFuga("/artists", "POST", body)
	if (typeof data?.id !== "number") {
		throw new Error("Creating artist failed")
	}
	return { newId: data.id }
}

const SPOTIFY_ORG_ID = 746109
const SPOTIFY_ID_PREFIX = "spotify:artist:"
const APPLE_MUSIC_ORG_ID = 1330598

export const addArtistDSPIdentifier = async (
	fugaArtistId: number,
	dspOrgId: number,
	dspName: string,
	identifier: string
) => {
	const { data } = await fetchFuga(
		`/artists/${fugaArtistId}/identifier`,
		"POST",
		{}
	)
}

export const setArtistSpotifyId = (
	fugaArtistId: number,
	spotifyId: string,
	newForIssuingOrg: boolean
) =>
	setArtistDSPIdentifier(
		fugaArtistId,
		SPOTIFY_ORG_ID,
		SPOTIFY_ID_PREFIX + spotifyId,
		newForIssuingOrg
	)

export const setArtistAppleMusicId = (
	fugaArtistId: number,
	appleMusicId: string,
	newForIssuingOrg: boolean
) =>
	setArtistDSPIdentifier(
		fugaArtistId,
		APPLE_MUSIC_ORG_ID,
		appleMusicId,
		newForIssuingOrg
	)

export const setArtistDSPIdentifier = async (
	fugaArtistId: number,
	dspOrgId: number,
	dspIdentifier: string, // empty to delete
	newForIssuingOrg: boolean
) => {
	const { data } = await fetchFuga(`/artists/${fugaArtistId}/identifier`)
	if (!Array.isArray(data)) {
		console.log(`data`, data)
		throw new Error("data should be an array")
	}
	const existingIdentifier = data.find(
		(o) => o?.issuingOrganization?.id === dspOrgId
	)
	if (existingIdentifier) {
		// Org already exists with artist -> update
		if (!dspIdentifier && !newForIssuingOrg) {
			await fetchFuga(
				`/artists/${fugaArtistId}/identifier/${existingIdentifier?.id}`,
				"DELETE"
			)
		} 
		else if(!existingIdentifier.newForIssuingOrg && newForIssuingOrg){
			// Special case: cannot PUT "newForIssuingOrg:true" if it was false before, so delete and create new
			await fetchFuga(
				`/artists/${fugaArtistId}/identifier/${existingIdentifier?.id}`,
				"DELETE"
			)
			const body: {
				newForIssuingOrg: boolean
				identifier?: string
				issuingOrganization: number
			} = newForIssuingOrg
				? {
						newForIssuingOrg: true,
						issuingOrganization: dspOrgId,
				  }
				: {
						newForIssuingOrg: false,
						issuingOrganization: dspOrgId,
						identifier: dspIdentifier,
				  }
			console.log("body (POST identifier)", body)
			await fetchFuga(`/artists/${fugaArtistId}/identifier`, "POST", body)
		}
		else {
			const body: { newForIssuingOrg: boolean; identifier?: string,issuingOrganization:number } =
				newForIssuingOrg
					? {
							newForIssuingOrg: true,
							issuingOrganization: dspOrgId
					  }
					: { newForIssuingOrg: false, identifier: dspIdentifier, issuingOrganization: dspOrgId }
			console.log("body (PUT identifier)", body)
			await fetchFuga(
				`/artists/${fugaArtistId}/identifier/${existingIdentifier?.id}`,
				"PUT",
				body
			)
		}
	} else if(newForIssuingOrg || dspIdentifier) {
		// Org does not exist -> create
		const body: {
			newForIssuingOrg: boolean
			identifier?: string
			issuingOrganization: number
		} = newForIssuingOrg
			? {
					newForIssuingOrg: true,
					issuingOrganization: dspOrgId,
			  }
			: {
					newForIssuingOrg: false,
					issuingOrganization: dspOrgId,
					identifier: dspIdentifier,
			  }
		console.log("body (POST identifier)", body)
		await fetchFuga(`/artists/${fugaArtistId}/identifier`, "POST", body)
	}
}

export const deleteArtist = async (id: number): Promise<void> => {
	await fetchFuga(`/artists/${id}`, "DELETE")
}

export const renameArtist = async (
	fugaId: number,
	newName: string
): Promise<void> => {
	await fetchFuga(`/artists/${fugaId}`, "PUT", {
		name: newName,
	})
}
