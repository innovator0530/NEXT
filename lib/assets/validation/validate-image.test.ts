import {validateImage} from "./validate-image";


test("Test Image Validation",async()=>{
    expect (await validateImage('/home/florian/code/rewave/public/mocks/acdc3000.png')).toEqual({valid:true})
    // expect (await validateImage('/home/florian/testing/simpler4k70 .jpg')).toEqual({valid:false,validationMessage:'Image must be square'})
})