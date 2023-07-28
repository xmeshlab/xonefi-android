import WifiManager, { WifiEntry } from "react-native-wifi-reborn";
import { is_onefi_ssid } from "../hooks/is_onefi_ssid";
import { Platform, PermissionsAndroid } from "react-native";

import { WiFiLevel, WifiWithSignalLevel } from "../types/global";

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

//Gets the list of active XOneFi Routers. returns it
//The function takes two state changing functions as parameters.
export const getOneFiRouterList = async (setIsLoading, setWifiList) => {
  setIsLoading(true);
  try {
    await getPermission();
    const ret = await WifiManager.reScanAndLoadWifiList();

    console.log("XLOG: Got list of WiFi networks as follows...");

    for (let x of ret.values()) {
      console.log("XLOG Entry: " + x.SSID);
    }

    console.log("XLOG: >>>");

    const wifiList = ret
      .filter((item) => is_onefi_ssid(item.SSID))
      .map<WifiWithSignalLevel>((item) => {
        return {
          ...item,
          signalLevel: Math.round(5 - Math.abs(item.level / 20)) as WiFiLevel,
        };
      });
    setWifiList(wifiList);

    for (let x of wifiList) {
      console.log(`XLOG wifilist item: ${x.SSID}`);
    }

    //return wifiList
  } finally {
    setIsLoading(false);
  }
};
