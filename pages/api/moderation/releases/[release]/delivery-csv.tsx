import { NextApiResponse } from "next"
import { validateAdmin } from "../../../../../lib/validateUser"
import { createHandler } from "../../../../../middleware"
import Release from "../../../../../models/database/release"
import User from "../../../../../models/database/user"
import { ArtistTypes } from "../../../../../models/options/artistTypes"
import { Languages } from "../../../../../models/options/languages"
import { PriceCategories } from "../../../../../models/options/priceCategories"
import { getPublicAssetUrl, getSignedS3Url } from "../../../filedownload/[assetid]"

const csvFormatVersion = "4"

const signedUrlExpiry = 86400*7; // One week in seconds. More is not allowed by AWS S3

const handler = createHandler()

// GET /api/moderation/releases/{releaseid}/delivery-csv
// Get CSV File for Release Delivery to be downloaded by admin
// For ADMIN only

// handler
// 	.use(session)
// 	.get(async (req: RequestWithSession, res: NextApiResponse) => {
// 		try {
// 			const adminUser = req.session.get("user")
// 			const vr = validateAdmin(adminUser)
// 			if (!vr.authorized) {
// 				res
// 					.status(403)
// 					.json({ message: vr.unautorizedMessage || "Unauthorized" })
// 				return
// 			}
// 			// Get Release
// 			const releaseId = req.query.release
// 			const releases = await Release.find({ _id: releaseId })
// 			if (releases.length !== 1) {
// 				res.status(404).json({ message: "Release Not found" })
// 				return
// 			}
// 			const release = releases[0]
// 			// Get user:
// 			const users = await User.find({ _id: release.user })
// 			if (releases.length !== 1) {
// 				res.status(404).json({ message: "User Not found" })
// 				return
// 			}
// 			const user = users[0]

// 			// First Line:
// 			let csv = '#metadata,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n'

// 			// Metadata:
// 			if (
// 				process.env.NODE_ENV === "production" &&
// 				(!release.rewaveId ||
// 					typeof release.rewaveId !== "string" ||
// 					release.rewaveId.length < 1)
// 			) {
// 				res.status(400).json({
// 					message: "Failed because Release does not have a REWAVE Release ID",
// 				})
// 				return
// 			}
// 			if (
// 				!Array.isArray(release.soundtracks) ||
// 				release.soundtracks.length < 1
// 			) {
// 				res.status(400).json({
// 					message:
// 						"Failed because Release does not have at least 1 soundtrack!",
// 				})
// 				return
// 			}
// 			csv += `description,${
// 				release.rewaveId || "TESTID" + release._id
// 			},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n`
// 			csv += `format_version,${csvFormatVersion},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n`
// 			csv += `total_releases,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n`
// 			csv += `total_tracks,${release.soundtracks.length},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n`

// 			// Headers
// 			csv += `#release_info,,,,,,,,,,,,,,,,,,,,,,,,,#track_info,,,,,,,,,,,\r\n`
// 			csv += `#action,#upc,#catalog_number,#grid,#title,#remix_or_version,#user_email,#label,#participants,#primary_genre,#secondary_genre,#language,#explicit_lyrics,#price_category,#digital_release,#original_release,#license_type,#license_info,#c_year,#c_line,#p_year,#p_line,#territories,#cover_url,#track_count,#isrc,#iswc,#track_title,#remix_or_version,#participants,#primary_genre,#secondary_genre,#language,#explicit_lyrics,#p_year,#p_line,#audio_url\r\n`

