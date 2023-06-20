import { encrypt_aes256ctr_base64 } from "../src/symcrypto";
import * as uuid from "uuid";
import DeviceInfo from "react-native-device-info";
import { OneFiStorage } from "./storage/OneFiStorage";
import Toast from "react-native-root-toast";
import Web3 from "web3";

/**
 * Generate new Ethereum account and encrypt it using AES256 with CTR mode.
 * @param {string} seed - random seed.
 * @param {string} password - encryption password.
 * @returns {Object} A JSON object that cointains address, unencrypted private key and encrypted private key.
 */
export async function generatedAccount(seed: string, password: string) {
  const web3 = new Web3();

  const res = { address: "", privateKey: "", encryptedPrivateKey: "" };
  // const timed_seed = `${Date.now()}${seed}-${DeviceInfo.getUptime()}-${DeviceInfo.getTotalMemory()}-${DeviceInfo.getCPUUser()}-${DeviceInfo.getFreeMemory()}`;
  const deviceName = await DeviceInfo.getDeviceName();
  const totalMemory = await DeviceInfo.getTotalMemory();
  const usedMemory = await DeviceInfo.getUsedMemorySync();
  const timed_seed =
    Date.now() + uuid.v4().toString() + deviceName + totalMemory + usedMemory;
  const account = web3.eth.accounts.create(timed_seed);
  res.address = account.address;
  res.privateKey = account.privateKey;
  res.encryptedPrivateKey = encrypt_aes256ctr_base64(
    account.privateKey,
    password
  );

  return res;
}

export async function saveAccount(
  address: string,
  privateKey: string,
  encryptedPrivateKey: string
) {
  const accountInfo = await OneFiStorage.getItem("account");
  accountInfo.address = address;
  accountInfo.encrypted_prk = encryptedPrivateKey;
  // accountInfo.account_set = true;
  await Promise.all([
    () => OneFiStorage.setItem("account_set", true),
    () => OneFiStorage.setItem("account", accountInfo),
  ]);
  Toast.show("create success");
}
