import * as React from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import AssetGain from "../../assets/AssetGainLogo.png";


/**
 * This component is used to display the various cryptocurrencies on the WalletScreen
 */
export default function Asset({
  AssetName,
  AssetAmount,
  AssetLogo,
  AssetPrice,
  AssetChange,
}) {
  const icon = AssetLogo();
  return (
    <View className="flex flex-row bg-gray-800 m-2 rounded-2xl p-2">
      {icon}
      <View className="flex flex-col flex-grow">
        <View className="flex flex-row justify-between pb-1">
          <View className="flex flex-row justify-start">
            <Text className="ml-3 text-white">{AssetName}</Text>
          </View>
          <View className="flex flex-row justify-end">
            <Text className="mr-3 text-white">{AssetAmount}</Text>
          </View>
        </View>

        <View className="flex flex-row justify-between pb-1">
          <View className="flex flex-row justify-start">
            <Text className="ml-3 text-white">
              {"$" + Number(AssetPrice).toLocaleString()}
            </Text>
          </View>
          <View className="flex flex-row justify-end">
            {AssetChange >= 0 ? (
              <Text className="text-green-400 mr-3 pt-1">{AssetChange}%</Text>
            ) : (
              <Text className="text-red-400 mr-3 pt-1">{AssetChange}%</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
