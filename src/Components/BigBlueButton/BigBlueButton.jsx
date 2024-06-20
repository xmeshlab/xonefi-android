import * as React from "react";
import { View, Text } from "react-native";
import { PrimaryBtn } from "./PrimaryBtn";
/**
 * This component is the big blue buttons found throughout the application.
 *
 * It takes in two props : the text to display and the function to call once the button is pressed.
 *
 */
function BigBlueButton({ text, onPressFunction }) {
    return (
      <View
        className="mx-5 flex flex-row justify-center my-2"
        testID="Big Blue Button"
      >
        <PrimaryBtn className="flex-1" onPress={onPressFunction}>
          <Text className="text-white text-sm m-1">{text}</Text>
        </PrimaryBtn>
      </View>
    );
}

export default BigBlueButton;
