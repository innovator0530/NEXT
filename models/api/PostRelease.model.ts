import { ArtistType } from "../../context/CreateReleaseState/models/ArtistState.model"
import {
	BeatFile,
	BeatLink,
} from "../../context/CreateReleaseState/models/BeatLinkOrFile.model"
import { Language } from "../options/languages"
import { PriceCategory } from "../options/priceCategories"
import { Store } from "../options/stores"

export interface PostRelease {
	/**
	 * @minLength 1
	 */
	title: string
	/**
	 * @minLength 1
	 */
	labelId: string
	/**
	 * @minLength 1
	 */
	coverUrl: string
	artists: { type: ArtistType; id: string }[]
	genres: {
		/**
		 * @minLength 1
		 */
		primaryGenre: string
		secondaryGenre: string | null
	}
	language: Language
	releaseDates: {
		/**
		 * @minLength 1
		 */
		digital: string
		/**
		 * @minLength 1
		 */
		original: string
	}
	priceCategory: PriceCategory
	explicitLyrics: boolean
	copyright: {
		year: number
		/**
		 * @minLength 1
		 */
		owner: string
	}
	publishingRights: {
		year: number
		/**
		 * @minLength 1
		 */
		owner: string
	}
	/**
	 * @minLength 1
	 */
	upc: string
	tracks: {
		/**
		 * @minLength 1
		 */
		title: string
		/**
		 * @minLength 1
		 */
		labelId: string
		artists: {
			type: ArtistType
			/**
			 * @minLength 1
			 */
			id: string
		}[]
		/**
		 * @minLength 1
		 */
		fileUrl: string
		genres: {
			/**
			 * @minLength 1
			 */
			primary: string
			secondary: string
		}
		language: Language
		metadataLanguage: Language
		explicitLyrics: boolean
		publishingRights: {
			year: number
			/**
			 * @minLength 1
			 */
			owner: string
		}
		/**
		 * @minLength 1
		 */
		isrc: string,
		duration?:number
	}[]

	stores: Store[]

	beatLinksOrFiles: (BeatLink | BeatFile)[]
}
