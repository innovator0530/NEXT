import path from "path"

const THUMBNAIL_QUALITY = 95

export const thumnailCommandWithSuffix = (
	inputPath: string,
	suffix: string,
	size: number
): { command: string; outputPath: string } => {
	// Add suffix to output path
	const outputPath = path.parse(inputPath)
	const oldBase = outputPath.base
	const newBase =
		oldBase.substring(0, oldBase.length - outputPath.ext.length) +
		suffix +
		".png"
	outputPath.base = newBase
	return thumbnailGetConvertCommand(inputPath, path.format(outputPath), size)
}

export const thumbnailGetConvertCommand = (
	inputPath: string,
	outputPath: string,
	size: number
): { command: string; outputPath: string } => {
	if (outputPath.split(".").pop().toLowerCase() !== "png") {
		throw new Error("Output Path must have a png file extension!")
	}

	// Convert (Imagemagick)
	// -strip: Remove Metadata
	// -quality: between 0 and 100
	// -resize 64x64\> Resize to max 64x64, keep aspect ratio. Do not resize if source image is smaller
	// PNG8: 8 Bit PNG
	const command = `convert ${inputPath} -strip -quality ${THUMBNAIL_QUALITY} -resize \"${size}x${size}\>\" \"PNG8:${outputPath}\"`
	return { command, outputPath }
}

export const getConvertAudioCommandWithSuffix = (
	inputPath: string,
	suffix: string,
	bitrate: string
): { command: string; outputPath: string } => {
	const outputPath = path.parse(inputPath)
	const oldBase = outputPath.base
	const newBase =
		oldBase.substring(0, oldBase.length - outputPath.ext.length) +
		suffix +
		".mp3"
	outputPath.base = newBase
	return getConvertAudioCommand(inputPath, path.format(outputPath), bitrate)
}

export const getConvertAudioCommand = (
	inputPath: string,
	outputPath: string,
	bitrate: string
): { command: string; outputPath: string } => {
	const outputPathPath = path.parse(outputPath)
	if (outputPathPath.ext.toLowerCase() !== ".mp3") {
		throw new Error("Output Path must be Mp3!")
	}

	// Convert to mp3 with ffmpeg, See https://stackoverflow.com/questions/3255674/convert-audio-files-to-mp3-using-ffmpeg
	// -vn: disable video
	// -ar: Audio Sample Rate
	// -map_metadata -1: Remove Metadata from source file, see https://superuser.com/questions/441361/strip-metadata-from-all-formats-with-ffmpeg/428039#428039#
	// -ac 2: 2 Audio channels (stereo)
	// -b:a Audio Bitrate, e.g. 192k
	const command = `ffmpeg -i ${inputPath} -map_metadata -1 -vn -ar 44100 -ac 2 -b:a ${bitrate} ${outputPath}`
	return { command, outputPath }
}
