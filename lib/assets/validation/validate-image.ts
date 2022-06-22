import { execSync } from "child_process"
import fs from "fs"
import { acceptedImageFileTypes } from "../constants"

const minImageSize = 3000
const maxImageSize = 5000
const acceptedColorSpaces = ["RGB", "sRGB"]

export const validateImage = async (
	localPath: string
): Promise<{ valid: boolean; validationMessage?: string }> => {
	const fileExists = fs.existsSync(localPath)
	if (!fileExists) {
		throw new Error("Provided File for Image Validation Does not exist")
	}
	const identifyResult = execSync(`identify \"${localPath}\"`).toString()
	console.log("identifyResult", identifyResult)

	// Interpret result:
	const pathPart = identifyResult.substring(0, localPath.length)
	const resultPart = identifyResult.substring(localPath.length + 1)
	const results = resultPart.split(" ")
	if (results.length !== 8) {
		return {
			valid: false,
			validationMessage:
				"Image has an invalid format. Only sRGB is accepted. Check if your image is grayscale or 8-bit. These formats are not accepted",
		}
	}

	if (pathPart != localPath) throw new Error("Error with Identify Result")

	// Check File Type
	if (!acceptedImageFileTypes.includes(results[0]))
		return {
			valid: false,
			validationMessage: "The provided file type is not accepted",
		}

	// Check Image Dimensions
	const dimensions = results[1].split("x").map((a) => parseInt(a))
	if (dimensions[0] !== dimensions[1])
		return { valid: false, validationMessage: "Image must be square" }
	if (dimensions[0] < minImageSize)
		return { valid: false, validationMessage: "Image is too small" }
	if (dimensions[0] > maxImageSize)
		return { valid: false, validationMessage: "Image is too large" }

	// Check Color Space
	if (!acceptedColorSpaces.includes(results[4]))
		return {
			valid: false,
			validationMessage: "The image' color space must be either RGB or sRGB",
		}

	return { valid: true }
}