// 			//Validation of Release
// 			if (
// 				!release.title ||
// 				typeof release.title !== "string" ||
// 				release.title.length < 1
// 			) {
// 				res.status(400).json({ message: "Release has no title" })
// 				return
// 			}
// 			if (
// 				!release.musicLabel ||
// 				typeof release.musicLabel !== "string" ||
// 				release.musicLabel.length < 1
// 			) {
// 				res.status(400).json({ message: "Release has no musicLabel" })
// 				return
// 			}
// 			if (
// 				!Array.isArray(release.genres) ||
// 				release.genres.length < 1 ||
// 				release.genres.length > 2
// 			) {
// 				res.status(400).json({ message: "Release has no genres" })
// 				return
// 			}
// 			if (process.env.NODE_ENV === "production") {
// 				if (
// 					!release.language ||
// 					!Languages.some((l) => l.code === release.language)
// 				) {
// 					res.status(400).json({ message: "Release Language is invalid" })
// 					return
// 				}
// 			}
// 			if (
// 				!release.priceCategory ||
// 				typeof release.priceCategory !== "string" ||
// 				!PriceCategories.some(
// 					(a) => a.toLowerCase() === release.priceCategory.toLowerCase()
// 				)
// 			) {
// 				if (
// 					!release.language ||
// 					release.language.length !== 2 ||
// 					!Languages.some((l) => l.code === release.language)
// 				) {
// 					res.status(400).json({ message: "Release Price category is invalid" })
// 					return
// 				}
// 			}
// 			if (
// 				!release.digitalReleaseDate ||
// 				(typeof release.digitalReleaseDate !== "number" &&
// 					Object.prototype.toString.call(release.digitalReleaseDate) !==
// 						"[object Date]")
// 			) {
// 				res
// 					.status(400)
// 					.json({ message: "Release Digital Release Date is invalid" })
// 				return
// 			}
// 			if (
// 				!release.originalReleaseDate ||
// 				(typeof release.originalReleaseDate !== "number" &&
// 					Object.prototype.toString.call(release.originalReleaseDate) !==
// 						"[object Date]")
// 			) {
// 				res
// 					.status(400)
// 					.json({ message: "Original Digital Release Date is invalid" })
// 				return
// 			}
// 			if (!release.copyrightYear || typeof release.copyrightYear !== "number") {
// 				res.status(400).json({ message: "Release Copyright Year is invalid!" })
// 				return
// 			}
// 			if (!release.copyrightBy || typeof release.copyrightBy !== "string") {
// 				res.status(400).json({ message: "Release Copyright Name is invalid!" })
// 				return
// 			}
// 			if (
// 				!release.publishingRightsYear ||
// 				typeof release.publishingRightsYear !== "number"
// 			) {
// 				res
// 					.status(400)
// 					.json({ message: "Release Publishing Rights Year is invalid!" })
// 				return
// 			}
// 			if (
// 				!release.publishingRightsBy ||
// 				typeof release.publishingRightsBy !== "string"
// 			) {
// 				res
// 					.status(400)
// 					.json({ message: "Release Publishing Rights Name is invalid!" })
// 				return
// 			}
// 			if (!release.coverUrl || typeof release.coverUrl !== "string") {
// 				res.status(400).json({ message: "No Cover URL!" })
// 				return
// 			}
//             if(typeof release.explicit !== 'boolean'){
//                 res
//                     .status(400)
//                     .json({ message: `Explicit value of Release is invalid!` })
//                 return
//             }

// 			// Validate User
// 			if (
// 				!user.email ||
// 				typeof user.email !== "string" ||
// 				user.email.length < 1
// 			) {
// 				res.status(400).json({ message: "No user email available" })
// 				return
// 			}

// 			for (let i = 0; i < release.soundtracks.length; i++) {
// 				// Release Data (No Track info first)
// 				const soundtrack = release.soundtracks[i]
// 				csv += `insert,`
// 				let upc: string = release.upc
// 				if (
// 					upc.toLowerCase() !== "auto" &&
// 					(upc.length !== 12 || upc[0] !== "0") &&
// 					upc.length !== 11
// 				) {
// 					res.status(400).json({ message: `UPC of Release is invalid` })
// 					return
// 				}
// 				if (upc.length === 11) {
// 					upc = "0" + upc
// 				}
// 				if (upc.toLowerCase() === "auto") {
// 					upc = "auto"
// 				}
// 				csv += `${upc},`
// 				let catalogNumber = release.rewaveId || release._id
// 				csv += `${catalogNumber},`
				
