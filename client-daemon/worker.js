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

//const ssid = require("../xonefi-api-client/ssid");

function client_worker(config_json, user_password, private_key, callback) {
  const ssid = require("../xonefi-api-client/ssid");
  const client_session = require("../xonefi-api-client/client_session");
  const session_status = require("../xonefi-api-client/session-status");
  const timestamp = require("../xonefi-api-client/timestamp");
  const scan_counter = require("../xonefi-api-client/scan_counter");
  const config = require("../xonefi-api-client/config");
  const sack_number = require("../xonefi-api-client/sack_number");

  console.log(
    `XLOG: @DEB5 config_json.client_session.initiated_sack_number: ${config_json.client_session.initiated_sack_number}`
  );
  console.log(
    `XLOG: @DEB5 config_json.client_session.sack_number: ${config_json.client_session.sack_number}`
  );

  const connection = require("./connection");
  //const handover = require("./handover");
  const next_sack = require("./next_sack");

  // ssid.ssid_scan(config_json.wlan_interface, (networks) => {
  //     ssid.save_ssids(networks.ssids);
  //     console.log("connector ssids:", networks.ssids);
  //     console.log("connector rssis:", networks.rssis);
  //
  //     let results = ssid.filter_onefi_neworks(networks);
  //
  //     console.log("results ssids:", results.ssids);
  //     console.log("results rssis:", results.rssis);
  //
  //     let ind = fhs.fast_hotspot_selection_ng2(results, config_json);
  //     console.log(`FHS: ${results.ssids[ind]} (${results.rssis[ind]})`);
  //
  //     let deserealized_ssid = ssid.deserialize_ssid(results.ssids[ind]);
  //     let chosen_ssid = results.ssids[ind];

  let deserealized_ssid = ssid.deserialize_ssid(
    config_json.client_session.ssid
  );
  let chosen_ssid = config_json.client_session.ssid;

  console.log(`DESEREALIZED: ${JSON.stringify(deserealized_ssid)}`);

  // if(config_json.client_session.status !== session_status.status.EXPIRED) {
  //     if(timestamp.get_current_timestamp() > config_json.client_session.expiration_timestamp) {
  //         let session = config_json.client_session;
  //         session.status = session_status.status.EXPIRED;
  //         client_session.set_client_session(session);
  //         console.log("Session declared as expired");
  //         return callback();
  //     }
  // } else {
  //     let session = config_json.client_session;
  //     session.status = session_status.status.CLOSED;
  //     client_session.set_client_session(session);
  //     console.log("Session declared closed");
  // }

  if (config_json.client_session.status === session_status.status.ACTIVE) {
    // if(deserealized_ssid.prefix === config_json.client_session.prefix) {
    //     initiate_handover(deserealized_ssid, chosen_ssid);
    // } else {

    // ============= uncomment handover later
    // if(config_json.client_session.pft || config_json.client_session.pfd) {
    //     let best_candidate_ssid = results.ssids[fhs.fast_hotspot_selection_ng(results)];
    //     console.log(`BEST CANDIDATE SSID:             ${best_candidate_ssid}`);
    //     console.log(`config_json.client_session.ssid: ${config_json.client_session.ssid}`);
    //
    //     if(handover_helper.handover_match(config_json.client_session.ssid, best_candidate_ssid)) {
    //         console.log(`Handover match.`);
    //
    //         if(config_json.allow_handover) {
    //             handover.initiate_handover(deserealized_ssid, chosen_ssid, user_password, private_key, config_json);
    //         }
    //
    //     }
    // }

    if (config_json.client_session.pft) {
      if (
        timestamp.get_current_timestamp() >=
        config_json.client_session.last_sack_timestamp + 50
      ) {
        console.log(
          `***** Time to send the next sack. Current sack: ${
            config_json.client_session.sack_number
          }, Next sack: ${config_json.client_session.sack_number + 1} *****`
        );
        if (
          config_json.client_session.sack_number ===
          config_json.client_session.number_of_sacks
        ) {
          console.log("*** The session is over ***");
        } else {
          console.log(`XLOG: The session is not over yet on this side.`);
          let initiated_sack_number =
            config_json.client_session.initiated_sack_number;
          //let current_sack_number = sack_number.get_sack_number();

          console.log(
            `XLOG: config_json.client_session.initiated_sack_number=${config_json.client_session.initiated_sack_number}`
          );
          console.log(
            `XLOG: config_json.client_session.sack_number=${config_json.client_session.sack_number}`
          );

          if (
            config_json.client_session.initiated_sack_number ===
            config_json.client_session.sack_number
          ) {
            console.log(`XLOG: @worker.js: Passed the first hurdle.`);
            sack_number.set_initiated_sack_number(
              initiated_sack_number + 1,
              (res) => {
                console.log(`XLOG: @worker.js: Passed the second hurdle.`);
                if (res) {
                  console.log(`XLOG: @worker.js: Passed the third hurdle.`);
                  config.read_default_config((config_json) => {
                    console.log(`XLOG: @worker.js: Passed the fourth hurdle.`);
                    console.log(
                      "XLOG: Successfully set initiated sack number."
                    );
                    if (
                      config_json.client_session.initiated_sack_number !==
                      initiated_sack_number + 1
                    ) {
                      console.log(`@DEB5: catch ya`);
                    }
                    next_sack.send_next_sack(
                      config_json,
                      user_password,
                      private_key,
                      (result11) => {
                      if (result11.command.arguments.answer === "SACK-FAIL") {
                        let session = config_json.client_session;
                        session.status = session_status.status.CLOSED;
                        client_session.set_client_session(session);

                        console.log("XLOG: Writing config for SACK-FAIL");
                        config_json.client_session.status = session.status;
                        config.write_default_config(config_json);
                        console.log("SACK-FAIL: Session is closed");
                      } else{
                        console.log("XLOG3: Successful SACK round completed");
                      }
                      return callback();
                      }
                    );
                  });
                } else {
                  console.log("XLOG: Failure setting initiated sack number.");
                }
              }
            );

            // sack_number.set_initiated_sack_number(initiated_sack_number + 1);
            // //config_json = config.read_default_config();
          }
        }
      }
    }

    console.log(`Continue session`);
    //}
  } else if (
    config_json.client_session.status === session_status.status.HANDSHAKE
  ) {
    if (
      timestamp.get_current_timestamp() >
      config_json.client_session.expiration_timestamp
    ) {
      let session = config_json.client_session;
      session.status = session_status.status.EXPIRED;
      //client_session.set_client_session(session);

      client_session.set_client_session(session, (res) => {
        console.log("XLOG: Writing config for status.EXPIRED");
        config_json.client_session.status = session.status;
        config.write_default_config(config_json);

        console.log("XLOG: Session declared as expired");
        return callback();
      });
    } else {
      console.log(`Continue handshake`);
      return callback();
    }
  } else {
    console.log(
      "INFO: The session is neither active, nor in the handshake mode."
    );
    if (config_json.client_session.scan_counter === 0) {
      connection.initiate_connection(
        deserealized_ssid,
        chosen_ssid,
        user_password,
        private_key,
        config_json,
        () => {
          return callback();
        }
      );
    // The following scan_counter condition branches are deprecated
    } else if (config_json.client_session.scan_counter >= 15) {
      console.log("Trying to scan again");
      scan_counter.set_scan_counter(0, () => {
        console.log("XLOG: Scan counter set to 0.");
        return callback();
      });
    } else {
      console.log("Wait for previous scan to complete");
      //scan_counter.set_scan_counter(config_json.client_session.scan_counter + 1);
      scan_counter.set_scan_counter(
        config_json.client_session.scan_counter + 1,
        () => {
          console.log("XLOG: Scan counter incremented");
          return callback();
        }
      );
    }
  }

  return callback();
  // });
}

module.exports = { client_worker };
