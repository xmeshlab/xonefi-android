import NetInfo from "@react-native-community/netinfo";

import { is_onefi_ssid } from "../hooks/is_onefi_ssid";
import {
    Platform,
    PermissionsAndroid
  } from "react-native";

//Function for getting location Permission from Android. 
//Location Permission is required to scan and connect to wifi
async function getPermission() {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location permission is required for WiFi connections",
          message:
            "This app needs location permission as this is required  " +
            "to scan for wifi networks.",
          buttonNegative: "DENY",
          buttonPositive: "ALLOW",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return Promise.resolve();
        // You can now use react-native-wifi-reborn
      } else {
        return Promise.reject("permission deny");
        // Permission denied
      }
    }
  }

  //A function to check if the client is connected to a XOneFi Router
  //This function will find out what wifi network the client is currently connected to,
  //and return true if that client is a XOneFi Router
  //It should return False if the client is not connected to an XOneFi router or if it is not connected to wifi at all
export const isClientConnectedToXoneFi = async () => {
    try {
      await getPermission();

      NetInfo.fetch().then(state => {
        if(state.isConnected === false){
            return false
        }else{
            //debug code
            console.log("state.details.ssid : " + state.details.ssid)
            const isOnefi = is_onefi_ssid(state.details.ssid)
            return isOnefi;
        }
       })
    }catch(e){
        console.log(e)
        return false

    }   
}