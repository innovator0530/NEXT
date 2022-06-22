import { HeadObjectCommand } from "@aws-sdk/client-s3"
import { Release, Soundtrack } from "../../models/releases.models"

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3")
const s3BucketName = process.env.ARCHIVE_BUCKET_NAME
const awsRegion = 'eu-central-1';
const client = new S3Client({
	region: awsRegion,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
})

export const resolveS3Url = async (
	url,
	checkExistance?: boolean
): Promise<string> => {
	const urlObj = new URL(url)
	const host = urlObj.hostname
	if (!host.includes(s3BucketName)) {
		console.log("invalid url", url)
		throw new Error("Invalid URL")
	}
	const Key = urlObj.pathname.substring(1, urlObj.pathname.length)
	const params = {
		Bucket: s3BucketName,
		Key,
	}
	if (checkExistance) {
		const checkCommand = new HeadObjectCommand(params)
		await client.send(checkCommand) // throws an error if not existing
	}
	const command = new GetObjectCommand(params)
	const getUrl = await getSignedUrl(client, command, { expiresIn: 1800 })
	return getUrl
}

export const hydrateReleasesUrls = (
	releases: any[],
	allowThumbnails?: boolean
) => {
	return Promise.all(
		releases.map((r) => hydrateReleaseUrls(r, allowThumbnails))
	)
}

export const hydrateReleaseUrls = async (
	release: any,
	allowThumbnails?: boolean
) => {
	const coverUrl = release.coverUrl
	if (coverUrl && typeof coverUrl === "string" && coverUrl.length > 0) {
		if (allowThumbnails) {
			try {
				const parts = release.coverUrl.split("/")
				const index = parts.indexOf("users") + 2
				parts.splice(index, 0, "thumbnails")
				release.coverUrl = await resolveS3Url(parts.join("/"))
			} catch (e) {
				try {
					release.coverUrl = await resolveS3Url(release.coverUrl)
				} catch (e) {
					release.coverUrl = ""
				}
			}
		} else {
			try {
				release.coverUrl = await resolveS3Url(release.coverUrl)
			} catch (e) {
				release.coverUrl = ""
			}
		}
	}
	const soundtracks: Soundtrack[] = release.soundtracks || []
	for (let i = 0; i < soundtracks.length; i++) {
		if (soundtracks[i].fileUrl) {
			soundtracks[i].fileUrl = await resolveS3Url(soundtracks[i].fileUrl)
		}
	}
	return release
}
