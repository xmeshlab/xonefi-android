import { OneFiStorage } from "./storage/OneFiStorage";

/**
 * @description Get current client statusL whether the client is on or off.
 */
export async function get_client_status(): Promise<boolean> {
  return await OneFiStorage.getItem("client_on");
}

/**
 * Set (save in configuration) the current status of OneFi client.
 * @param {boolean} enable - client status (true = enabled, false = disabled).
 * @returns {Promise<boolean>} true - success, false - failure.
 */
export async function set_client_status(enable: boolean) {
  return await OneFiStorage.setItem("client_on", enable);
}

/**
 * @description Read the value of the PFD (pay for data) parameter value
 * from OneFi configuration.
 * @return Promise<boolean>
 */
export async function get_pay_for_data(): Promise<boolean> {
  return OneFiStorage.getItem("pfd");
}

/**
 * Read the client PFT (pay for time) parameter value from OneFi configuration.
 * @returns {Promise<boolean>} true: client agrees to pay for time; false:  client disagrees to pay for time.
 */
export async function get_pay_for_time() {
  return OneFiStorage.getItem("pft");
}

/**
 * Set (save in configuration) the current status of PFT (pay-for-time) client parameter.
 * @param {boolean} enabled - client PFT (true = enabled, false = disabled).
 * @returns {Promise<boolean>} true - success, false - failure.
 */
export function set_pay_for_time(enabled: boolean) {
  return OneFiStorage.setItem("pft", enabled);
}

/**
 * Read the private client parameter value from OneFi configuration.
 * @returns {Promise<boolean>} true: client agrees for private connections; false: client disagrees for private (restricted) connections.
 */
function get_private_client() {
  return OneFiStorage.getItem("private_client");
}

/**
 * Set (save in configuration) the current status of private client parameter.
 * @param {boolean} enabled - private (restricted) client parameter (true = enabled, false = disabled).
 * @returns {Promise<boolean>} true: success; false: failure.
 */
function set_private_client(enabled: boolean) {
  return OneFiStorage.setItem("private_client", enabled);
}

/**
 * Read from OneFi configuration the maximum number of OneFi tokens the client is ready to pay for one gigabyte of
 * data in the PFD mode.
 * @returns {Promise<number>} maximum number of OFI (OneFi points/tokens) the client is willing to pay for one GB of data.
 */
function get_max_ofi_mb() {
  return OneFiStorage.getItem("max_ofi_mb");
}

/**
 * Set (save in configuration) the maximum number of OneFi tokens (points) that the client is ready to pay
 * for one gigabyte of data in the PFD (pay-for-data) mode.
 * @param {number} max_price - maximum number of OFI (OneFi tokens/points) the client is willing to pay.
 * @returns {Promise<number>} true: success; false: failure.
 */
function set_max_ofi_mb(max_price: number) {
  return OneFiStorage.setItem("max_ofi_mb", max_price);
}

/**
 * Read from OneFi configuration the maximum number of OneFi tokens the client is ready to pay for one hour
 * of unlimited Internet connection in the PFT (pay-for-time) mode.
 * @returns {Promise<number>} maximum number of OFI (OneFi points/tokens) the client is willing to pay for one hour of connection.
 */
function get_max_ofi_hr() {
  return OneFiStorage.getItem("max_ofi_hr");
}

/**
 * Set (save in configuration) the maximum number of OneFi tokens (points) that the client is ready to pay
 * for one hour of Internet traffic in the PFT (pay-for-time) mode.
 * @param {number} max_price - maximum number of OFI (OneFi tokens/points) the client is willing to pay.
 * @returns {Promise<void>} true: success; false: failure.
 */
function set_max_ofi_hr(max_price) {
  return OneFiStorage.setItem("max_ofi_hr", max_price);
}

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
