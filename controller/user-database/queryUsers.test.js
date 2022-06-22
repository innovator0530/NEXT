import {queryUsers} from "./queryUsers";

describe("Test User Database querying",()=>{


    test("Regular query from start",async() =>{
        const users = await queryUsers({searchTerm:'FlO'});
        console.log('users', users);
    })  
})