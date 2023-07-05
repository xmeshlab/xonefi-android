/*
SPDX-License-Identifier: GPL-3.0-or-later

Copyright (c) 2020-2021 OneFi <https://onefi.io>

OneFi is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

OneFi Router is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with OneFi Router.  If not, see <https://www.gnu.org/licenses/>.
*/

function send_next_sack(config_json, user_password, private_key) {
  //const ssid = require("../xonefi-api-client/ssid");
  //const fhs = require("../xonefi-api-client/fast_hotspot_selection");
  const client_session = require("../xonefi-api-client/client_session");
  const session_status = require("../xonefi-api-client/session-status");
  const timestamp = require("../xonefi-api-client/timestamp");
  // const symcrypto = require("../xonefi-api-client/symcrypto");
  // const uuid = require("../xonefi-api-client/uuid");
  // const hotspot_type = require("../xonefi-api-client/hotspot-type");
  // const scan_counter = require("../xonefi-api-client/scan_counter");
  const config = require("../xonefi-api-client/config");
  const sack_timestamp = require("../xonefi-api-client/sack-timestamp");
  // const wifi_connect = require("../xonefi-api-client/wifi-connect");
  // const call_hello = require("../xonefi-api-client/call_hello");
  // const call_pafren = require("../xonefi-api-client/call_pafren");
  // const call_handover = require("../xonefi-api-client/call_handover");
  // const encode_pafren = require("../xonefi-api-client/encode-pafren");
  const call_sack = require("../xonefi-api-client/call_sack");
  const encode_sack = require("../xonefi-api-client/encode-sack");
  //const sack_number = require("../xonefi-api-client/sack_number");
  //const handover_helper = require("../xonefi-api-client/handover_helper");
  const sackok = require("../xonefi-api-client/sackok");
  //const process_mgmt = require("../xonefi-api-client/process_mgmt");

  const Web3 = require("web3");

  console.log(
    `Calling send_next_sack() with config_json = ${JSON.stringify(config_json)}`
  );
  let current_sack_amount =
    config_json.client_session.sack_amount *
    (config_json.client_session.sack_number + 1) *
    Math.pow(10, 12);

  let session = config_json.client_session;
  session.status = session_status.status.ACTIVE;
  session.expiration_timestamp = config_json.client_session.pafren_timestamp;
  session.sack_number = session.sack_number + 1;
  client_session.set_client_session(session, () => {
    console.log("XLOG: Client session updated.");
    sack_timestamp.set_last_sack_timestamp(current_timestamp, () => {
      config.read_default_config((config_json) => {
        console.log("XLOG: Last sack timestamp set to the current timestamp.");
        call_sack.call_sack(
          config_json.client_session.ip,
          config_json.client_session.port,
          new Web3(),
          private_key,
          config_json.client_session.session_id,
          "",
          current_sack_amount,
          current_timestamp,
          encode_sack.encode_sack(
            config_json.account.address,
            config_json.client_session.provider_address,
            current_sack_amount,
            current_timestamp,
            private_key
          ),
          (response2) => {
            console.log(`SACK SENT. RESPONSE2: ${response2}`);

            let response2_json = {};

            try {
              //response2_json = JSON.parse(response2);
              response2_json = response2;

              if (response2_json.command.arguments.answer === "SACK-OK") {
                console.log(
                  "SACK is accepted by provider! Active session continues."
                );
                sackok.set_sackok(response2_json, () => {
                  console.log("XLOG: SACK-OK object saved.");
                });
                // let session = config_json.client_session;
                // session.status = session_status.status.ACTIVE;
                // session.expiration_timestamp = config_json.client_session.pafren_timestamp;
                // session.sack_number = session.sack_number + 1;
                // client_session.set_client_session(session);
                // sack_timestamp.set_last_sack_timestamp(response2_json.command.timestamp);
              }
            } catch (e) {
              console.log(`ERROR[be6da098a5]: unable to parsej JSON: ${e}`);
            }
          }
        );
      });
    });
  });

  let current_timestamp = timestamp.get_current_timestamp();
}

module.exports = { send_next_sack };
