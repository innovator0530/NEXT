import Artist from "@models/database/artist";
import { IDBReleaseArtist } from "@models/database/release/Artist";
import { FEATURING_ARTIST, PRIMARY_ARTIST } from "@models/options/artistTypes";
import { ArtistType } from "context/CreateReleaseState/models/ArtistState.model";

export const getArtistsString = (
	selectedArtists: {
		type:ArtistType,
		artist:{name:string}
	}[]
): string => {
	const primaryArtists = selectedArtists
		.filter((a) => a.type === "primary")
		.map((a) => a.artist.name)
		.join(",")
	const featuringArtists = selectedArtists
		.filter((a) => a.type === "featuring")
		.map((a) => a.artist.name)
		.join(",")
	return primaryArtists + (featuringArtists ? " feat. " + featuringArtists : "")
}

export const getArtistsStringForRelease = async  (artists:IDBReleaseArtist[]):Promise<string>=>{
    // Filter for primary and featuring artists
    const pasArtists = artists.filter(a=>(a.type===PRIMARY_ARTIST||a.type===FEATURING_ARTIST))
    const artistsPopulated:{type:ArtistType,artist:{name:string}}[] = [];
    for(let i=0; i<pasArtists.length;  i++){
        artistsPopulated.push({
            type:pasArtists[i].type,
            artist:{
                name:(await Artist.findOneById(pasArtists[i].artistId.toString())).name
            }
        })
    }
    return getArtistsString(artistsPopulated);
}