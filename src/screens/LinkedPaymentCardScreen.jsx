import * as React from "react";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from "react-native";
import BigBlueButton from "../Components/BigBlueButton/BigBlueButton";
import GreyTextInputBar from "../Components/GreyTextInputBar";

export default function LinkedPaymentCardScreen({ navigation }) {
  const [cardHolder, setCardHolder] = useState();
  const [cardNumber, setCardNumber] = useState();
  const [cardCSV, setCardCSV] = useState();
  const [cardEXP, setCardEXP] = useState();

  return (
    <View>
      <Text className="text-white text-xl mt-6 mb-1 ml-7">
        Add New Payment Card
      </Text>
      <Text className="pl-8 text-slate-400 text-base">Card Holder</Text>
      <GreyTextInputBar
        placeholder_text={"Enter Full Name"}
        state_function={setCardHolder}
      />

      <Text className="pl-8 text-slate-400 text-base mt-2">Card Number</Text>
      <GreyTextInputBar
        placeholder_text={"Enter Card Number"}
        state_function={setCardNumber}
      />

      <View className="flex flex-row">
        <View className="flex flex-col w-6/12">
          <Text className="pl-8 text-slate-400 text-base mt-2">CSV</Text>
          <GreyTextInputBar
            placeholder_text={"Enter CSV"}
            state_function={setCardCSV}
          />
        </View>

        <View className="flex flex-col w-6/12">
          <Text className="pl-8 text-slate-400 text-base mt-2">EXP</Text>
          <GreyTextInputBar
            placeholder_text={"Enter EXP"}
            state_function={setCardEXP}
          />
        </View>
      </View>
      <View className="mt-3">
        <BigBlueButton
          text={"Add Payment Card"}
          onPressFunction={() => {
            alert("Button Pressed");
          }}
        />
      </View>
    </View>
  );
}
