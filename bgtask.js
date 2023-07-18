import BackgroundTimer from "react-native-background-timer";

import {
    read_default_config,
    write_default_config,
    starter_config,
} from "./xonefi-api-client/config";

const worker = require("./client-daemon/worker");

module.exports = async taskData => {
    console.log("XLOG: startClientDaemon 1");
    let global_counter = 0;
    const user_password = "seitlab123!@";
    let decrypted_private_key = "";

    console.log("XLOG: startClientDaemon 2");
    let config_json = starter_config();
    config_json.client_mac = "48:2c:a0:73:fa:9f";
    config_json.client_on = false;
    config_json.pft = true;
    config_json.cft = true;
    config_json.loop_started = false;
    config_json.account_set = false;
    //config_json.account.address = "0x0221B57Cc38C0360f1CAf638e1671243870C0424";

    console.log("XLOG: startClientDaemon 3");

    write_default_config(config_json, () => {
        console.log("XLOG: Config is successfully initialized.");
    });

    console.log("XLOG: startClientDaemon 4");

    let timer_started = false;

    while(true) {

        //await setTimeout(() => {
        //BackgroundTimer.runBackgroundTimer( () => {
        console.log("XLOG: startClientDaemon 5");

        read_default_config((config_json1) => {
            //console.log(`config_json: ${JSON.stringify(config_json)}`);
            //Removing log to try fix "There was a problem sending log messages to your develoopment enviroment error"
            //console.log(`config_json1: ${JSON.stringify(config_json1)}`);

            decrypted_private_key = config_json1.account.dpk;

            if (config_json1.client_on === true) {
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

        await new Promise(resolve => setTimeout(resolve, 5000));
    }



};