// 				//Grid Property: leave empty
// 				csv += `,`;

// 				csv += `${release.title},`

// 				// "remix_or_version" property. Leave Empty
// 				csv += `,`;

// 				csv += `${user.email},`
// 				csv += `${release.musicLabel},`

// 				let artists = release.artists
// 				if (!artists.some((a) => a.type === "primary")) {
// 					res
// 						.status(400)
// 						.json({ message: `No primary artist found in Release` })
// 					return
// 				}
// 				// Check if the release is classical (Composer required)
// 				if (
// 					release.genres.some(
// 						(g) => g.split("/")[0].toLowerCase() === "classical"
// 					)
// 				) {
// 					if (!artists.some((a) => a.type === "composer")) {
// 						res.status(400).json({
// 							message: `No composer found for soundtrack ${
// 								i + 1
// 							}. (Required for classical pieces)`,
// 						})
// 						return
// 					}
// 				}

// 				// Check if there is an invalid artist type
// 				for (let i = 0; i < artists.length; i++) {
// 					if (!ArtistTypes.includes(artists[i].type)) {
// 						res.status(400).json({
// 							message: `Artists type ${artists[i].type} not allowed. Found in Release`,
// 						})
// 						return
// 					}
// 					if (!artists[i].name || artists[i].name.length < 1) {
// 						res.status(400).json({ message: `Artist has no name!` })
// 						return
// 					}
// 				}
// 				// Sort artists by relevance:
// 				artists.sort(
// 					(a, b) => ArtistTypes.indexOf(a.type) - ArtistTypes.indexOf(b.type)
// 				)
// 				// Add artists to csv entry;
// 				csv += `${artists.reduce(
// 					(acc, curr,i,a) => (acc += `${curr.type}:${curr.name}${i<(a.length-1)?';':''}`),
// 					""
// 				)},`

// 				// Add genres
// 				csv += `${release.genres[0]},`
// 				csv += release.genres[1] ? `${release.genres[1]},` : `,`;

// 				// Release Language
// 				csv += `${release.language},`

// 				// Explicit
// 				csv += `${release.explicit ? "yes" : "no"},`
// 				// price category
// 				csv += `${release.priceCategory},`

// 				// release dates
// 				const digitalDate = new Date(release.digitalReleaseDate)
// 				csv += `${digitalDate.getUTCFullYear()}-${
// 					digitalDate.getUTCMonth() + 1
// 				}-${digitalDate.getUTCDate()},`
// 				const originalDate = new Date(release.originalReleaseDate)
// 				csv += `${originalDate.getUTCFullYear()}-${
// 					originalDate.getUTCMonth() + 1
// 				}-${originalDate.getUTCDate()},`

// 				// license (leave empty);
// 				csv += `,`
// 				csv += `,`

// 				// Copyright
// 				csv += `${release.copyrightYear},`
// 				csv += `${release.copyrightBy},`
// 				// Publishing Rights
// 				csv += `${release.publishingRightsYear},`
// 				csv += `${release.publishingRightsBy},`

// 				// territories (leave empty)
// 				csv += `,`

// 				// Cover URL
// 				csv += `${getPublicAssetUrl(release.coverUrl)},`

// 				// Track Count:
// 				csv += `${release.soundtracks.length},`

// 				// ISRC:
// 				csv += `auto,`

// 				// ISWC (leave empty):
// 				csv += `,`;

// 				// Track Title:
//                 if(!soundtrack.name || typeof soundtrack.name !== 'string' || soundtrack.name.length < 1){
//                     res
// 						.status(400)
// 						.json({ message: `Soundtrack ${i+1} has no name` })
// 					return
//                 }
// 				csv += `${soundtrack.name},`

// 				// remix/version
// 				csv += `,`

