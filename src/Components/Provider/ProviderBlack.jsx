import * as React from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import WifiGreen from "../../../assets/WifiGreen.png";
import WifiWhite from "../../../assets/WifiWhite.png";

/**
 * This is a component for displaying the Provider Information on the Provider Screen.
 *
 * The Provider takes the various props :
 * ProviderName - The name of the provider to be displayed
 * UsersConnectedNumber - The number of users which are currently connected to the Provider
 * TokenGenNumber - The number of tokens that were generated
 * Status - The bool status of the Provider (Active/inActive)
 * navigationFunction - the function which is used to navigate the user to the ProviderDetails screen when the Provider is pressed
 */
export default function ProviderBlack({
  ProviderName,
  UsersConnectedNumber,
  TokenGenNumber,
  Status,
  navigationFunction,
}) {
  return (
    <TouchableOpacity onPress={navigationFunction}  testID="Provider Button">
      <View className="flex flew-col bg-gray-800 m-2 rounded-2xl p-2">
        <View className="flex flex-row justify-start pb-1">
          <Text className="text-white ml-3">{ProviderName}</Text>
        </View>
        <View className="flex flex-row justify-start ml-3">
          {Status ? (
            <>
              <Text className="text-green-400 mt-1">Active</Text>
              <Image source={WifiGreen} />
            </>
          ) : (
            <>
              <Text className="text-neutral-600 mt-1">Inactive</Text>
              <Image source={WifiWhite} />
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}