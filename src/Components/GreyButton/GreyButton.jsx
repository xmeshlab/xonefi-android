import React from "react";
import { useUserContext } from "../../context/UserContext";

import GreyButtonBlack from "./GreyButtonBlack";
import GreyButtonWhite from "./GreyButtonWhite";

/**
 * A react native component for the grey buttons located primarily on the Account Tab
 * @returns
 */
const GreyButton = ({ imageSource, textInput, onPressFunction }) => {
  const userContext_array = useUserContext();

  //check background color variable in the userContext to determine which background to render
  if(userContext_array[4] == "black"){
    return (
      <GreyButtonBlack imageSource={imageSource} textInput={textInput} onPressFunction={onPressFunction}/>
    );
  }else{
    return (
      <GreyButtonWhite imageSource={imageSource} textInput={textInput} onPressFunction={onPressFunction}/>
    );
  }
};

export default GreyButton;