// 				// Soundtrack participants
// 				// Use Release Artists if there arent any in soundtrack
// 				let soundtrackArtists: {
// 					name: string
// 					type: string
// 				}[] = soundtrack.artists
// 				let usesSoundtrackArtists = true
// 				if (
// 					!Array.isArray(soundtrack.artists) ||
// 					soundtrack.artists.length < 1
// 				) {
// 					soundtrackArtists = release.artists
// 					usesSoundtrackArtists = false
// 				}
//                 // Check if artists valid
// 				if (!soundtrackArtists.some((a) => a.type === "primary")) {
// 					res
// 						.status(400)
// 						.json({ message: `No primary artist found in Soundtrack ${i+1}` })
// 					return
// 				}
//                 // Check if there is an invalid artist type
// 				for (let i = 0; i < soundtrackArtists.length; i++) {
// 					if (!ArtistTypes.includes(soundtrackArtists[i].type)) {
// 						res.status(400).json({
// 							message: `Artists type ${soundtrackArtists[i].type} not allowed. Found in Track ${soundtrack.name}`,
// 						})
// 						return
// 					}
// 					if (!soundtrackArtists[i].name || soundtrackArtists[i].name.length < 1) {
// 						res.status(400).json({ message: `Artist has no name!` })
// 						return
// 					}
// 				}
// 				// Check if the release is classical (Composer required)
//                 const allGenres = Array.isArray(soundtrack.genres)
// 					? release.genres.concat(soundtrack.genres)
// 					: release.genres
// 				if (
// 					allGenres.some(
// 						(g) => g?.split("/")[0].toLowerCase() === "classical"
// 					)
// 				) {
// 					if (!soundtrackArtists.some((a) => a.type === "composer")) {
// 						res.status(400).json({
// 							message: `No composer found for soundtrack ${
// 								i + 1
// 							}. (Required for classical pieces)`,
// 						})
// 						return
// 					}
// 				}
//                 // Finally, add artists to csv
//                 csv += `${soundtrackArtists.reduce(
// 					(acc, curr,index,arr) => (acc += `${curr.type}:${curr.name}${index<(arr.length-1)?';':''}`),
// 					""
// 				)},`


//                 // Genres
// 				const genres =
// 					soundtrack.genres && Array.isArray(soundtrack.genres) && soundtrack.genres.length >0 && soundtrack.genres[0] 
// 						? soundtrack.genres
// 						: release.genres
                
//                 csv += `${genres[0]},`;
//                 csv += genres[1]?`${genres[1]},`:`,`

//                 const language = soundtrack.lanuguage && soundtrack.language.length > 0 ? soundtrack.language : release.language;
//                 if(process.env.NODE_ENV ==='production' &&  language && 
//                     !(Languages.some(l=>l.code===language))
//                 ){
//                     res
// 						.status(400)
// 						.json({ message: `Language of soundtrack ${i + 1} is invalid!` })
// 					return
//                 }
//                 csv += `${language},`;

//                 // Explicit lyrics
//                 let explicit;
//                 if(typeof soundtrack.explicit === 'boolean'){
//                     explicit = soundtrack.explicit;
//                 }
//                 else{
//                     explicit = release.explicit;
//                 }
//                 csv += `${explicit?'yes':'no'},`;

//                 // Publishing rights
//                 csv += `${soundtrack.publishingRightsYear || release.publishingRightsYear},`;
//                 csv += `${soundtrack.publishingRightsBy || release.publishingRightsBy},`;

//                 // Audio URL
//                 csv += `${await getSignedS3Url(soundtrack.fileUrl,signedUrlExpiry)},`;
//                 csv += `\r\n`

// 			}
//             res.setHeader('Content-Type','text/csv');
//             res.send(csv);
// 		} catch (e) {
// 			console.log("Error at getDeliveryCSV", e)
// 			res.status(500).json({ errorMessage: e.message })
// 		}
// 	})

export default handler
