import * as React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from "react-native";

import backgroundImage from "../../assets/background.png";
import buttonBackground from "../../assets/CreateNewUserButtonBackground.png";
import BigBlueButton from "../Components/BigBlueButton";

export default function LinkedPaymentCardScreen({ navigation }) {
  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      className="flex-1 flex-col"
    >
      <Text className="text-white text-xl mt-6 mb-1 mx-6">
        Add New Payment Card
      </Text>
      <Text className="pl-8 text-slate-600 text-base">Card Holder</Text>
      <View className="flex flex-col ml-5 mr-5 bg-slate-800 bg-rounded p-2 rounded-2xl justify-around">
        <View className="flex flex-row  justify-between">
          <View className="pl-3 pr-3">
            <TextInput
              selectionColor="#FFF"
              placeholderTextColor="#FFF"
              placeholder="John Doe"
            />
          </View>
        </View>
      </View>

      <Text className="pl-8 text-slate-600 text-base mt-2">Card Number</Text>
      <View className="flex flex-col ml-5 mr-5 bg-slate-800 bg-rounded p-2 rounded-2xl justify-around">
        <View className="flex flex-row  justify-between">
          <View className="pl-3 pr-3">
            <TextInput
              selectionColor="#FFF"
              placeholderTextColor="#FFF"
              placeholder="John Doe"
            />
          </View>
        </View>
      </View>

      <View className="flex flex-row">
        <View className="flex flex-col w-6/12">
          <Text className="pl-8 text-slate-600 text-base mt-2">CSV</Text>
          <View className="flex flex-col ml-5 mr-5 bg-slate-800 bg-rounded p-2 rounded-2xl justify-around">
            <View className="flex flex-row  justify-between">
              <View className="pl-3 pr-3">
                <TextInput
                  selectionColor="#FFF"
                  placeholderTextColor="#FFF"
                  placeholder="John Doe"
                />
              </View>
            </View>
          </View>
        </View>

        <View className="flex flex-col w-6/12">
          <Text className="pl-8 text-slate-600 text-base mt-2">EXP</Text>
          <View className="flex flex-col ml-5 mr-5 bg-slate-800 bg-rounded p-2 rounded-2xl justify-around">
            <View className="flex flex-row  justify-between">
              <View className="pl-3 pr-3">
                <TextInput
                  selectionColor="#FFF"
                  placeholderTextColor="#FFF"
                  placeholder="John Doe"
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <BigBlueButton
        text={"Add Payment Card"}
        onPressFunction={() => {
          alert("Button Pressed");
        }}
      />
    </ImageBackground>
  );
}
