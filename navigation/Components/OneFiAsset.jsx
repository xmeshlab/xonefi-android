import * as React from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import ethLogo from "../../assets/EthLogo.png";
import AssetGain from "../../assets/AssetGainLogo.png";

export default function OneFiAsset({ AssetAmount, AssetPrice, AssetChange }) {
  return (
    <View className="flex flex-col bg-gray-600 m-2 rounded-lg p-2">
      <Text className="text-white">Onefi</Text>
      <Text className="text-white">OFI</Text>
      <View className="flex flex-row justify-center">
        <Text className="text-white text-4xl mb-2 mt-2">{AssetAmount}</Text>
      </View>

      <View className="flex flex-row justify-around">
        <Text className="text-white">{AssetPrice}</Text>
        <View className="flex flex-row">
          <Image className="mr-1" source={AssetGain} />
          <Text className="text-green-400 mr-3 pt-1">{AssetChange}</Text>
        </View>
      </View>
    </View>
  );
}
