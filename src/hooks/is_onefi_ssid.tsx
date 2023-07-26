/**
 * Check if the given SSID matches the OneFi format.
 * @param {string} ssid - SSID candidate
 * @returns {boolean} true: matches, false: doesn't match.
 */
export function is_onefi_ssid(ssid: string) {
  if (ssid.length > 2) {
    if (ssid[0] === "O" && ssid[1] === "F") {
      let base64_part = ssid.substring(2);
      let decoded_str = Buffer.from(base64_part, "base64").toString("hex");
      return decoded_str.length === 42;
    }
  }

  return false;
}
