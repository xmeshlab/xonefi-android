import * as React from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

//import providor component
import Provider from "../Components/Provider";

//You can't have an imported Component in a View

import backgroundImage from "../../assets/background.png";

export default function ProviderDetailScreen({ navigation }) {
  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      className="flex-1 flex-col"
    >
      <Text className="text-white text-xl mt-6 mb-1 mx-6">
        Router Information
      </Text>
      <View className="flex flex-col ml-5 mr-5 bg-slate-800 bg-rounded p-5 rounded-2xl justify-around">
        <View className="flex flex-row mb-2 justify-between">
          <Text className="text-white text-base">Router Name</Text>
          <View className="rounded-md border-slate-600 bg-slate-600 pl-3 pr-3 py-1">
            <Text className="text-white">***************</Text>
          </View>
        </View>

        <View className="flex flex-row justify-between mb-2">
          <Text className="text-white text-base">IP Address</Text>
          <View className="rounded-md border-slate-600 bg-slate-600 pl-4 pr-3 py-1">
            <Text className="text-white">__.__.__.__</Text>
          </View>
        </View>

        <View className="flex flex-row justify-between">
          <Text className="text-white text-base">WiFi Speed</Text>
          <View className="rounded-md border-slate-600 bg-slate-600 pl-4 pr-3 py-1">
            <Text className="text-white">130 mbs</Text>
          </View>
        </View>
      </View>

      <Text className="text-white text-xl mt-3 mb-1 mx-6">Sharing Setting</Text>
      <View className="flex flex-col ml-5 mr-5 bg-slate-800 bg-rounded p-5 rounded-2xl justify-around">
        <View className="flex flex-row mb-2 justify-between">
          <Text className="text-white text-base">OFI/GB</Text>
          <TouchableOpacity className="rounded-md border-slate-600 bg-slate-600 pl-3 pr-3 py-1">
            <Text className="text-white">View</Text>
          </TouchableOpacity>
        </View>

        <View className="flex flex-row justify-between mb-2">
          <Text className="text-white text-base">Private Connection</Text>
          <TouchableOpacity className="rounded-md border-slate-600 bg-slate-600 pl-3 pr-3 py-1">
            <Text className="text-white">View</Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row justify-between">
          <Text className="text-white text-base">Share Times/Daily</Text>
          <TouchableOpacity className="rounded-md border-slate-600 bg-slate-600 pl-3 pr-3 py-1">
            <Text className="text-white">Time</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text className="text-white text-xl mt-3 mb-1 mx-6">
        Connected Clients
      </Text>
      <View className="flex flex-col ml-5 mr-5 bg-slate-800 bg-rounded p-5 rounded-2xl justify-around">
        <View className="flex flex-row mb-2 justify-between">
          <Text className="text-white text-base">OFI/GB</Text>
          <TouchableOpacity className="rounded-md border-slate-600 bg-slate-600 pl-3 pr-3 py-1">
            <Text className="text-white">View</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
