import * as React from "react";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import backgroundImage from "../../assets/background.png";
import buttonBackground from "../../assets/CreateNewUserButtonBackground.png";

export default function AccountInformationScreen({ navigation }) {
  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      className="flex-1 flex-col"
    >
      <Text className="text-white text-3xl mt-6 mb-8 mx-6">
        Account Informtion
      </Text>
      <View className="flex flex-col ml-5 mr-5 bg-slate-800 bg-rounded p-5 rounded-2xl justify-around">
        <View className="flex flex-row mb-5 justify-between">
          <Text className="text-white text-base">Native Currency</Text>
          <View className="rounded-md border-slate-600 bg-slate-600 pl-3 pr-3 py-1">
            <Text className="text-white">***************</Text>
          </View>
        </View>

        <View className="flex flex-row justify-between">
          <Text className="text-white text-base">Country</Text>
          <View className="rounded-md border-slate-600 bg-slate-600 pl-4 pr-3 py-1">
            <Text className="text-white">United States</Text>
          </View>
        </View>
      </View>

      <Text className="text-white text-3xl mt-6 mb-8 mx-6">Legal</Text>
      <View className="flex flex-col ml-5 mr-5 bg-slate-800 bg-rounded p-5 rounded-2xl justify-around">
        <View className="flex flex-row mb-5 justify-between">
          <Text className="text-white text-base">Terms</Text>
          <TouchableOpacity className="rounded-md border-slate-600 bg-slate-600 pl-3 pr-3 py-1">
            <Text className="text-white">View</Text>
          </TouchableOpacity>
        </View>

        <View className="flex flex-row justify-between">
          <Text className="text-white text-base">Privacy Policy</Text>
          <TouchableOpacity className="rounded-md border-slate-600 bg-slate-600 pl-3 pr-3 py-1">
            <Text className="text-white">View</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
