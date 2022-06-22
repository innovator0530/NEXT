const { v4: uuid } = require("uuid")
import { Languages } from "../../models/options/languages"
import { PriceCategories } from "../../models/options/priceCategories"
import Label from "../../models/database/label"
import Artist from "../../models/database/artist"
const { submitRelease } = require("./submitRelease")
import fs from "fs"
import {fetchFuga} from "../../lib/fuga/fuga"
import Release from "../../models/database/release/index"

describe("Release Delivery Testing", () => {
    const skipFileUploads = true;
    if(!skipFileUploads){
        jest.setTimeout(600000)
    }
    else {
        jest.setTimeout(30000)
    }

	const testUserId = "61d8918cffc2d46761127331"
	const testAudioFile = "public/mocks/hellsbells (copy).flac"
	const testCoverFile = "public/mocks/acdc3000.png"

	const prepareAsset = (file, fileName) => {
		const localFilePath = `.temp/${process.env.STORAGE_ASSETS_DIR_NAME}/users/${testUserId}/${fileName}`
		try {
			fs.mkdirSync(
				`.temp/${process.env.STORAGE_ASSETS_DIR_NAME}/users/${testUserId}`
			)
		} catch (e) {}
		fs.copyFileSync(file, localFilePath)
		return {
			fileUrl: `${
				process.env.TEMP_ASSET_URL_PREFIX
			}${process.cwd()}/${localFilePath}`,
		}
	}
	test("Deliver Release", async () => {
		// Prepare Test Files (an audio track and )

		const audioFileName = "testfile-" + uuid() + ".flac"
		const coverFileName = `testfile-${uuid()}.png`

		const { fileUrl } = prepareAsset(testAudioFile, audioFileName)
		const { fileUrl: coverFileUrl } = prepareAsset(testCoverFile, coverFileName)

        // Build test release

		const id = uuid().split("-")[0]
		const label = await Label.findOne()
		const labelId = label.id
		const artist = await Artist.findOne()
		const tomorrow = new Date()
		tomorrow.setDate(tomorrow.getDate() + 1)
		const release = {
			title: `Release (Automated Test #${id})`,
			labelId,
			coverUrl: coverFileUrl,
			artists: [], // { type: ArtistType; id: string },
			genres: {
				primaryGenre: "Blues",
				secondaryGenre: null,
			},
			language: Languages[Math.floor(Math.random() * Languages.length)], // Language
			releaseDates: {
				digital: tomorrow.toISOString(), //ISO Str
				original: tomorrow.toISOString(),
			},
			priceCategory:
				PriceCategories[Math.floor(Math.random() * PriceCategories.length)],
			explicitLyrics: Math.random() > 0.5,
			copyright: {
				year: new Date().getFullYear(),
				owner: "testowner (copyright)",
			},
			publishingRights: {
				year: new Date().getFullYear(),
				owner: "testowner (publishing rights)",
			},
			upc: "auto",
			tracks: [
				{
					title: "track 1",
					labelId: labelId,
					artists: [
						{
							type: "primary", // ArtistType
							id: artist.id,
						},
					],
					fileUrl,
					genres: {
						primary: "Blues",
						secondary: "",
					},
					language: Languages[Math.floor(Math.random() * Languages.length)], //Language
					explicitLyrics: Math.random() > 0.5,
					publishingRights: {
						year: new Date().getFullYear(),
						owner: "testowner track 1",
					},
					isrc: "auto",
					duration: 123,
				},
			],
			stores: [],
			beatLinksOrFiles: [],
		}
		// console.log("release", release,skipFileUploads)

        // Submit release. The following actions will be taken:
        // - Put the release into the database
        // - submit the release to FUGA via API
        // - In Case, skipFileUploads is activated:
        //   - Upload Audio file to FUGA
        //   - Upload Cover File to FUGA
        //   - Upload audio and cover to S3 / Storage
        //   - Generate thumbnails and mp3 previews
        // - Connect / update / connect entities and FUGA and associate them with the release at FUGA
		const {releaseId} = await submitRelease(release, testUserId,skipFileUploads);

        // console.log('releaseId', releaseId);

        // Get the release from the db and check if the properties have been saved correctly
        const releaseDb = await Release.findById(releaseId);
        expect(releaseDb.title).toBe(release.title);
        expect(releaseDb.artists?.length).toBe(release?.artists.length)
        expect(releaseDb.primaryGenre).toBe(release.genres.primaryGenre);
        expect(releaseDb.soundtracks.length).toBe(release.tracks.length);
        expect(releaseDb.musicLabelId.toString()).toBe(release.labelId);
        expect(!!releaseDb.explicit).toBe(!!release.explicitLyrics);

        // console.log('releaseDb', releaseDb);
        console.log('releaseDb.rewaveId', releaseDb.rewaveId);

        // Fetch the "product from FUGA and check if the release has been deployed correctly"
        const {data} = await fetchFuga(`/products`);
        // console.log('data', data);
        const fugaProduct = data.product.find(p=>p.catalog_number === releaseDb.rewaveId);
        expect(typeof fugaProduct).toBe('object')

        expect(fugaProduct.name).toBe(release.title);
        expect(fugaProduct.upc).not.toBe('auto');
        expect(typeof fugaProduct.upc).toBe('string');
        expect(fugaProduct.label.name).toBe(label.name);
        expect(fugaProduct.consumer_release_date.substring(0,10)).toBe(tomorrow.toISOString().substring(0,10));
        expect(fugaProduct.original_release_date.substring(0,10)).toBe(tomorrow.toISOString().substring(0,10));
        expect(fugaProduct.release_format_type).toBe('SINGLE');
        expect(fugaProduct.catalog_tier.toLowerCase()).toBe(release.priceCategory.toLowerCase());
        expect(fugaProduct.c_line_year).toBe(release.copyright.year);
        expect(fugaProduct.c_line_text).toBe(release.copyright.owner);
        expect(fugaProduct.p_line_year).toBe(release.publishingRights.year);
        expect(fugaProduct.p_line_text).toBe(release.publishingRights.owner);
        expect(fugaProduct.language).toBe(release.language.code);

        // console.log('fugaProduct', fugaProduct);
        // console.log('data', data);
        
	})

    test("delivery instructions",async()=>{
        const {data:newData} = await fetchFuga(`/products/4732909650/delivery_instructions/edit`,'PUT',[{"dsp":1723776097}]);
        console.log('product', newData);
    })
})
