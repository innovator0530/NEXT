import { CreateReleaseState } from "./models/CreateReleaseState.model"
import { ArtistType } from "./models/ArtistState.model"
import { LabelState } from "./models/LabelState.model"
import { Language } from "../../models/options/languages"
import { PriceCategory } from "../../models/options/priceCategories"

export type CreateReleaseContextType = CreateReleaseState & {
	setTitle?: (title: string) => void
	goToEditLabel?: (labelId?: string | null) => any
	setLabel?: (label) => any
	coverFileSelected?: () => any
	coverFileRead?: (localDataURL: string) => any
	coverFileUploaded?: (
		valid: boolean,
		url: string,
		validationMessage?: string | null
	) => any
	addArtist?: () => void
	removeLastArtist?: () => void
	setArtist?: (index: number, artistId: string) => void
	setArtistType?: (index: number, artistType: ArtistType | null) => void
	goToEditArtist?: (artistId?: string) => void
	setPrimaryGenre?: (genre: string) => void
	setSecondaryGenre?: (genre: string) => void
	page1GoToNext?: () => void

	// Edit Artist
	editArtistSave?: () => void
	editArtistSetName?: (name: string) => void
	editArtistSetSpotifyId?: (spotifyId: string) => void
	editArtistSetSpotifyLink?: (spotifyLink: string) => void
	editArtistSetCreateNewSpotifyProfile?: (createNewSpotifyProfile: boolean)=>void
	editArtistSetAppleMusicId?: (appleMusicId: string) => void
	editArtistSetCreateNewAppleMusicProfile?: (createNewAppleMusicProfile: boolean)=>void
	editArtistCancel?: () => void

	// Edit Label
	editLabelSetName?: (name: string) => void
	editLabelSave?: () => void
	editLabelCancel?: () => void

	// Page 2
	setLanguage?: (language: Language) => void
	setOriginalReleaseDate?: (date: Date) => void
	setDigitalReleaseDate?: (date: Date) => void
	setPriceCategory?: (cat: PriceCategory) => void
	setExplicitLyrics?: (explicit: boolean) => void
	setCopyrightYear?: (year: number) => void
	setPublishingRightsYear?: (year: number) => void
	setCopyrightOwner?: (owner: string) => void
	setPublishingRightsOwner?: (owner: string) => void
	setUPC?: (upc: string) => void
	page2GoToNext?: () => void
	page2GoBack?: () => void

	// Page 3
	trackSelectFiles?: (files: File[]) => void
	trackSwitchPosition?: (srcIndex: number, targetIndex?: number) => void
	deleteTrack?: (index: number) => void
	goToEditTrack?: (index: number) => void
	page3GoBack?: () => void
	page3GoToNext?: () => void

	// Edit Track
	trackSetTitle?: (title: string) => void
	trackSetLabel?: (label: LabelState) => void
	trackSetArtist?: (index: number, artistId: string) => void
	trackSetArtistType?: (index: number, artistType: ArtistType) => void
	trackAddArtist?: () => void
	trackRemoveLastArtist?: () => void
	trackGoToEditArtist?: (artistId?: string) => void
	trackSetPrimaryGenre?: (genre: string) => void
	trackSetSecondaryGenre?: (genre: string) => void
	trackSetLanguage?: (language: Language) => void
	trackSetMetadataLanguage?: (language: Language) => void
	trackSetExplicitLyrics?: (explicitLyrics: boolean) => void
	trackSetPublishingRightsYear?: (year: number) => void
	trackSetPublishingRightsOwner?: (owner: string) => void
	trackSetISRC?: (isrc: string) => void
	editTrackCancel?: () => void
	editTrackSave?: () => void
	trackGoToEditLabel?: (labelId?: string | null) => void

	// Page 4
	page4GoBack?:()=>void
	page4GoToPage1?:()=>void
	goToEditStores?:()=>void
	editStoresSave?:()=>void
	editStoresCancel?:()=>void
	setAllStores?:()=>void
	addStore?:(storeId:string)=>void
	removeStore?:(storeId:string)=>void
	addBeatLink?:()=>void
	setBeatLink?:(index:number, link:string)=>void
	addBeatFile?:(file:File)=>void
	removeLastBeatFileOrLink?:()=>void
	setConfirmBeatsOriginal?:(original:boolean)=>void

	submitRelease?:()=>void;

	saveAsDraft?:()=>void;

}
