import { execSync } from "child_process";
import { getConvertAudioCommandWithSuffix, thumnailCommandWithSuffix } from "./commands"

// Returns outputPath: Absolute Path to the converted File
export const generateThumbnail = async (localFilePath:string,thumbnailTypeName:string, size:number):Promise<{outputPath:string}>=>{
    const convertCommand = thumnailCommandWithSuffix(localFilePath,`_${thumbnailTypeName}`,size);
    execSync(convertCommand.command);
    return {outputPath:convertCommand.outputPath};
}

// Returns outputPath: Absolute Path to the converted File
export const generateMp3 = async (localFilePath:string, formatName:string, bitrate:string):Promise<{outputPath:string}>=>{
    const command = getConvertAudioCommandWithSuffix(localFilePath,`_${formatName}`,bitrate);
    execSync(command.command,{stdio:'ignore'});
    return{
        outputPath:command.outputPath
    }
}