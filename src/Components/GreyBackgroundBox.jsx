import React from "react";
import { View, Text } from "react-native";

export default function GreyBackgroundBox({ titleText, children }) {
  return (
    <>
      <Text className="text-white text-2xl mt-6 mb-3 mx-6">{titleText}</Text>
      <View className="flex flex-col ml-5 mr-5 bg-slate-800 bg-rounded p-5 rounded-2xl justify-around">
        {children}
      </View>
    </>
  );
}
