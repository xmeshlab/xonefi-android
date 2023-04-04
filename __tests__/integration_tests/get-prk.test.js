import {describe, expect, test} from '@jest/globals';

import {get_prk} from "../../xonefi-api-client/account" 

/**
 * function main() {
    const account = require("../api/account");
    var prk = account.get_prk("hello12345");
    console.log(`Exported Private Key (Test): ${prk}`);
}

main();

 */

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
