import fs from "fs"
import { execSync } from "child_process"
import { allowedAudioFileExtensions as allowedFileExtensions } from "../constants"

const acceptedBitsPerSample = [16, 24]
const allowedSampleRates = [44100, 48000]

const minimumDuration = 30.0
const acceptedChannelCount = 2

const SOMETHING_WRONG_MESSAGE = "Something is wrong with the file provided"

export const validateAudio = async (
	filePath: string
): Promise<{
	valid: boolean
	validationMessage?: string
	duration?: number
}> => {
	//Check if File Exists
	if (!fs.existsSync(filePath))
		throw new Error("Audio File to be tested does not exist.")

	// Check for Correct file Extension
	if (
		!allowedFileExtensions.includes(
			filePath.split(".").slice(-1)[0].toUpperCase()
		)
	)
		return { valid: false, validationMessage: "File type must be WAV or FLAC" }

	// Run FFProbe
	const ffProbeRawResult = execSync(
		`ffprobe -v quiet -print_format json -show_format -show_streams \"${filePath}\"`
	).toString()
	const probeResult = JSON.parse(ffProbeRawResult)

	// Check if streams are present
	if (probeResult?.streams.length < 1)
		return { valid: false, validationMessage: SOMETHING_WRONG_MESSAGE }
	const stream = probeResult.streams[0]

	// Cannot contain more than 1 stream
	if (probeResult?.streams.length > 1) {
		return { valid: false, validationMessage: SOMETHING_WRONG_MESSAGE }
	}

	// Check Codec (FLAC or PCM)
	const codecName = stream.codec_name
	if (codecName != "flac" && codecName.substring(0, 3) != "pcm")
		return { valid: false, validationMessage: SOMETHING_WRONG_MESSAGE }

	// Check Sample Rate
	const sampleRate = parseInt(stream.sample_rate)
	if (!allowedSampleRates.includes(sampleRate)) {
		return {
			valid: false,
			validationMessage: `The sample rate is not accepted. Only ${allowedSampleRates
				.map((r) => "" + r + "hz")
				.join(", ")} are allowed`,
		}
	}
	// if (sampleRate < minSampleRate)
	// 	return { valid: false, validationMessage: "The sample rate is too low" }
	// if (sampleRate > maxSampleRate)
	// 	return { valid: false, validationMessage: "The sample rate is too high" }

	// Check Bits per Sample
	let bitsPerSample = stream.bits_per_sample
	if (typeof stream.bits_per_raw_sample === "string")
		bitsPerSample = parseInt(stream.bits_per_raw_sample)
	if (!acceptedBitsPerSample.includes(bitsPerSample))
		return {
			valid: false,
			validationMessage: "The audio file must be either 16-bit or 24-bit",
		}

	// Check if stereo
	const channelCount = stream.channels
	if (channelCount !== acceptedChannelCount)
		return { valid: false, validationMessage: "The audio file must be stereo" }

	// Check Duration
	const duration = parseFloat(stream.duration)
	if (duration < minimumDuration)
		return {
			valid: false,
			validationMessage: "The audio file must be at least 30 seconds in length",
		}

	//+++++ This does not work currently, as it falsely rejects most (good) audio files +++++

	// Detect if the encoder in the metadata is correct
	// See https://stackoverflow.com/questions/71999259/problem-with-invalid-metadata-of-a-flac-file

	// if (
	// 	probeResult?.format?.tags?.encoder ||
	// 	probeResult?.format?.tags?.ENCODER
	// ) {
	// 	const fileExtension = filePath.split(".").slice(-1)[0].toUpperCase()
	// 	console.log("fileExtension", fileExtension)
	// 	let copiedFilePath = `${filePath}-copied.${fileExtension}`
	// 	console.log("copiedFileName", copiedFilePath)
	// 	try {
	// 		// Copy the file without metadata
	// 		execSync(
	// 			`ffmpeg -i \"${filePath}\" -map_metadata -1 -c:a copy \"${copiedFilePath}\"`
	// 		).toString()
	// 		const originalFileEncoderTag =
	// 			probeResult?.format?.tags?.encoder || probeResult?.format?.tags?.ENCODER
	// 		const ffProbeRawResult = execSync(
	// 			`ffprobe -v quiet -print_format json -show_format -show_streams \"${copiedFilePath}\"`
	// 		).toString()
	// 		const probeResultCopied = JSON.parse(ffProbeRawResult)
	// 		const copiedFileEncoderTag =
	// 			probeResultCopied?.format?.tags?.encoder ||
	// 			probeResultCopied?.format?.tags?.ENCODER
	// 		if (originalFileEncoderTag !== copiedFileEncoderTag) {
	// 			try {
	// 				fs.unlinkSync(copiedFilePath)
	// 			} catch (e) {
	// 				console.log("e", e)
	// 			}
	// 			return {
	// 				valid: false,
	// 				validationMessage:
	// 					"The audio file provided is corrupt. Please try to convert your file with another application.",
	// 			}
	// 		}
	// 	} catch (e) {
	// 		console.log("Error Copying audio file with ffmpeg to validate encoder")
	// 		console.log("e", e)
	// 	}
	// 	try {
	// 		fs.unlinkSync(copiedFilePath)
	// 	} catch (e) {
	// 		console.log("e", e)
	// 	}
	// }

	return { valid: true, duration }
}
