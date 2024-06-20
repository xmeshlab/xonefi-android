import * as React from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useUserContext } from "../../context/UserContext";

import WifiGreen from "../../../assets/WifiGreen.png";
import WifiWhite from "../../../assets/WifiWhite.png";

import ProviderWhite from "./ProviderWhite";
import ProviderBlack from "./ProviderBlack";
/**
 * This is a component for displaying the Provider Information on the Provider Screen.
 *
 * The Provider takes the various props :
 * ProviderName - The name of the provider to be displayed
 * UsersConnectedNumber - The number of users which are currently connected to the Provider
 * TokenGenNumber - The number of tokens that were generated
 * Status - The bool status of the Provider (Active/inActive)
 * navigationFunction - the function which is used to navigate the user to the ProviderDetails screen when the Provider is pressed
 */
export default function Provider({
  ProviderName,
  UsersConnectedNumber,
  TokenGenNumber,
  Status,
  navigationFunction,
}) {
  const userContext_array = useUserContext();

  //check background color variable in the userContext to determine which background to render
  if(userContext_array[4] == "black"){
    return (<ProviderBlack ProviderName={ProviderName} Status={Status} navigationFunction={navigationFunction}/>);
  }else{
    return(<ProviderWhite ProviderName={ProviderName} Status={Status} navigationFunction={navigationFunction}/>);

  }
}