/*
SPDX-License-Identifier: GPL-3.0-or-later

Copyright (c) 2020-2023 XOneFi

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

import { NetworkInfo } from "react-native-network-info";
//import RNGetIpAddress from 'react-native-get-ip-address';
import { getIpAddress } from "react-native-device-info";
import call_hello from "../xonefi-api-client/call_hello";
import Web3 from "web3";
import uuid from "../xonefi-api-client/uuid";
import timestamp from "../xonefi-api-client/timestamp";
import session_status from "../xonefi-api-client/session-status";
import client_session from "../xonefi-api-client/client_session";
import sack_timestamp from "../xonefi-api-client/sack-timestamp";
import sackok from "../xonefi-api-client/sackok";
import WiFi from "react-native-wifi-reborn";

function initiate_connection(
  deserealized_ssid,
  chosen_ssid,
  user_password,
  private_key,
  config_json,
  callback
) {
  //const ssid = require("../xonefi-api-client/ssid");
  //const fhs = require("../xonefi-api-client/fast_hotspot_selection");
  const client_session = require("../xonefi-api-client/client_session");
  const session_status = require("../xonefi-api-client/session-status");
  const timestamp = require("../xonefi-api-client/timestamp");
  //const symcrypto = require("../xonefi-api-client/symcrypto");
  const uuid = require("../xonefi-api-client/uuid");
  const hotspot_type = require("../xonefi-api-client/hotspot-type");
  //const scan_counter = require("../xonefi-api-client/scan_counter");
  const config = require("../xonefi-api-client/config");
  const sack_timestamp = require("../xonefi-api-client/sack-timestamp");
  //const wifi_connect = require("../xonefi-api-client/wifi-connect");
  const call_hello = require("../xonefi-api-client/call_hello");
  const call_pafren = require("../xonefi-api-client/call_pafren");
  //const call_handover = require("../xonefi-api-client/call_handover");
  const encode_pafren = require("../xonefi-api-client/encode-pafren");
  const call_sack = require("../xonefi-api-client/call_sack");
  const encode_sack = require("../xonefi-api-client/encode-sack");
  //const sack_number = require("../xonefi-api-client/sack_number");
  //const handover_helper = require("../xonefi-api-client/handover_helper");
  const sackok = require("../xonefi-api-client/sackok");
  //const process_mgmt = require("../xonefi-api-client/process_mgmt");

  const Web3 = require("web3");

  WiFi.getIP().then((ipAddress) => {
      console.log(`XLOG2: Local IP address: ${ipAddress}`);
      if (ipAddress.substring(0, 10) == "192.168.1.") {

  console.log(`Initiating connection to: ${JSON.stringify(deserealized_ssid)}`);

  console.log(`chosen_ssid: ${chosen_ssid}`);

  // wifi_connect.wifi_connect(chosen_ssid, (res) => {
  //     if(res === true) {
  console.log(`Successfully connected to ${chosen_ssid}`);

  console.log(`Initiating the handshake stage`);
  console.log(`connection.js private key: ${private_key}`);

  let hotspot_type_json = hotspot_type.decode_hotspot_type(
    deserealized_ssid.hotspot_type
  );

  let calculated_sack_amount;

  console.log(
    `DEB2@hotspot_type_json.access_method: ${hotspot_type_json.access_method}`
  );
  console.log(`DEB2@deserealized_ssid.cost: ${deserealized_ssid.cost}`);

  if (hotspot_type_json.access_method === "pft") {
    calculated_sack_amount = deserealized_ssid.cost / 60;
  } else if (hotspot_type_json.access_method === "pfd") {
    calculated_sack_amount = deserealized_ssid.cost / 64;
  } else if (hotspot_type_json.access_method === "restricted") {
    calculated_sack_amount = 0;
  } else if (hotspot_type_json.access_method === "free") {
    calculated_sack_amount = 0;
  } else {
    console.log(
      `ERROR: Unknown access type: ${hotspot_type_json.access_method}`
    );
    return callback();
  }

  console.log(`DEB2@calculated_sack_amount: ${calculated_sack_amount}`);

  let calculated_pafren_amount;

  if (hotspot_type_json.access_method === "pft") {
    calculated_pafren_amount =
      deserealized_ssid.cost * deserealized_ssid.pafren * 0.01 * 60;
  } else if (hotspot_type_json.access_method === "pfd") {
    calculated_pafren_amount =
      deserealized_ssid.cost * deserealized_ssid.pafren * 0.01 * 64;
  } else if (hotspot_type_json.access_method === "restricted") {
    calculated_pafren_amount = 0;
  } else if (hotspot_type_json.access_method === "free") {
    calculated_pafren_amount = 0;
  } else {
    console.log(
      `ERROR: Unknown access type: ${hotspot_type_json.access_method}`
    );
    return callback();
  }

  console.log(
    `hotspot_type_json.access_method: ${hotspot_type_json.access_method}`
  );

  let calculated_number_of_sacks;

  // if(hotspot_type_json.access_method === "pft" || hotspot_type_json.access_method === "pfd") {
  //     calculated_number_of_sacks = calculated_pafren_amount / calculated_sack_amount;
  // } else {
  //     calculated_number_of_sacks = 0;
  // }

  if (hotspot_type_json.access_method === "pft") {
    calculated_number_of_sacks =
      calculated_pafren_amount / (calculated_sack_amount * 60);
  } else if (hotspot_type_json.access_method === "pfd") {
    calculated_number_of_sacks =
      calculated_pafren_amount / (calculated_sack_amount * 64);
  } else if (hotspot_type_json.access_method === "restricted") {
    calculated_number_of_sacks = 0;
  } else if (hotspot_type_json.access_method === "free") {
    calculated_number_of_sacks = 0;
  } else {
    console.log(
      `ERROR: Unknown access type: ${hotspot_type_json.access_method}`
    );
    return callback();
  }

  let pafren_length;

  if (hotspot_type_json.access_method === "pft") {
    pafren_length = calculated_number_of_sacks * 60;
  } else if (hotspot_type_json.access_method === "pfd") {
    pafren_length = 3600 * 24; // User has 24 hours to spend 1 GB. TODO: Change in future protocols.
  } else if (hotspot_type_json.access_method === "restricted") {
    pafren_length = 0;
  } else if (hotspot_type_json.access_method === "free") {
    pafren_length = 0;
  } else {
    console.log(
      `ERROR: Unknown access type: ${hotspot_type_json.access_method}`
    );
    return callback();
  }

  client_session.set_client_session(
    {
      status: session_status.status.HANDSHAKE,
      ssid: chosen_ssid,
      ip: deserealized_ssid.ip,
      port: deserealized_ssid.port,
      prefix: deserealized_ssid.prefix,
      pfd: hotspot_type_json.access_method === "pfd",
      pft: hotspot_type_json.access_method === "pft",
      free: hotspot_type_json.access_method === "free",
      restricted: hotspot_type_json.access_method === "restricted",
      sack_number: 0,
      expiration_timestamp:
        timestamp.get_current_timestamp() + config_json.handshake_time,
      cost: deserealized_ssid.cost,
      pafren_percentage: deserealized_ssid.pafren,
      sack_amount: calculated_sack_amount,
      pafren_amount: calculated_pafren_amount,
      number_of_sacks: calculated_number_of_sacks,
      initiated_sack_number: 0,
      sackok: {},
      provider_address: "",
      last_sack_timestamp: 0,
      scan_counter: 0,
      paften_timestamp: 0,
      session_id: "",
    },
    () => {
      // console.log(`CLIENT SESSION: ${JSON.stringify(client_session.get_client_session())}`);
      console.log(`Handshake stage initiated.`);

      config.read_default_config((config_json) => {
        console.log(`Saying HELLO to provider...`);
        console.log(`XLOG2: Preparing to send HELLO.`);

        console.log("Setting a timeout...");
        console.log("Timeout is over.");
        console.log(`XLOG2: Timeout threshold`);

        console.log("DEBUG: deserealized_ssid.ip: " + deserealized_ssid.ip);
        console.log("DEBUG: deserealized_ssid.port: " + deserealized_ssid.port);
        console.log("DEBUG: " + private_key);

        WiFi.getIP().then((ipAddress) => {
          console.log(`XLOG2: Local IP address: ${ipAddress}`);

        if (ipAddress.substring(0, 10) == "192.168.1.") {
          try {
            call_hello.call_hello(
              "137.184.243.11",
              3000,
              new Web3(),
              private_key,
              uuid.generate_unique_id(),
              ipAddress,
              deserealized_ssid.prefix,
              deserealized_ssid.port,
              (response) => {
                console.log(
                  `XLOG2: PROVIDER'S RESPONSE: ${JSON.stringify(response)}`
                );

                let response_json = response;
                console.log(`XLOG2: RESPONSE_JSON: ${response_json}`);
                console.log(
                  `XLOG2: STRINGIGIED RESPONSE_JSON: ${JSON.stringify(
                    response_json
                  )}`
                );

                if (response_json.command.arguments.answer === "HELLO-OK") {
                  //let response_json = JSON.parse(response);
                  //let current_amount = deserealized_ssid.pafren * 0.01 * deserealized_ssid.cost * Math.pow(10, 12);

                  let current_amount =
                    calculated_pafren_amount * Math.pow(10, 12);
                  console.log(`CALCULATED current_amount: ${current_amount}`);

                  let current_timestamp = timestamp.get_current_timestamp();

                  console.log(`=DEB(`);
                  console.log(`deserealized_ssid.ip: ${deserealized_ssid.ip}`);
                  console.log(
                    `deserealized_ssid.port: ${deserealized_ssid.port}`
                  );
                  console.log(`private_key: ${private_key}`);
                  console.log(
                    `response_json.command.session: ${response_json.command.session}`
                  );
                  console.log(
                    `response_json.command.uuid: ${response_json.command.uuid}`
                  );
                  console.log(`current_amount: ${current_amount}`);
                  console.log(`current_timestamp: ${current_timestamp}`);
                  console.log(
                    `config_json.account.address: ${config_json.account.address}`
                  );
                  console.log(
                    `response_json.command.from: ${response_json.command.from}`
                  );
                  console.log(`)DEB=`);

                  try {
                    console.log(`private_key before call_pafren: ${private_key}`);
                    call_pafren.call_pafren(
                      "137.184.243.11",
                      3000,
                      new Web3(),
                      private_key,
                      response_json.command.session,
                      response_json.command.uuid,
                      current_amount,
                      current_timestamp + pafren_length,
                      encode_pafren.encode_pafren(
                        config_json.account.address,
                        response_json.command.from,
                        current_amount,
                        current_timestamp + pafren_length,
                          private_key
                      ),
                      (response1) => {
                        console.log(`PAFREN sent. RESPONSE1: ${response1}`);
                        let response1_json = response1;

                        if (
                          response1_json.command.arguments.answer ===
                          "PAFREN-OK"
                        ) {
                          console.log("Initiating sack sequence");
                          let session = config_json.client_session;
                          session.initiated_sack_number = 1;
                          session.started_timestamp = current_timestamp;
                          session.pafren_timestamp =
                            current_timestamp + pafren_length;
                          session.provider_address =
                            response1_json.command.from;
                          session.session_id = response1_json.command.session;
                          session.status = session_status.status.ACTIVE;
                          client_session.set_client_session(session, () => {
                            config_json.client_session = session;
                            console.log("Calling the first sack");

                            console.log(
                              `config_json.client_session.sack_amount: ${config_json.client_session.sack_amount}`
                            );
                            console.log(
                              `config_json.client_session.sack_number: ${config_json.client_session.sack_number}`
                            );

                            let current_sack_amount =
                              config_json.client_session.sack_amount *
                              (config_json.client_session.sack_number + 1) *
                              Math.pow(10, 12);
                            console.log(
                              `XLOG: config_json.client_session.sack_amount: ${config_json.client_session.sack_amount}`
                            );
                            console.log(
                              `XLOG: config_json.client_session.sack_number: ${config_json.client_session.sack_number}`
                            );
                            console.log(
                              `CALCULATED current_sack_amount: ${current_sack_amount}`
                            );

                            if (hotspot_type_json.access_method === "pft") {
                              console.log(
                                `XLOG: The access method is detected as PFT.`
                              );
                              console.log(
                                `XLOG: deserealized_ssid.ip: ${deserealized_ssid.ip}`
                              );
                              console.log(
                                `XLOG: deserealized_ssid.port: ${deserealized_ssid.port}`
                              );
                              console.log(
                                `XLOG: response1_json.command.session: ${response1_json.command.session}`
                              );
                              console.log(
                                `XLOG: response1_json.command.uuid: ${response1_json.command.uuid}`
                              );
                              console.log(
                                `XLOG: current_sack_amount: ${current_sack_amount}`
                              );
                              console.log(
                                `XLOG: current_timestamp: ${current_timestamp}`
                              );

                              console.log("XLOG: Encode sack parameters:");
                              console.log(
                                `XLOG: config_json.account.address: ${config_json.account.address}`
                              );
                              console.log(
                                `XLOG: response_json.command.from: ${response_json.command.from}`
                              );
                              console.log(
                                `XLOG: current_sack_amount: ${current_sack_amount}`
                              );
                              console.log(
                                `XLOG: current_timestamp: ${current_timestamp}`
                              );
                              console.log(`XLOG: private_key: ${private_key}`);

                              console.log("XLOG: Calling call_sack...");

                              if (ipAddress.substring(0, 10) == "192.168.1.") {
                              call_sack.call_sack(
                                "137.184.243.11",
                                3000,
                                new Web3(),
                                private_key,
                                response1_json.command.session,
                                response1_json.command.uuid,
                                current_sack_amount,
                                current_timestamp,
                                encode_sack.encode_sack(
                                  config_json.account.address,
                                  response_json.command.from,
                                  current_sack_amount,
                                  current_timestamp,
                                  private_key
                                ),
                                (response2) => {
                                  console.log(
                                    `SACK SENT. RESPONSE2: ${response2}`
                                  );

                                  let response2_json = response2;

                                  if (
                                    response2_json.command.arguments.answer ===
                                    "SACK-OK"
                                  ) {
                                    console.log(
                                      "SACK is accepted by provider! Session is active."
                                    );
                                    let session = config_json.client_session;
                                    session.status =
                                      session_status.status.ACTIVE;
                                    session.expiration_timestamp =
                                      current_timestamp + pafren_length;
                                    session.sack_number = 1;
                                    client_session.set_client_session(
                                      session,
                                      () => {
                                        config_json.client_session = session;
                                        sack_timestamp.set_last_sack_timestamp(
                                          response2_json.command.timestamp,
                                          () => {
                                            sackok.set_sackok(
                                              response2_json,
                                              () => {
                                                console.log(
                                                  "XLOG: set_client_session -> set_last_sack_timestamp -> set_sackok Sequence complete."
                                                );
                                                return callback();
                                              }
                                            );
                                          }
                                        );
                                      }
                                    );
                                  }
                                }
                              );
                              } else {
                                console.log("XLOG: Calling call_sack halted due to wrong IP address...");
                              }
                            }
                          });
                        } else if (
                          response1_json.command.arguments.answer ===
                          "PAFREN-UNLIMITED"
                        ) {
                          console.log(
                            "UNLIMITED SESSION ACTIVATED BY THE PROVIDER."
                          );
                          let session = config_json.client_session;
                          session.status = session_status.status.ACTIVE;
                          session.expiration_timestamp =
                            current_timestamp + 3600 * 24 * 365;
                          session.sack_number = 1;
                          client_session.set_client_session(session, () => {
                            sack_timestamp.set_last_sack_timestamp(
                              current_timestamp + 3600 * 24 * 365
                            );
                            return callback();
                          });
                        } else {
                          console.log("ERROR: UNKNOWN RESPONSE TO PAFREN.");
                        }
                      }
                    );
                  } catch (e) {
                    console.log(
                      `XLOG6: ERROR: call_pafren fails as follows: ${e}`
                    );
                  }
                } else {
                  console.log(
                    `The provider is not ready to serve. Continue connecting.`
                  );
                  return callback();
                }
              }
            );

            /// except
          } catch (error) {
            console.log(`XLOG2: CAUGHT ERROR: ${error}`);
            return callback();
          }
          }
        });
      });
    }
  );
  } else {
    console.log(`Connection to: ${JSON.stringify(deserealized_ssid)} has not been established!`);
  }
  });
}

module.exports = { initiate_connection };
