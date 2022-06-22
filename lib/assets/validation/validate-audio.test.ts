

import { validateAudio } from "./validate-audio";

test("Audio Validation",async()=>{
    // expect(await validateAudio('/home/florian/testing/Sample_BeeMoved_96kHz24bit.flac')).toEqual({valid:true});
})

test("Audio Validation - sample bits too low",async()=>{
    expect(await validateAudio('/home/florian/code/rewave/public/mocks/hellsbells.wav')).toEqual({valid:false,validationMessage:"The audio file must be either 16-bit or 24-bit"});
})

// test("Audio Validation - Track Too Short",async()=>{
//     const result = await validateAudio('/home/florian/work/rewave/rewave-web-app/public/mocks/hellsbells-short.wav');
//     console.log(result);
//     expect(result).toEqual({valid:false,validationMessage:"The audio file must be either 16-bit or 24-bit"});
// })

test("Audio Validation",async()=>{
    expect(await validateAudio('/home/florian/code/rewave/public/mocks/hellsbells-16bit.wav')).toEqual({valid:true,duration:311.379592});
})