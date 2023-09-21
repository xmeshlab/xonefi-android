import NetInfo from "@react-native-community/netinfo";

import { is_onefi_ssid } from "../hooks/is_onefi_ssid";
import { Platform, PermissionsAndroid } from "react-native";

//Function for getting location Permission from Android.
//Location Permission is required to scan and connect to wifi
export async function getPermission() {
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

    //Netinfo seems to return an undefined ssid at times. Work around this by using WifiManager
    const isConnectedToOnefi = await NetInfo.fetch().then((state) => {
      if (state.isConnected === false) {
        return false;
      } else {
        if(state.details.ssid != undefined){
          const isOnefi = is_onefi_ssid(state.details.ssid);
          return isOnefi;
        }else{
          return false
        }
      }
    });

    return isConnectedToOnefi;
  } catch (e) {
    alert("Error : " + e)
    console.log(e);
    return false;
  }
};
