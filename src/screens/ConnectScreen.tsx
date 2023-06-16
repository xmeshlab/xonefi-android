import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
//for wifi
import { PermissionsAndroid, NativeModules } from "react-native";
import WifiManager, { WifiEntry } from "react-native-wifi-reborn";

import ChevronRight from "../icons/chevron_right";
import { useNavigation } from "@react-navigation/native";
import { GlobalRoute } from "../MainContainer";
import {
  RouteComponent,
  WiFiLevel,
  WifiWithSignalLevel,
} from "../../types/global";
import { NavigationProp } from "@react-navigation/core/src/types";
import { PrimaryBtn } from "../Components/PrimaryBtn";
import WifiLevelIcon from "../icons/WifiLevelIcon";
import LockICon from "../icons/LockIcon";
import { globalStyle } from "../constants/globalStyle";

//import { is_onefi_ssid } from "../../api/client";
/**
 * Check if the given SSID matches the OneFi format.
 * @param {string} ssid - SSID candidate
 * @returns {boolean} true: matches, false: doesn't match.
 */
function is_onefi_ssid(ssid: string) {
  if (ssid.length > 2) {
    if (ssid[0] === "O" && ssid[1] === "F") {
      let base64_part = ssid.substring(2);
      let decoded_str = Buffer.from(base64_part, "base64").toString("hex");
      return decoded_str.length === 42;
    }
  }

  return false;
}

import {
  read_default_config,
  write_default_config,
} from "../../xonefi-api-client/config";

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

//bg-gradient-to-br from-blue via-black to-red"
const tabBtnList = ["Hourly", "Data Usage", "Private"];
console.log("NativeModules.XOneFiWiFiModule", NativeModules.XOneFiWiFiModule);

const ConnectScreen: RouteComponent<"Connect"> = () => {
  const navigation = useNavigation<NavigationProp<GlobalRoute>>();
  // navigation.navigate
  const [wifiList, setWifiList] = useState<WifiWithSignalLevel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentActive, setCurrentActive] = useState("Hourly");
  const getWifiList = useCallback(async () => {
    setIsLoading(true);
    try {
      await getPermission();
      // const configs = await NativeModules.XOneFiWiFiModule.getWiFiConfiguration();
      // const connectInfo = await NativeModules.XOneFiWiFiModule.getConnectionInfo();
      //const ret = await WifiManager.loadWifiList();
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
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    getWifiList();
  }, []);

  const flatListRenderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("PayAndConnect", {
            BSSID: item.BSSID,
            SSID: item.SSID,
          })
        }
      >
        <WifiItem
          frequency={item.frequency}
          signalLevel={item.signalLevel}
          key={item.BSSID}
          SSID={item.SSID}
          price={0.8}
        />
      </TouchableOpacity>
    ),
    []
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={style.tabBar}>
        <View style={style.tabBarInner}>
          {tabBtnList.map((tab) => {
            const tabStyle = [
              style.tabBtn,
              currentActive === tab ? style.tabBtnActive : null,
            ];
            return (
              <TouchableOpacity
                key={tab}
                style={tabStyle}
                onPress={() => setCurrentActive(tab)}
              >
                <Text style={style.tabBtnText}>{tab}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View style={style.mgnTop}>
        <FlatList<WifiEntry>
          data={wifiList}
          onRefresh={getWifiList}
          refreshing={isLoading}
          ListEmptyComponent={
            <PrimaryBtn style={style.connectBtn} onPress={getWifiList}>
              View Available Connection
            </PrimaryBtn>
          }
          renderItem={flatListRenderItem}
        />
      </View>
    </View>
  );
};
export default ConnectScreen;

const WifiItem = ({
  SSID,
  price,
  frequency,
  signalLevel,
}: Partial<WifiWithSignalLevel> & { price: number }) => {
  return (
    <View style={style.wifiItem}>
      <View
        style={[
          style.wifiItemText,
          globalStyle.row,
          globalStyle.verticalCenter,
          { marginRight: 15 },
        ]}
      >
        <WifiLevelIcon signalLevel={signalLevel} />

        <LockICon style={{ marginLeft: 15, marginTop: 5 }} />
      </View>
      <Text style={style.wifiItemText}>{SSID}</Text>
      <Text style={style.wifiItemText}>{price} OFI/GB</Text>
      <ChevronRight />
    </View>
  );
};
const style = StyleSheet.create({
  mgnTop: { marginTop: 80 },
  tabBar: {
    marginTop: 18,
    height: 51,
    backgroundColor: "rgba(40, 40, 40, 0.48)", //
    position: "absolute",
    left: 15,
    right: 15, // alignItems: 'center',
    justifyContent: "center",
    borderRadius: 10,
  },
  tabBarInner: {
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tabBtn: {
    color: "#fff",
    width: 97,
    height: 33,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15.6,
    fontSize: 14,
  },
  tabBtnText: {
    color: "#fff",
  },
  tabBtnActive: {
    backgroundColor: "rgba(153, 153, 153, 0.42)",
  },
  wifiItem: {
    flexDirection: "row",
    height: 78,
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 2,
    borderBottomColor: "rgba(33, 145, 251, 0.095)",
    borderStyle: "solid",
  },
  wifiItemText: {
    flex: 1,
    color: "#fff",
  },
  connectBtn: {
    marginLeft: 15,
    marginRight: 15,
  },
});
