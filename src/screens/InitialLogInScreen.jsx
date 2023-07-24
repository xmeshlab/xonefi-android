import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import BigBlueButton from "../Components/BigBlueButton";
import XOneFi_Logo_Big from "../icons/XOneFi";
import {
  GoogleIcon,
  GoogleIcon2,
  FacebookIcon,
  FacebookIcon2,
  FacebookLogo3,
  TwitterLogo,
  EmailLogo,
  WeChatIcon, 
  WhatsAppIcon
} from "../icons/sign_in_icon";
import { useContext } from "react";
import { useUserContext } from "../context/UserContext";

const InitialLogInScreen = ({ logInFunction, loginFacebook, loginTwitter }) => {
  const userContext_array = useUserContext()

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
          <TouchableOpacity onPress={()=>{logInFunction(userContext_array[1], userContext_array[3])}} testID="Google Login">
            <GoogleIcon2/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{loginFacebook(userContext_array[1], userContext_array[3])}} testID="Facebook Login">
            <FacebookLogo3 />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{loginTwitter(userContext_array[1], userContext_array[3])}} testID="Twitter Login">
            <TwitterLogo />
          </TouchableOpacity>
        </View>
        <View className="flex flex-row justify-evenly mt-5 mx-5">
          <TouchableOpacity onPress={()=>{logInFunction(userContext_array[1], userContext_array[3])}} testID="Google Login">
            <WeChatIcon/>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{logInFunction(userContext_array[1], userContext_array[3])}} testID="Google Login">
            <WhatsAppIcon/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default InitialLogInScreen;
