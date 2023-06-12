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

// /**
//  * Read (from configuration) the current client session JSON object.
//  * @returns {Object} Client session JSON object.
//  */
function get_client_session(callback) {
  const config = require("./config");
  config.read_default_config((config_json) => {
    return callback(config_json.client_session);
  });
}

// /**
//  * Set (save in configuration) the current client session multi-field object.
//  * @param {Object} session - client session JSON object.
//  * @returns {boolean} true - success, false - failure.
//  */
function set_client_session(session, callback) {
  const config = require("./config");
  // let config_json = config.read_default_config();
  // config_json.client_session = session;
  // config.write_default_config(config_json);
  // return true;

  config.read_default_config((config_json) => {
    config_json.client_session = session;
    config.write_default_config(config_json, (res) => {
      return callback(res);
    });
  });
}

module.exports = { get_client_session, set_client_session };
