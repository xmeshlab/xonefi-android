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

import { OneFiStorage } from "./storage/OneFiStorage";

/**
 * Retrieve from the client session state the counter of wireless network scans. This parameter is used to
 * eliminate the reentrancy bug in Wi-Fi SSID scanning and prevent reconnection thrashing effect.
 * @returns {Promise<number>>} Number of scans since last counter reset.
 */
export function get_scan_counter() {
  return OneFiStorage.getItem("client_session").then((r) => r.scan_counter);
}

/**
 * Store in the client session state the current scan counter. This function is predominantly to be used to reset
 * the counter by the client.
 * @param {number} counter - number of scans since last counter reset.
 * @returns {Promise<boolean>} true: success, false: failure.
 */
export async function set_scan_counter(counter) {
  // const config = require("./config");
  // let config_json = config.read_default_config();
  // config_json.client_session.scan_counter = parseInt(counter);
  // config.write_default_config(config_json);
  const clientSession = await OneFiStorage.getItem("client_session");
  clientSession.scan_counter = counter;
  await OneFiStorage.setItem("client_session", clientSession);
  return true;
}
