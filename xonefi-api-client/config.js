/*
SPDX-License-Identifier: GPL-3.0-or-later

Copyright (c) 2019-2021 OneFi <https://onefi.io>

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


//import AsyncStorage from '@react-native-async-storage/async-storage';
//import storage from 'react-native-sync-storage'

let SQLite = require('react-native-sqlite-storage');


//import * as os from "react-native-os";

//
// /**
//  * Thread/concurrency-safe procedure for reading configuration JSON from the configuration file.
//  * @param {string} config_file - Absolute or relative path to the configuration file.
//  * @returns {Object} JSON object with configuration parameters.
//  */
// function read_config(config_file) {
//     var fs = require('fs');
//     const lockfile = require('proper-lockfile');
//
//     var obj = {}
//     try {
//         lockfile.lockSync(config_file);
//     } catch (e) {
//         console.log(`ERROR @lockSync: ${e}`);
//     }
//
//     var data = fs.readFileSync(config_file, {encoding:'utf8', flag:'r'});
//     try {
//         obj = JSON.parse(data);
//     } catch (err) {
//         obj = {};
//     }
//
//     try {
//         lockfile.unlockSync(config_file);
//     } catch (e) {
//         console.log(`ERROR @unlockSync: ${e}`);
//     }
//
//     return obj;
// }
//
// /**
//  * Thread/concurrency-safe procedure for writing configuration JSON to the configuration file.
//  * @param {string} config_file - Absolute or relative path to the configuration file.
//  * @param {Object} config_json - JSON object to store in the file.
//  * @returns {boolean} true: success; false: failure.
//  */
// function write_config(config_file, config_json) {
//     var fs = require('fs');
//     var lockfile = require("proper-lockfile");
//
//     try {
//         lockfile.lockSync(config_file);
//     } catch (e) {
//         console.log(`ERROR @lockSync: ${e}`);
//     }
//
//     let data = JSON.stringify(config_json);
//     let n = fs.writeFileSync(config_file, data); // TODO: get rid of n. Use try-catch instead.
//
//     try {
//         lockfile.unlockSync(config_file);
//     } catch (e) {
//         console.log(`ERROR @unlockSync: ${e}`);
//     }
//
//     if(n <= 0) { // TODO: safely get rid of this code.
//         return false;
//     } else {
//         return true;
//     }
// }

/**
 * Cross-platform procedure for returning an absolute config path of the configuration file.
 * @returns {{version: string}} Absolute path.
 */
// export function get_config_path() {
//      //const homedir = ".";
//     //const homedir = os.homedir();
//     //const homedir = require('os').homedir();
//     //const path = require('path');
//     //return path.join(homedir, ".onefi.json");
//     return ".onefi.json";
//  }


export function starter_config() {
    return {
        "version": "0.2",
        "account_set": false,
        "client_on": false,
        "ap_on": false,
        "pft": false,
        "pfd": false,
        "cft": false,
        "cfd": false,
        "private_client": false,
        "private_provider": false,
        "max_ofi_mb": 0,
        "max_ofi_hr": 0,
        "price_ofi_mb": 0,
        "price_ofi_hr": 0,
        "infura_api_key": "",
        "network": "goerli",
        "account": {
            "name": "",
            "encrypted_prk": "",
            "address": ""
        },
        "private_providers": [],
        "private_clients": [],
        "provider_ip": "192.168.0.1",
        "port": 3141,
        "wlan_interface": "[none]",
        "ssids": [],
        "pafren_percentage": 100,
        "min_downlink_tier": 10,
        "min_uplink_tier": 9,
        "client_max_pafren": 200,
        "gas_offer": {
            "mainnet": "121000000000",
            "kovan": "2000000",
            "goerli": "100000"
        },
        "gas_price": {
            "mainnet": "121000000000",
            "goerli": "50000000000",
            "kovan": "2000000"
        },
        "call_confirmation_threshold": 2,
        "handshake_time": 300,
        "sack_period": 70,
        "minimum_pafren_length": 3540,
        "expected_sack_amount": 131,
        "expected_pafren_amount": 7900,
        "allow_handover": false,
        "e2e_mode": false,
        "client_session": {
            "status": 0,
            "ssid": "",
            "ip": "",
            "port": 0,
            "prefix": "",
            "pfd": false,
            "pft": false,
            "free": false,
            "restricted": false,
            "sack_number": 0,
            "expiration_timestamp": 0,
            "pafren_timestamp": 0,
            "session_id": "",
            "number_of_sacks": 0,
            "pafren_amount": 0,
            "sack_amount": 0,
            "pafren_percentage": 0,
            "cost": 0,
            "scan_counter": 0,
            "last_sack_timestamp": 0,
            "provider_address": "",
            "initiated_sack_number": 0,
            "sackok": {}
        }
    }
}

