import * as React from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import AssetGain from "../../assets/AssetGainLogo.png";

//Via props you can even pass React components as well

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
            <Text className="ml-3 text-white">{AssetPrice}</Text>
          </View>
          <View className="flex flex-row justify-end">
            <Image className="mr-1" source={AssetGain} />
            <Text className="text-green-400 mr-3 pt-1">{AssetChange}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
