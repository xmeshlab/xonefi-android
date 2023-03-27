//import {generatedAccount} from "../../api/account"
import {describe, expect, test} from '@jest/globals';

import {generate_account} from "../../xonefiapi/account" 

/**function main() {
    var acc = account.generate_account("0123456789abcdef", "password123!");

    console.log(`ACCOUNT: ${JSON.stringify(acc)}`);
}

main();*/


/**
 * Unlike any other current JS-based polyfills, react-native-quick-crypto is written in C/C++ JSI and provides much greater performance - especially on mobile devices. QuickCrypto can be used as a drop-in replacement for your Web3/Crypto apps to speed up common cryptography functions.
 * 
 * you can use react-native-quick-crypto for a fully native implementation
 * 
 */


/*describe('account - generate_account test', ()=>{
    test('Generate Account', ()=>{
        const acc = generatedAccount("0123456789abcdef", "password123!");

        console.log(`ACCOUNT: ${JSON.stringify(acc)}`);
        expect(1).toBe(1);
    })
})*/

describe('account - generate_account test', ()=>{
    test('Generate Account', ()=>{
        const acc = generate_account("0123456789abcdef", "password123!");

        console.log(`ACCOUNT: ${JSON.stringify(acc)}`);
        expect(1).toBe(1);
    })
})

