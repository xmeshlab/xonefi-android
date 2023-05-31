import * as React from "react";
import { View, Text, Image, ImageBackground } from "react-native";

import backgroundImage from "../../assets/background.png";
import { useParams } from 'react-router-dom'

export default function LogoutScreen({ navigation,}) {

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      className="flex-1"
    >
      <Text className="text-white">Logout Screen</Text>
    </ImageBackground>
  );
}
