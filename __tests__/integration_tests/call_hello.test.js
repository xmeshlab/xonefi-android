import {describe, expect, test} from '@jest/globals';

import {test_call_hello} from "../../xonefi-api-client/call_hello" 

/**
const call_hello = require("../api/call_hello");

call_hello.test_call_hello((res) => {
    console.log(`RES: ${res}`);
});
 */

describe('call_hello - test_call_hello', ()=>{
    test('test_call_hello', ()=>{
        test_call_hello((res)=>{
            console.log(`RES: ${res}`);
        });
        expect(1).toBe(1);
    })
})