export function read_default_config(callback) {
    let db = SQLite.openDatabase("config.db", "1.0", "Test Database", 200000, () => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM Config', [], (tx, results) => {
                console.log("XLOG: Checking the contents of the table.")
                let len = results.rows.length;
                console.log(`XLOG: Found ${len} rows.`);

                if (len > 0) {
                    return callback(JSON.parse(results.rows.item(0).json));
                } else {
                    console.log("XLOG: ERROR: Table Config has no rows.");
                    return callback(null);
                }

            });
        });
    }, (err) => {
        console.log("XLOG: Error opening database 1");
        return callback(false);
    });


    // var db = SQLite.openDatabase("config.db", "1.0", "Test Database", 200000, () => {
    //     console.log("XLOG: Database opened");
    // }, (err) => {
    //     console.log("XLOG: Error opening database");
    // });


    // try {
    //     const jsonValue = await AsyncStorage.getItem('config');
    //     //const jsonValue = await storage.get('config');
    //     return jsonValue != null ? JSON.parse(jsonValue) : starter_config();
    // } catch(e) {
    //     return {"error": true};
    // }
}


export function write_default_config(config_json, callback) {
    let db = SQLite.openDatabase("config.db", "1.0", "Test Database", 200000, () => {
        db.transaction((tx) => {
            tx.executeSql(`UPDATE Config SET json = '${JSON.stringify(config_json)}' WHERE id = 0`, [], (tx, results) => {
                console.log("XLOG: Successfully updated config.");
                return callback(true);
            });
        });
    }, (err) => {
        console.log("XLOG: Error opening database 1");
        return callback(false);
    });


    // try {
    //     const jsonValue = JSON.stringify(config_json)
    //     await AsyncStorage.setItem('config', jsonValue)
    //     //await storage.set('config', jsonValue);
    //     return true;
    // } catch (e) {
    //     return false;
    // }

    //
    //
    //
    // const getData = async () => {
    //     try {
    //         const jsonValue = await AsyncStorage.getItem(`@config`)
    //         if(jsonValue === "" || jsonValue === null) {
    //
    //         }
    //         let ret = jsonValue != null ? JSON.parse(jsonValue) : null;
    //
    //     } catch(e) {
    //         // error reading value
    //     }
    // }
    //
    // const storeData = async (value) => {
    //     try {
    //         const jsonValue = JSON.stringify(value)
    //         await AsyncStorage.setItem('@storage_Key', jsonValue)
    //         return true;
    //     } catch (e) {
    //         // saving error
    //         return false;
    //     }
    // }



    //return true;
}

//  /**
//   * Safe procedure for checking the existence of configuratin (state) file.
//   * @returns {boolean} true: configuration (state file) exists; false: the file does not exist.
//   */
//  function config_exists() {
//     const fs = require('fs');
//      const lockfile = require("proper-lockfile");
//
//     try {
//         if (fs.existsSync(get_config_path())) {
//             return true;
//         }
//     } catch(err) {
//         return false;
//     }
//
//     return false;
//  }
//
//  /**
//   * Thread/concurrency-safe procedure for initialization of a config with pre-defined values. The default values are
//   * taken from onefi-sample-config.json
//   * @returns {boolean} true: success; false: failure.
//   */
// function config_init() {
//     const fs = require('fs');
//     //const lockfile = require("proper-lockfile");
//
//      try {
//          const data = fs.readFileSync('../onefi-sample-config.json', 'utf8')
//
//         try {
//             fs.writeFileSync(get_config_path(), data, {flag:'w'});
//           } catch(err) {
//             console.error(err);
//             return false;
//         }
//
//      } catch (err) {
//         console.error(err)
//     }
//
//     return true;
// }
//



