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

//A function for getting the link speed information of the current connected ssid
//returns an array with index 0 being linjspeed in mbps, index 1 being the recieve linkspeed in mbps, and index 2 being the transmit linkspeed in mbps
//returns an empty array if device is not connected or if there is an error
export const getCurrentLinkpeed = async () => {
  try {
    await getPermission();

    const linkspeeds = NetInfo.fetch().then((state) => {
      if (state.isConnected === false) {
        return [];
      } else {
        return [
          state.details.linkSpeed,
          state.details.rxLinkSpeed,
          state.details.txLinkSpeed,
        ];
      }
    });

    return Promise.resolve(linkspeeds);
  } catch (e) {
    console.log(e);
    return [];
  }
};
