import React from "react";
import { View, Text } from "react-native";
import { useUserContext } from "../../context/UserContext";

import BackgroundBarBlack from "./BackgroundBarBlack";
import BackgroundBarWhite from "./BackgroundBarWhite";

export default function BackgroundBar({ RightSideComponent, LeftText }) {
  const userContext_array = useUserContext();

  //check background color variable in the userContext to determine which background to render
  if(userContext_array[4] == "black"){
    return (
      <BackgroundBarBlack LeftText={LeftText} RightSideComponent={RightSideComponent}/>
    );
  }else{
    return (
      <BackgroundBarWhite LeftText={LeftText} RightSideComponent={RightSideComponent}/>
    );
  }
}