/**
 * Thread/concurrency-safe procedure for initialization of a config with pre-defined values only in the case if
 * the configuration (system state) file (a.k.a. onefi.json) is absent. The default values are
 * taken from onefi-sample-config.json
 * @returns {boolean} true: success; false: failure.
 */
export async function config_init_if_absent(callback) {
    let db = await SQLite.openDatabase("config.db", "1.0", "Test Database", 200000, () => {
        console.log("XLOG: config_init_if_absent: Database opened");
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Config (id INTEGER PRIMARY KEY AUTOINCREMENT, json TEXT)', [], (tx, results) => {
                console.log("XLOG: Results", results);
                tx.executeSql('SELECT * FROM Config', [], (tx, results) => {
                    console.log("Query completed");

                    // Get rows with Web SQL Database spec compliance.

                    let len = results.rows.length;

                    if(len === 0) {
                        console.log("XLOG: The table is empty.")
                        tx.executeSql(`INSERT INTO Config (id, json) VALUES (0, '${JSON.stringify(starter_config())}')`, [], (tx, results) => {
                            console.log("XLOG: Initialized config with a starter code.")

                            tx.executeSql('SELECT * FROM Config', [], (tx, results) => {
                               console.log("XLOG: Checking the contents of the table.")
                                let len = results.rows.length;
                                console.log(`XLOG: Found ${len} rows.`);
                                for (let i = 0; i < len; i++) {
                                    let row = results.rows.item(i);
                                    console.log(`ID: ${row.id}, JSON: ${row.json}`);
                                }
                                return callback(true);
                            });

                        });
                    } else {
                        console.log("XLOG: The table is already populated.")
                        return callback(true);
                    }

                    // for (let i = 0; i < len; i++) {
                    //     let row = results.rows.item(i);
                    //     console.log(`Employee name: ${row.name}, Dept Name: ${row.deptName}`);
                    // }

                    return callback(true);
                });
            });
        }, (err) => {
            console.log("XLOG: Error opening database 1");
            return callback(false);
        });

    // if(!config_exists()) {
    //     config_init();
    //     return true;
    // } else {
    //     return false;
    // }
    //}
    },  () => {
            console.log("XLOG: Error opening database");
        }
    );
}


//
//
// /**
//  * Thread/concurrency-safe procedure for reading the current configuration (state) JSON from the configuration file.
//  * @returns {Object} JSON object with configuration and current system state parameters.
//  */
// function read_default_config() {
//     return read_config(get_config_path());
// }
//
// /**
//  * Thread/concurrency-safe procedure for writing configuration JSON to the current configuration file.
//  * @param {Object} config_json - JSON object to store in the current configuration (system state) file.
//  * @returns {boolean} true: success; false: failure.
//  */
// function write_default_config(config_json) {
//     return write_config(get_config_path(), config_json);
// }
//
// /**
//  * Thread/concurrency-safe async procedure for reading the current configuration (state) JSON from the configuration file.
//  * @param {function} callback - retunrs a JSON object with configuration and current system state parameters.
//  */
// function read_default_config_db(callback) {
//     return callback(read_config(get_config_path()));
// }
//
// /**
//  * Thread/concurrency-safe procedure for writing configuration JSON to the current configuration file.
//  * @param {Object} config_json - JSON object to store in the current configuration (system state) file.
//  * @param {function} callback: returns true on success or false on failure.
//  */
// function write_default_config_db(config_json, callback) {
//     return callback(write_default_config(config_json));
// }

// module.exports = {
//     read_config,
//     write_config,
//     read_default_config_db,
//     write_default_config_db,
//     get_config_path,
//     config_exists,
//     config_init_if_absent,
//     read_default_config,
//     write_default_config
// };

module.exports = {
    read_default_config,
    write_default_config,
    starter_config,
    config_init_if_absent
};