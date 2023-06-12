import crypto from "react-native-quick-crypto";
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
 * Encrypt string with a given password using AES-256 with CTR mode. Used to encrypt the private key in OneFi.
 * @param {string} data - string to be encrypted
 * @param {string} password - password used for symmetric encryption (and decryption)
 * @returns {string} Base64-encoded cipher.
 */
export function encrypt_aes256ctr_base64(data: string, password: string) {
  const key = crypto.createHash("sha256").update(password).digest();
  const cipher = crypto.createCipheriv("aes-256-ctr", key, "00000000000onefi");
  let encrypted = cipher.update(data, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted as string;
}

/**
 * Decrypt Base64-encoded cipher with the given password.
 * @param {string} base64_cipher - cipher produced by encrypt_aes256ctr_base64()
 * @param {string} password - password for decryption
 * @returns {string} Decrypted and decoded plaintext.
 */
export function decrypt_aes256ctr(base64_cipher: string, password: string) {
  const key = crypto.createHash("sha256").update(password).digest();
  const decipher = crypto.createDecipheriv(
    "aes-256-ctr",
    key,
    "00000000000onefi"
  );
  let dec = decipher.update(base64_cipher, "base64", "utf8");
  dec += decipher.final("utf8");
  return dec;
}
