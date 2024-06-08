import React from "react";
import { View, Text } from "react-native";

export default function BackgroundBarBlack({ RightSideComponent, LeftText }) {
    return (
      <View className="flex flex-row mb-5 justify-between items-center">
        <Text className="text-white text-base">{LeftText}</Text>
        {RightSideComponent}
      </View>
    );
}
