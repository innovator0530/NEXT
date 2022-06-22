import {execSync} from 'child_process';


// filePath: Absolute File Path, File must exist on the local file System
export const getMimeTypeForFile = (filePath:string):string =>{
    const regex = /\w+\/[-+.\w]+/gm;
    const result = execSync(`file --mime-type -b ${filePath}`).toString();
    const filteredResult = (result.match(regex) || []).join('')
    // console.log(`MimeType (${filePath})`, result)
    return filteredResult;
}