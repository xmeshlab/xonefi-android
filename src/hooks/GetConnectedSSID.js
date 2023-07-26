import NetInfo from "@react-native-community/netinfo";
import { Platform, PermissionsAndroid } from "react-native";

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

//This function returns the SSID of the current connect wifi network.
//It will return a string "Not Connected" if the client is not connected to wifi
//Returns a string Error in case of error
export const getCurrentConnectedSSID = async () => {
  try {
    await getPermission();

    const currentSSID = NetInfo.fetch().then((state) => {
      if (state.isConnected === false) {
        return "Not Connected";
      } else {
        return state.details.ssid;
      }
    });

    return currentSSID;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};
