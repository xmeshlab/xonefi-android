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

/**
 * Call OneFi provider to provide the next cryptographic satisfaction acknowledgement (SACK).
 * @param {string} ip - IP address of OneFi AP.
 * @param {int} port - UDP port of OneFi AP.
 * @param {Web3} web3 - Web3 object. Will be obsoleted in the future.
 * @param {string} prk - Client private key.
 * @param {string} session - UUID of the current session.
 * @param {string} re - UUID of the message that this message replies to.
 * @param {string} amount - Number of OFI points endoresed to freeze by the PAFREN.
 * NOTE: Use string instead of int here to avoid overflow.
 * @param {int} current_timestamp - Current UNIX timestamp (with seconds precision/granularity).
 * @param {string} sack - Serialized SACK. Please see encode_sack() for generation thereof.
 * @param {function} callback - Return status: true - success, false - failure.
 */
function call_sack(ip, port, web3, prk, session, re, amount, current_timestamp, sack, callback) {
    console.log("XLOG: @call_sack: entering the function.");
    const uuid = require('uuid');
    const send_rest = require('./send_rest');

  var message = {};
  let pubaddress = web3.eth.accounts.privateKeyToAccount(prk).address;

  message.command = {};
  message.command.op = "SACK";
  message.command.from = pubaddress;
  msg_uuid = uuid.v4().toString();
  message.command.uuid = msg_uuid;
  message.command.timestamp = current_timestamp;
  message.command.session = session;
  message.command.re = "";
  message.command.client_ip = "";
  message.command.provider_prefix = "";
  message.command.arguments = {};
  message.command.arguments.sack = {
    client: pubaddress,
    amount: Math.ceil(Number(amount)).toString(),
    timestamp: current_timestamp,
    proof: sack,
  };

  var signature_json = web3.eth.accounts.sign(
    JSON.stringify(message.command),
    prk
  );

  message.signature = signature_json.signature;

    send_rest.send_rest(ip, port, JSON.stringify(message), (result) => {
        return callback(result);
    });
}

module.exports = { call_sack };
