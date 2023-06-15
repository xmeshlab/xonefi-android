import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import BigBlueButton from "../Components/BigBlueButton";
import XOneFi_Logo_Big from "../icons/XOneFi";
import {
  GoogleIcon,
  FacebookIcon,
  FacebookIcon2,
  FacebookLogo3,
  TwitterLogo,
  EmailLogo,
  WeChatLogo
} from "../icons/sign_in_icon";

const InitialLogInScreen = ({ logInFunction, loginFacebook, loginTwitter }) => {
  return (
    <View className="h-screen">
      <View className="flex flex-row justify-center w-screen absolute top-1/4">
        <XOneFi_Logo_Big />
      </View>

      <View className="absolute top-1/2 w-screen">
        <Text className="text-white text-2xl mb-5 mx-auto left-0 right-0">
          Login
        </Text>
        <View className="flex flex-row justify-around">
          <TouchableOpacity onPress={logInFunction} testID="Google Login">
            <GoogleIcon />
          </TouchableOpacity>

          <TouchableOpacity onPress={loginFacebook} testID="Facebook Login">
            <FacebookLogo3 />
          </TouchableOpacity>
          <TouchableOpacity onPress={loginTwitter} testID="Twitter Login">
            <TwitterLogo />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default InitialLogInScreen;
