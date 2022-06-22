import { fetchFuga } from "@lib/fuga/fuga"
import Artist from "@models/database/artist"
import Label from "@models/database/label"
import { IReleaseDocument } from "@models/database/release/IRelease"
import { genres, mainGenresWithIds } from "@models/options/genres"
import { ReleaseReportError } from "./migration"

export const compareReleaseWithFuga = async (
	release: IReleaseDocument
): Promise<{ errors: ReleaseReportError[] }> => {
	const errors: Omit<ReleaseReportError, "code">[] = []
	// Find the release by
	// searching rewaveId / Catalog Number
	const {
		data: { product: productsRewaveId },
	} = await fetchFuga(`/products?search=${release.rewaveId}`)
	if (productsRewaveId.length < 1) {
		errors.push({
			message: `No Releases with this Rewave ID was found at FUGA, RewaveID: ${release.rewaveId}`,
		})
	} else if (productsRewaveId.length > 1) {
		errors.push({
			message: `There are multiple releases with this Rewave ID found at FUGA, RewaveID: ${release.rewaveId}`,
		})
	}
	// UPC / barcode
	const {
		data: { product: productsUpc },
	} = await fetchFuga(`/products?search=${release.upc}`)
	if (productsUpc.length < 1) {
		errors.push({
			message: `No Releases with this UPC was found at FUGA, UPC: ${release.upc}`,
		})
	} else if (productsUpc.length > 1) {
		errors.push({
			message: `There are multiple releases with this UPC found at FUGA, UPC: ${release.upc}`,
		})
	}
	// FUGA ProductId
	let product
	try {
		const { data } = await fetchFuga(`/products/${release.fugaProductId}`)
		product = data
	} catch (e) {
		console.log("e", e)
	}
	if (!product) {
		errors.push({
			message: `Release with Fuga ID ${release.fugaProductId} was not found at FUGA`,
		})
	} else {
		// Check if top-level keys match Rewave
		interface FieldToCheck {
			fuga: string
			rewave: string
			date?: boolean
			caseInsensitive?: boolean
		}
		const fields: FieldToCheck[] = [
			{ fuga: "name", rewave: "title" },
			{ fuga: "upc", rewave: "upc" },
			{ fuga: "catalog_number", rewave: "rewaveId" },
			{
				fuga: "consumer_release_date",
				rewave: "digitalReleaseDate",
				date: true,
			},
			{
				fuga: "original_release_date",
				rewave: "originalReleaseDate",
				date: true,
			},
			{ fuga: "catalog_tier", rewave: "priceCategory", caseInsensitive: true },
			{ fuga: "c_line_year", rewave: "copyrightYear" },
			{ fuga: "c_line_text", rewave: "copyrightBy" },
			{ fuga: "p_line_year", rewave: "publishingRightsYear" },
			{ fuga: "p_line_text", rewave: "publishingRightsBy" },
		]
		const compareFields = (
			objFuga: any,
			objRewave: any,
			fields: FieldToCheck[],
			objName?: string
		) => {
			fields.forEach((f) => {
				let valFuga = objFuga[f.fuga]
				let valRewave = objRewave[f.rewave]
				if (f.caseInsensitive) {
					valFuga = valFuga?.toLowerCase()
					valRewave = valRewave?.toLowerCase()
				}
				if (f.date) {
					try {
						valRewave = new Date(valRewave).toISOString().substring(0, 10)
						valFuga = valFuga.substring(0, 10)
					} catch (e) {}
				}
				if (valFuga !== valRewave || valFuga === undefined) {
					errors.push({
						message: `The attribute ${f.rewave}/${f.fuga} of ${
							objName || "the release"
						} is different at Rewave/Fuga`,
						details: { rewave: valRewave, fuga: valFuga },
					})
				}
			})
		}
		compareFields(product, release, fields)
		const soundtrackFields: FieldToCheck[] = [
			{ fuga: "id", rewave: "fugaAssetId" },
			{ fuga: "isrc", rewave: "isrc" },
			{
				fuga: "name",
				rewave: "name",
			},
		]
		// Compare non-top-level fields
		// Explicit
		if (
			(release.explicit &&
				!(
					product.parental_advisory === "YES" ||
					product.parental_advisory === true
				)) ||
			(!release.explicit &&
				!(
					product.parental_advisory === "NO" ||
					product.parental_advisory === false
				))
		) {
			errors.push({
				message: `Fuga Product parental_advisory/explicit does not match`,
				details: { fuga: product.parental_advisory, rewave: release.explicit },
			})
		}
		// Genres
		const genre = mainGenresWithIds?.find(
			(g) =>
				g?.name?.toLowerCase() ===
				release.primaryGenre.toLowerCase().substring(0, g.name.length)
		).name
		if (
			release.primaryGenre.toLowerCase().substring(0, genre.length) !=
			product?.genre?.name.toLowerCase().substring(0, genre.length)
		) {
			errors.push({
				message: `Fuga Product primaryGenre/genre does not match`,
				details: { fuga: product.genre, rewave: release.primaryGenre },
			})
		}
		const secondaryGenre = mainGenresWithIds.find(
			(g) =>
				g?.name?.toLowerCase() ===
				release.secondaryGenre?.toLowerCase()?.substring(0, g?.name?.length)
		)?.name
		if (
			secondaryGenre &&
			release.secondaryGenre
				?.toLowerCase()
				?.substring(0, secondaryGenre?.length) !=
				product?.alternate_genre?.name
					?.toLowerCase()
					?.substring(0, secondaryGenre?.length)
		) {
			errors.push({
				message: `Fuga Product secondaryGenre/alternate_genre does not match`,
				details: {
					fuga: product?.alternate_genre,
					rewave: release?.secondaryGenre,
				},
			})
		}
		// Artists
		if (release.artists.length !== product.artists.length) {
			errors.push({
				message: `Fuga Product artist count does not match`,
				details: { fuga: product.artists, rewave: release.artists },
			})
		}
		const artistIds = [
			...release.artists.map((a) => a?.artistId),
			...release.soundtracks.reduce(
				(acc, curr) => [...acc, ...curr.artists.map((a) => a?.artistId)],
				[]
			),
		]
			.filter((item, index, array) => !!item || array.indexOf(item) === index)
			.map((id) => id.toString())
		const artists = await Artist.find({ _id: { $in: artistIds } })
		artists.forEach((a) => {
			if (!a.fugaId) {
				errors.push({
					message: "Artist has no fugaId!",
					details: { artist: a },
				})
			}
		})
		const handleArtists = (a, index, entityName: string) => {
			const artistId = a?.id
			const rewaveArtist = artists.find((a) => a?.fugaId === artistId)
			if (!rewaveArtist) {
				errors.push({
					message: `The ${index + 1}th artist of the fuga product (primary: ${
						a?.primary
					}) does not exist at the Rewave Release`,
					details: { fuga: a, rewave: rewaveArtist },
				})
			} else if (a.name !== rewaveArtist.name) {
				errors.push({
					message: `The name of the ${
						index + 1
					}th artist of the ${entityName} (primary: ${
						a?.primary
					}) does not match with the Rewave Artist`,
					details: { fuga: a, rewave: rewaveArtist },
				})
			}
		}
		product.artists.forEach((a, i) => handleArtists(a, i, "Fuga Product"))

		const label = await Label.findOneById(release.musicLabelId.toString())
		if (label?.fugaId !== product?.label?.id) {
			errors.push({
				message: "FugaLabelId/label.id does not match",
				details: { fuga: product.label, rewave: label },
			})
		} else if (label?.name !== product?.label?.name) {
			errors.push({
				message: "label.name does not match",
				details: { fuga: product.label, rewave: label },
			})
		}

		// Compare Soundtracks
		if (release.soundtracks.length !== product.assets.length) {
			errors.push({
				message: `Fuga Assets count (${product.assets.length}) does not match rewave soundtrack count (${release.soundtracks.length})`,
			})
		} else {
			release.soundtracks.forEach((soundtrack, index) => {
				// compare top-level fields
				const asset = product.assets[index]
				compareFields(
					asset,
					soundtrack,
					soundtrackFields,
					`Soundtrack no ${index + 1}`
				)

				// other non-top-level soundtrack fields
				// explicit
				if (
					(soundtrack.explicit && asset.parental_advisory !== "YES") ||
					(!soundtrack.explicit && asset.parental_advisory !== "NO")
				) {
					errors.push({
						message: `Fuga Soundtrack ${
							index + 1
						} parental_advisory/explicit does not match`,
						details: {
							fuga: asset.parental_advisory,
							rewave: soundtrack.explicit,
						},
					})
				}
				// genre
				const genre = mainGenresWithIds?.find(
					(g) =>
						g?.name?.toLowerCase() ===
						soundtrack.primaryGenre.toLowerCase().substring(0, g.name.length)
				).name
				if (
					soundtrack.primaryGenre.toLowerCase().substring(0, genre.length) !=
					asset?.genre?.name.toLowerCase().substring(0, genre.length)
				) {
					errors.push({
						message: `Fuga Asset no ${
							index + 1
						} primaryGenre/genre does not match`,
						details: { fuga: asset.genre, rewave: soundtrack.primaryGenre },
					})
				}
				// Artists
				asset.artists.forEach((a, i) =>
					handleArtists(a, i, `Asset No${index + 1}`)
				)
			})
		}
	}

	return {
		errors: errors.map((e) => ({ ...e, code: "FUGA_CONSISTENCY_ERROR" })),
	}
}
