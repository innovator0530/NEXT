export interface Store {
	name: string
	id: string
}
const storesDevelopment: Store[] = [
	"Apple Music (Demo) 2",
	"Spotify (Demo) 2",
].map((s) => ({ name: s, id: s.toUpperCase() }))

export const YOUTUBE_MUSIC: Store = {
	id: "YOUTUBE MUSIC",
	name: "YouTube Music",
}
export const YOUTUBE_CONTENT_ID: Store = {
	id: "YOUTUBE CONTENT ID",
	name: "YouTube Content ID",
}
export const YOUTUBE_MUSIC_AND_CONTENT_ID: Store = {
	id: "YOUTUBE MUSIC & CONTENT ID",
	name: "Youtube Music & Content ID",
}
export const BEATPORT: Store = { id: "BEATPORT", name: "Beatport" }
export const FACEBOOK_INSTAGRAM: Store = {
	id: "FACEBOOK/INSTAGRAM",
	name: "Facebook/Instagram",
}
export const FACEBOOK_FINGERPRINTING: Store = {
	id: "FACEBOOK FINGERPRINTING",
	name: "Facebook Fingerprinting",
}
export const FACEBOOK_AUDIO_LIBRARY: Store = {
	id: "FACEBOOK AUDIO_LIBRARY",
	name: "Facebook Audio Library",
}

export const HUNGAMA_AND_WYNK: Store = { name: "Hungama & Wynk", id: "HUNGAMA" }

const storesProduction: Store[] = [
	...[
		"Zing MP3",
		"YouTube Music",
		"YouTube Content ID",
		"Yandex Music",
		"United Media Agency (UMA)",
		"Triller",
		"TouchTunes / PlayNetwork",
		"TIM Music",
		"TikTok",
		"TIDAL",
		"Tencent",
		"Spotify",
		"SoundCloud",
		"Slacker",
		"Shazam",
		"Resso",
		"Qobuz",
		"Pretzel Rocks",
		"Peloton",
		"Pandora",
		"Nuuday A/S",
		"NetEase Cloud Music",
		"Napster",
		"Muska",
		"Music in 'Ayoba'",
		"MonkingMe",
		"MePlaylist",
		"LINE Music",
		"Kuack Media",
		"KkBox",
		"Joox",
		"JioSaavn",
		"Jaxsta Music",
		"iMusica",
		"iHeartRadio",
		"Gracenote",
		"Genie Music",
		"fizy",
		"Facebook/Instagram",
		"Dreamus Company (FLO)",
		"Deezer",
		"Boomplay",
		"Bmat",
		"AWA",
		"Anghami",
		"Ami Entertainment",
		"Amazon",
		"7Digital",
		"Apple Music",
		"Beatport",
	].map((s) => ({ name: s, id: s.toUpperCase() })),
	HUNGAMA_AND_WYNK,
]

export const stores: Store[] =
	process.env.NEXT_PUBLIC_FUGA_IS_PRODUCTION === "false"
		? storesDevelopment
		: storesProduction
