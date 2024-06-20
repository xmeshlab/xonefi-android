import React from "react";
import { View, Text } from "react-native";

export default function GreyBackgroundBoxWhite({ titleText, children }) {
    return (
      <>
        <Text className="text-black text-2xl mt-6 mb-3 mx-6">{titleText}</Text>
        <View className="flex flex-col ml-5 mr-5 bg-slate-100 bg-rounded p-5 rounded-2xl justify-around text-black">
          {children}
        </View>
      </>
    );
  }