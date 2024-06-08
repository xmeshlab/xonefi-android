import React from "react";
import { View, Text } from "react-native";

export default function BackgroundBarWhite({ RightSideComponent, LeftText }) {
    return (
      <View className="flex flex-row mb-5 justify-between items-center">
        <Text className="text-black text-base">{LeftText}</Text>
        {RightSideComponent}
      </View>
    );
}
