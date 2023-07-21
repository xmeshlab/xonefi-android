import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import WifiManager, { WifiEntry } from "react-native-wifi-reborn";

import ChevronRight from "../icons/chevron_right";
import { useNavigation } from "@react-navigation/native";
import { GlobalRoute } from "../MainContainer";
import {
  RouteComponent,
  WiFiLevel,
  WifiWithSignalLevel,
} from "../types/global";
import { NavigationProp } from "@react-navigation/core/src/types";
import { PrimaryBtn } from "../Components/PrimaryBtn";
import WifiLevelIcon from "../icons/WifiLevelIcon";
import LockICon from "../icons/LockIcon";
import { globalStyle } from "../constants/globalStyle";

import { getOneFiRouterList } from "../hooks/getOnefiRouters";

const ConnectScreen: RouteComponent<"Connect"> = () => {
  const navigation = useNavigation<NavigationProp<GlobalRoute>>();
  const [wifiList, setWifiList] = useState<WifiWithSignalLevel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  //A useEffect which calls the getOneFiRouterList hook when the page first loads
  //This gets us a list of available XOneFi routers
  useEffect(() => {
    getOneFiRouterList(setIsLoading, setWifiList);
  }, []);

  const flatListRenderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("PayAndConnect", {
            BSSID: item.BSSID,
            SSID: item.SSID,
            frequency: item.frequency
          })
        }
      >
        <WifiItem
          frequency={item.frequency}
          signalLevel={item.signalLevel}
          key={item.BSSID}
          SSID={item.SSID}
        />
      </TouchableOpacity>
    ),
    []
  );

  return (
      <View className="flex flex-col">
        <FlatList<WifiEntry>
          data={wifiList}
          onRefresh={()=>{getOneFiRouterList(setIsLoading, setWifiList)}}
          refreshing={isLoading}
          ListEmptyComponent={
            <PrimaryBtn style={style.connectBtn} onPress={()=>{getOneFiRouterList(setIsLoading, setWifiList)}}>
              View Available Connection
            </PrimaryBtn>
          }
          renderItem={flatListRenderItem}
        />
      </View>
  );
};
export default ConnectScreen;

//A Component for the available XOneFi Routers icons displayed on the ConnectScreen
const WifiItem = ({
  SSID,
  frequency,
  signalLevel,
}: Partial<WifiWithSignalLevel>) => {
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
      <ChevronRight />
    </View>
  );
};


const style = StyleSheet.create({
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
