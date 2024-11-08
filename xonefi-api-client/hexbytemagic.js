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
 * Convert a hexadecimal string into the corresponding bytestring
 * @param {string} str - hexadecimal string
 * @returns {string} Corresponding ASCII raw string.
 */
function hex_string_to_bytes(str) {
  let bytes = [];
  for (let i = 0; i < str.length; i += 2) {
    bytes.push(parseInt(str.substr(i, 2), 16));
  }

  return bytes;
}

module.exports = { hex_string_to_bytes };
