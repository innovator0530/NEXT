import { IDBRelease } from "./IRelease";

export const releaseGetCoverUrl = function(this:IDBRelease){
    return this.coverUrl;
}

export const releaseGetSoundtrackUrls = function(this:IDBRelease){
    const result:string[] = []
    const soundtracks = this.soundtracks;
    soundtracks.forEach(s=>{
        if(s.fileUrl) result.push(s.fileUrl);
    })
    return result;
}

export const releaseSetCoverUrl = function(this:IDBRelease, url:{old:string, new:string}){
    if(this.coverUrl != url.old){
        throw new Error("URL to be changed does not match existing Cover URL");
    }
    else{
        this.coverUrl = url.new;
    }
}

export const releaseSetSoundtrackUrls = function(this:IDBRelease,urls:{old:string,new:string}[]){
    let expectedUrlsLength = this.soundtracks?.length || 0;
    if(expectedUrlsLength !== urls.length){
        throw new Error("Provided URL array does not match Release");
    }
    urls.forEach((url,index)=>{
        if(url.old!==this.soundtracks[index].fileUrl){
            throw new Error(`Old URL does not match Soundtrack with Index ${index}`);
        }
        else{
            this.soundtracks[index].fileUrl = url.new;
        }
    })
}