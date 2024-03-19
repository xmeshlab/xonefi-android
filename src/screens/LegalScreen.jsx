import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Linking } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import ViewButton from "../Components/ViewButton";
import GreyBackgroundBar from "../Components/GreyBackgroundBar";
import GreyBackgroundBox from "../Components/GreyBackgroundBox";

//functions for opening links
const openPrivacyPoligy = async () => {
  // Checking if the link is supported for links with custom URL scheme.
  const supported = await Linking.canOpenURL("https://xmesh.org/PrivacyPolicy");

  if (supported) {
    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    // by some browser in the mobile
    await Linking.openURL("https://xmesh.org/PrivacyPolicy");
  } else {
    Alert.alert("Failed to Open Privacy Policy");
  }
}

//functions for opening links
const openTermsAndConditions = async () => {
  // Checking if the link is supported for links with custom URL scheme.
  const supported = await Linking.canOpenURL("https://xmesh.org/TermsAndConditions");

  if (supported) {
    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    // by some browser in the mobile
    await Linking.openURL("https://xmesh.org/TermsAndConditions");
  } else {
    Alert.alert("Failed to Open Terms and Conditions");
  }
}

export function LegalScreen({ navigation }) {
  return (
    <ScrollView>
      <GreyBackgroundBox
        titleText={"Legal"}
        children={
          <>
            <GreyBackgroundBar
              LeftText={"Terms"}
              RightSideComponent={
                <ViewButton
                  OnPressFunction={
                    openTermsAndConditions
                  }
                />
              }
            />

            <GreyBackgroundBar
              LeftText={"Privacy Policy"}
              RightSideComponent={
                <ViewButton
                  OnPressFunction={
                    openPrivacyPoligy
                  }
                />
              }
            />
          </>
        }
      />
    </ScrollView>
  );
}
