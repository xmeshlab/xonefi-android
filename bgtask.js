import BackgroundTimer from "react-native-background-timer";


import { test_call_provider_newprice } from "./xonefi-api-client/call_provider_newprice";

import {
  read_default_config,
  write_default_config,
  starter_config,
} from "./xonefi-api-client/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeviceInfo from "react-native-device-info";
import {decrypt_aes256ctr} from "./xonefi-api-client/symcrypto";
import Web3 from "web3";
import { test_call_provider_update } from "./xonefi-api-client/call_provider_update";

const worker = require("./client-daemon/worker");

module.exports = async (taskData) => {
  console.log("XLOG: startClientDaemon 1");
  let global_counter = 0;
  const user_password = "seitlab123!@";
  let decrypted_private_key = "";

  console.log("XLOG: startClientDaemon 2");
  let config_json = starter_config();
  config_json.client_on = false;
  config_json.pft = true;
  config_json.cft = true;
  config_json.loop_started = false;
  config_json.account_set = false;


  // test_call_provider_newprice((ret) => {
  //   console.log(`Successfully called test_call_provider_newprice: ${ret}`);
  // });

  // test_call_provider_update((ret) => {
  //   console.log(`Successfully called test_call_provider_update: ${JSON.stringify(ret)}`);
  // });

  console.log("XLOG: startClientDaemon 3");

  write_default_config(config_json, () => {
    console.log("XLOG: Config is successfully initialized.");
    read_default_config((config_json1) => {
      console.log(`config_json1: ${JSON.stringify(config_json1)}`);

      const value = AsyncStorage.getItem("privateKey").then(value1 => {
        console.log(`VALUE: ${value1}`);
        if (value1 !== null) {
          let uniqueId = DeviceInfo.getDeviceId();
          decrypted_private_key = decrypt_aes256ctr(value1, uniqueId);

          let Web3 = require("web3");
          let web3 = new Web3();
          let account = web3.eth.accounts.privateKeyToAccount(decrypted_private_key);

          config_json1.account.address = account.address;
          config_json1.account_set = true;

          write_default_config(config_json1, () => {
            console.log("XLOG: Config is successfully written.");
          });
        }
      });
    });
  });

  console.log("XLOG: startClientDaemon 4");

  let timer_started = false;

  while (true) {
    //await setTimeout(() => {
    //BackgroundTimer.runBackgroundTimer( () => {
    console.log("XLOG: startClientDaemon 5");

    read_default_config((config_json1) => {
      console.log(`config_json1: ${JSON.stringify(config_json1)}`);

      if(config_json1.client_on === true) {
        console.log("XLOG: startClientDaemon 7");
        console.log(
          "XLOG: config_json.client_session.status pre: " +
            config_json1.client_session.status
        );
        worker.client_worker(
          config_json1,
          user_password,
          decrypted_private_key,
          () => {
            console.log(`${global_counter}: Client is on`);
            global_counter++;
            console.log(
              "XLOG: config_json.client_session.status post: " +
                config_json.client_session.status
            );
          }
        );
      } else {
        console.log(`${global_counter}: Client is off`);
        global_counter++;
      }
    });

    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
};
