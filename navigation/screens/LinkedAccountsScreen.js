import * as React from "react";
import { useState } from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import LinkedPaymentCardIcon from "../../assets/LinkedPaymentCardIcon.png";
import RightArrowIcon from "../../assets/RightArrowIcon.png";
import UserIcon from "../../assets/UserIcon.png";
import CreateNewUserIcon from "../../assets/CreateNewUserIcon.png";
import LogoutIcon from "../../assets/LogoutIcon.png";
import { TouchableOpacity } from "react-native-gesture-handler";
//This Screen Should just be an option under accounts
import GreyButton from "../Components/GreyButton";

import { useCallback } from "react";

export default function LinkedAccountScreen({ navigation }) {
  const onTouchableOpacityPress = useCallback(
    () => navigation.navigate("Account Information"),
    []
  );

  return (
    //<View className="flex-1 flex-col bg-black pt-5">
    <View
      className="flex-1 flex-col pt-5"
      style={{ backgroundColor: "rgba(0,0,0,0.0)" }}
    >
      <GreyButton
        imageSource={LinkedPaymentCardIcon}
        textInput={"Linked Payment Card"}
        onPressFunction={() => navigation.navigate("Linked Payment Card")}
      />
      <GreyButton
        imageSource={UserIcon}
        textInput={"Account Information"}
        onPressFunction={onTouchableOpacityPress}
      />
      <GreyButton
        imageSource={CreateNewUserIcon}
        textInput={"Create New Account"}
        onPressFunction={() => navigation.navigate("Create New Account")}
      />
      <GreyButton
        imageSource={LogoutIcon}
        textInput={"Logout"}
        onPressFunction={() => navigation.navigate("Logout")}
      />
    </View>
  );
}
