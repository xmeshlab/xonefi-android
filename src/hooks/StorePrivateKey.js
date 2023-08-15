import AsyncStorage from "@react-native-async-storage/async-storage";

import DeviceInfo from "react-native-device-info";

import { encrypt_aes256ctr_base64 } from "../../xonefi-api-client/symcrypto";


/**
 * This is the function used to store a users private key into persistant storage using AsyncStorage
 * 
 * @param pk - the private key as a string
 */
const storePrivteKey = async (pk) => {
    try {
        let uniqueId = DeviceInfo.getDeviceId();
        //console.log(`DEVICE ID (storage): ${uniqueId}`);
        //console.log(`private key before encryption: ${pk}`);

        let enpk = encrypt_aes256ctr_base64(pk, uniqueId);
        //console.log(`encrypted private key: ${enpk}`);

      await AsyncStorage.setItem(
        "privateKey",
        enpk,
      );
    } catch (error) {
      // Error saving data
      alert(error)
    }
  
  }

  export default storePrivteKey
