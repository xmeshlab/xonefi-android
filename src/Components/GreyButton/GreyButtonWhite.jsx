import { View, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import RightArrowIcon from "../../../assets/RightArrowIcon.png";
/**
 * A react native component for the grey buttons located primarily on the Account Tab
 * @returns
 */
const GreyButtonWhite = ({ imageSource, textInput, onPressFunction }) => {
  return (
    <TouchableOpacity
      onPress={onPressFunction}
      className="flex flex-row bg-slate-100 bg-rounded p-5 rounded-3xl justify-around mb-3"
      testID="Grey Button"
    >
      <Image source={imageSource} className="" />
      <Text className="text-black">{textInput}</Text>
      <Image source={RightArrowIcon} />
    </TouchableOpacity>
  );
};

export default GreyButtonWhite;
