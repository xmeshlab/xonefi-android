//import {get_prk} from "../xonefi-api-client/account" 
var get_prk = require("../xonefi-api-client/account").get_prk

/**
 * function main() {
    const account = require("../api/account");
    var prk = account.get_prk("hello12345");
    console.log(`Exported Private Key (Test): ${prk}`);
}

main();

 */

//Mocha gives us the ability to describe the features that we are implementing by giving us a describe function that encapsulates our expectations.
//The first argument is a simple string that describes the feature, while the second argument is a function that represents the body of the description.

//The it function is very similar to the describe function, except that we can only put expectations in the body of the it function. Let’s use it for our color converter:

//We can now introduce our first expectation. We will use the Chai library and its expect keyword to compare the result of our feature’s implementation and the result we expect to get. 

//This error is telling us that that Node is not able to load Platform. This is because Platform is a native module provided by React Native - i.e. a non-JavaScript module written in Objective-C or Java.
var expect    = require("chai").expect;

describe('account - get_prk', ()=>{
    test('get_prk', ()=>{
        const prk = get_prk("hello12345");
        console.log(`Exported Private Key (Test): ${prk}`);
        expect(1).toBe(1);
    })
})

function test_prk(){
        const prk = get_prk("hello12345");
        console.log(`Exported Private Key (Test): ${prk}`);
        expect(1).toBe(1);
}

test_prk()
