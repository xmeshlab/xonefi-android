import * as React from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import ProviderBackground from "../../assets/ProviderComponentBackground.png";
import WifiGreen from "../../assets/WifiGreen.png";
import WifiWhite from "../../assets/WifiWhite.png";
import Bars from "../../assets/ProviderBars.png";
import arrow from "../../assets/RightArrowIcon.png";

export default function Provider({
  ProviderName,
  UsersConnectedNumber,
  TokenGenNumber,
  Status,
}) {
  return (
    <View className="flex flew-col bg-gray-800 m-2 rounded-2xl p-2">
      <View className="flex flex-row justify-between pb-1">
        <View className="flex flex-row justify-start">
          <Image source={Bars} />
          <Text className="text-white ml-3">{ProviderName}</Text>
        </View>
        <View className="flex flex-row justify-end">
          <Text className="text-green-400 mt-1">Active</Text>
          <Image source={WifiGreen} />
        </View>
      </View>
      <View className="flex flex-row justify-around">
        <Text className="text-white">{UsersConnectedNumber}</Text>
        <Text className="text-white">USERS {"\n"} CONNECTED</Text>
        <Text className="text-white">{TokenGenNumber}</Text>
        <Text className="text-white">OFI TOKEN {"\n"} GENERATED</Text>
        <Image source={arrow} />
      </View>
    </View>
  );
}

