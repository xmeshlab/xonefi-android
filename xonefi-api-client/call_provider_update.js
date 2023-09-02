/*
SPDX-License-Identifier: GPL-3.0-or-later

Copyright (c) 2019-2023 XOneFi

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

import uuid from "react-native-uuid";

function call_provider_update(
  ip,
  port,
  web3,
  prk,
  cloud_ip,
  router_no,
  cost,
  prefix,
  callback
) {
  console.log(`XLOG2: calling call_provider_newprice()`);

  var message = new Object();

  let pubaddress = web3.eth.accounts.privateKeyToAccount(prk).address;

  console.log(`XLOG2: call_provider_update()::pubaddress: ${pubaddress}`);

  message.command = new Object();
  message.command.op = "UPDATE";
  message.command.from = pubaddress;
  let msg_uuid = uuid.v4().toString();
  message.command.uuid = msg_uuid;
  message.command.timestamp = Math.floor(new Date() / 1000);
  message.command.re = "";
  message.command.arguments = new Object();
  //message.command.arguments.price = price;
  message.command.arguments.cloud_ip = cloud_ip;
  message.command.arguments.router_no = router_no;
  message.command.arguments.cost = cost;
  message.command.arguments.prefix = prefix;

  var signature_json = web3.eth.accounts.sign(
    JSON.stringify(message.command),
    prk
  );

  message.signature = signature_json.signature;

  console.log("XLOG2: call_provider_update()::message: " + JSON.stringify(message));

  const send_rest = require("./send_rest");

  try {
    send_rest.send_rest_provider(ip, port, JSON.stringify(message), (result) => {
      console.log(`XLOG2: call_provider_update() post send_rest()`);
      return callback(result);
    });
  } catch (e) {
    console.log(`@call_provider_update: ERROR: send_rest failed: ${e}`);
  }
}


function test_call_provider_update(callback) {
  var Web3 = require("web3"); // Library to work with Etheretum smart contracts
  var web3 = new Web3();
  let prk = "0x91fd81e7d3ed26c72ad904b89744f685f3dbbf358ff0ebd8f26c9747a178fb60";

  call_provider_update("137.184.243.11", "3000", web3, prk, "137.184.243.11", 3141, 1234,"d1feb8d074", (ret) => {
    return callback(ret);
  });
}

module.exports = { call_provider_update, test_call_provider_update };
