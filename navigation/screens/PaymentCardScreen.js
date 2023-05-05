import * as React from "react";
import { View, Text, ImageBackground } from "react-native";

import backgroundImage from "../../assets/background.png";

export default function PaymentCardScreen({ navigation }) {
  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      className="flex-1"
    >
      <Text className="font-bold text-white">Payment Card Screen</Text>
    </ImageBackground>
  );
}
