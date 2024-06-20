import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
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
import { PrimaryBtn } from "../Components/BigBlueButton/PrimaryBtn";
import WifiLevelIcon from "../icons/WifiLevelIcon";
import LockICon from "../icons/LockIcon";
import { globalStyle } from "../constants/globalStyle";

import { getOneFiRouterList } from "../hooks/getOnefiRouters";

import WifiItem from "../Components/WifiItem/WifiItem";

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
            frequency: item.frequency,
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
    <View className="flex flex-col flex-grow">
      <FlatList<WifiEntry>
        data={wifiList}
        onRefresh={() => {
          getOneFiRouterList(setIsLoading, setWifiList);
        }}
        refreshing={isLoading}
        ListEmptyComponent={
          <PrimaryBtn
            style={style.connectBtn}
            onPress={() => {
              getOneFiRouterList(setIsLoading, setWifiList);
            }}
          >
            View Available Connection
          </PrimaryBtn>
        }
        renderItem={flatListRenderItem}
      />
    </View>
  );
};
export default ConnectScreen;

const style = StyleSheet.create({
  connectBtn: {
    marginLeft: 15,
    marginRight: 15,
  },
});
