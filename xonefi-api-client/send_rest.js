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

const dgram = require("react-native-udp");

/**
 * Send RESTFul message without reading the response.
 * @param {string} ip - IPv4 address of the UDP server.
 * @param {int} port - UDP port.
 * @param {string} msg - message to be sent.
 * @param {function} callback Passes true on success and false on failure.
 */
function send_udp(ip, port, msg, callback) {
  const dgram = require("react-native-udp");
  const message = Buffer.from(msg);
  const client = dgram.createSocket("udp4");
  client.send(message, port, ip, (err) => {
    console.log(`Error: ${err}`);

    client.close(() => {
      if (err) {
        return callback(false);
      } else {
        return callback(true);
      }
    });
  });
}

/**
 * Send UDP message and read the response.
 * @param {string} ip - IPv4 address of the UDP server.
 * @param {int} port - UDP port.
 * @param {string} msg - message to be sent.
 * @param {function} callback Passes the response.
 */
function send_udp2(ip, port, msg, callback) {
  const dgram = require("react-native-udp");
  const socket = dgram.createSocket("udp4");

  socket.bind();
  socket.on("listening", () => {
    socket.setBroadcast(true);

    socket.send(msg, port, ip, (err) => {
      console.log(err ? err : "Sent");
    });

    socket.on("message", (buffer, sender) => {
      const message = buffer.toString();
      socket.close();
      return callback(message);
    });

    socket.on("error", (error) => {
      return callback(error);
    });
  });
}

function send_rest(ip, port, msg, callback) {
  console.log(`XLOG2: calling send_rest()`);
  console.log(`XLOG2: send_rest()::msg: ${msg}`);

  fetch("http://137.184.243.11:3000/client", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: msg,
  })
    .then((response) => response.json())
    .then((json) => {
      console.log("XLOG2: send_rest(): then->json");
      return callback(json);
    })
    .catch((error) => {
      console.log("XLOG2: send_rest(): ERROR: CANNOT FETCH");
    });
}


function send_rest_provider(ip, port, msg, callback) {
  console.log(`XLOG2: calling send_rest_provider()`);
  console.log(`XLOG2: send_rest_provider()::msg: ${msg}`);

  fetch("http://137.184.243.11:3000/provider", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: msg,
  })
      .then((response) => response.json())
      .then((json) => {
        console.log("XLOG2: send_rest_provider(): then->json");
        return callback(json);
      })
      .catch((error) => {
        console.log("XLOG2: send_rest_provider(): ERROR: CANNOT FETCH");
      });
}


module.exports = { send_rest, send_rest_provider };
