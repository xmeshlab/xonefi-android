import React, { FunctionComponent } from "react";
import { RouteProp } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ImageBackground,
} from "react-native";
import { SearchIcon } from "../../icons/search_icon";
//componets
import TextInputEntry from "../../Components/TextInputEntry";
import BigBlueButton from "../../Components/BigBlueButton/BigBlueButton";

interface OwnProps {}

type Props = OwnProps;

const AccountAddCrptoPaymentCard: FunctionComponent<Props & RouteProp<any>> = (
  props
) => {
  return (
    <ScrollView style={{ backgroundColor: "transparent" }}>
      <View className="flex flex-col ml-5 mr-5">
        <Text className="text-white text-xl mb-8 mx-3">
          Add Crypto Payment Card
        </Text>
        <View className="bg-rounded bg-backgroundBox p-5 rounded-2xl mb-5 justify-around">
          <TextInputEntry input_text={"Account Address"} />
          <TextInputEntry input_text={"Private Key"} />
          <TextInputEntry input_text={"Password"} />
          <TextInputEntry input_text={""} />
        </View>
        <BigBlueButton
          text={"Add Payment Card"}
          onPressFunction={() => {
            alert("Button Pressed");
          }}
        />
      </View>
    </ScrollView>
  );
};

export default AccountAddCrptoPaymentCard;
