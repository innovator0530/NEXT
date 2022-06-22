export interface BeatLinkOrFile {}

export interface BeatLink extends BeatLinkOrFile {
	type: "LINK"
	link: string
}

export interface BeatFile extends BeatLinkOrFile {
	type: "FILE"
	name: string
	url: string
	resolvedUrl?: string
}
