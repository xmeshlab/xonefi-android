import React from "react";
import { View, Text } from "react-native";
import { useUserContext } from "../../context/UserContext";
import GreyBackgroundBoxBlack from "./GreyBackgroundBoxBlack";
import GreyBackgroundBoxWhite from "./GreyBackgroundBoxWhite";

export default function GreyBackgroundBox({ titleText, children }) {
  const userContext_array = useUserContext();

  //check background color variable in the userContext to determine which background to render
  if(userContext_array[4] == "black"){
    return(
      <GreyBackgroundBoxBlack titleText={titleText} children={children}/>
    );
  }else{
    return (
      <GreyBackgroundBoxWhite titleText={titleText} children={children}/>
    )
  }
}
