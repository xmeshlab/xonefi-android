import {describe, expect, test} from '@jest/globals';

import {set_client_session, get_client_session} from "../../xonefi-api-client/client_session" 

/**
 const client_session = require("../api/client_session");

client_session.set_client_session(
    {
        status: 0,
        ssid: "",
        ip: "",
        "port": 0,
        "prefix": "",
        "pfd": false,
        "pft": false,
        "free": false,
        "restricted": false,
        "sack_number": 0
    }
);

let session_json = client_session.get_client_session();

console.log(`SESSION: ${JSON.stringify(session_json)}`);
 */

describe('client session', ()=>{
    test('set_client_session', ()=>{
        set_client_session(
            {
                status: 0,
                ssid: "",
                ip: "",
                "port": 0,
                "prefix": "",
                "pfd": false,
                "pft": false,
                "free": false,
                "restricted": false,
                "sack_number": 0
            }
        );

        let session_json = client_session.get_client_session();

        console.log(`SESSION: ${JSON.stringify(session_json)}`);
        //Should return true if there is no error
        expect(1).toBe(1);
    })
})

