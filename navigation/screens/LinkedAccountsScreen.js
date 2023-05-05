import * as React from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import LinkedPaymentCardIcon from "../../assets/LinkedPaymentCardIcon.png";
import RightArrowIcon from "../../assets/RightArrowIcon.png";
import UserIcon from "../../assets/UserIcon.png";
import CreateNewUserIcon from "../../assets/CreateNewUserIcon.png";
import LogoutIcon from "../../assets/LogoutIcon.png";
import { TouchableOpacity } from "react-native-gesture-handler";
//This Screen Should just be an option under accounts

import backgroundImage from "../../assets/background.png";
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
      <TouchableOpacity
        onPress={() => navigation.navigate("Linked Payment Card")}
        className="flex flex-row bg-slate-800 bg-rounded p-5 rounded-3xl justify-around mb-3"
      >
        <Image source={LinkedPaymentCardIcon} className="" />
        <Text className="text-white">Linked Payment Card</Text>
        <Image source={RightArrowIcon} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onTouchableOpacityPress}
        className="flex flex-row bg-slate-800 bg-rounded p-5 rounded-3xl justify-around mb-3"
      >
        <Image source={UserIcon} />
        <Text className="text-white">Account Information</Text>
        <Image source={RightArrowIcon} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Create New Account")}
        className="flex flex-row bg-slate-800 bg-rounded p-5 rounded-3xl justify-around mb-3"
      >
        <Image source={CreateNewUserIcon} className="" />
        <Text className="text-white">Create New Account</Text>
        <Image source={RightArrowIcon} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Logout")}
        className="flex flex-row bg-slate-800 bg-rounded p-5 rounded-3xl justify-around mb-3"
      >
        <Image source={LogoutIcon} className="" />
        <Text className="text-white">Logout</Text>
        <Image source={RightArrowIcon} />
      </TouchableOpacity>
    </View>
    //</View>
  );
}
