import fs from 'fs';

// export const folderExistsRecursively = (entryPoint:string,path:string)=>{
//     const path
// }

export const ensureFolderExists = (path:string)=>{
    let parts = path.split('/');
    let missing = [];
    let folderExists = false;
    while(!folderExists){
        const currentPath = parts.join('/');
        const pathExists = fs.existsSync(currentPath);
        if(pathExists && !fs.statSync(currentPath).isFile()){
            folderExists = true;
        }
        else{
            missing.push(parts.pop());
        }
    }
    missing.reverse().forEach(p=>{
        const currentPath = [...parts,p].join('/');
        fs.mkdirSync(currentPath);
        parts.push(p);
    })
}