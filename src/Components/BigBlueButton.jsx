import * as React from "react";
import { View, Text } from "react-native";
import { PrimaryBtn } from "../../utils/components/PrimaryBtn";

function BigBlueButton({ text, onPressFunction }) {
  return (
    <View className="mx-5 flex flex-row justify-center my-2">
      <PrimaryBtn className="flex-1" onPress={onPressFunction}>
        <Text className="text-white text-sm m-1">{text}</Text>
      </PrimaryBtn>
    </View>
  );
}

export default BigBlueButton;