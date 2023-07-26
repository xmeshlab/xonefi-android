import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  Touchable,
  FlatList,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

//import providor component
import Provider from "../Components/Provider";
import { getOneFiRouterList } from "../hooks/getOnefiRouters";
import WifiManager, { WifiEntry } from "react-native-wifi-reborn";
import { PrimaryBtn } from "../Components/PrimaryBtn";

/**
 * This Screen shows the various Available XOneFi Providers. When a Provider is clicked, the user is navigated to the ProviderDetailScreen
 *
 */
export default function ProviderScreen({ navigation }) {
  const [wifiList, setWifiList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getOneFiRouterList(setIsLoading, setWifiList);
  }, []);

  //pass SSID as prop to ProviderDetails Screen
  const flatListRenderItem = useCallback(
    ({ item }) => (
      <Provider
        ProviderName={item.SSID}
        UsersConnectedNumber={5}
        TokenGenNumber={230}
        Status={true}
        navigationFunction={() =>
          navigation.navigate("ProviderDetails", { SSID: item.SSID })
        }
      />
    ),
    []
  );

  return (
    <View className="flex-1">
      <View className="m-2">
        <FlatList
          data={wifiList}
          onRefresh={() => {
            getOneFiRouterList(setIsLoading, setWifiList);
          }}
          refreshing={isLoading}
          ListEmptyComponent={
            <PrimaryBtn
              onPress={() => {
                getOneFiRouterList(setIsLoading, setWifiList);
              }}
            >
              View Providers
            </PrimaryBtn>
          }
          renderItem={flatListRenderItem}
        />
      </View>
    </View>
  );
}
