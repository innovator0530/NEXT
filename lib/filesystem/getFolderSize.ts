import {execSync} from "child_process";
import {existsSync} from "fs";

export const  getFolderSize = (filePath:string):number=>{
    if(!existsSync(filePath)){
        throw new Error("Something went wrong")
    }
    const result = execSync(`du "${filePath}"`).toString();
    const resultLines = result.split('\n');
    const resultLine = resultLines.find(l=>l.split('\t').slice(1).join(' ')==filePath);
    if(resultLine){
        const res = parseInt(resultLine.split(' ')[0]);
        console.log(res);
        return res;
    }
    else{
        throw new Error("Something went wrong")
    }
}