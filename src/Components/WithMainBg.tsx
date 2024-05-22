import React from "react";
import { ImageBackground, ImageBackgroundProps } from "react-native";
import backgroundBlack from "../../assets/backgroundSquare.png";
import backgroundWhite from "../../assets/BackgroundWhite.png";
import { useUserContext } from "../context/UserContext";

export const WithMainBg = ({
  children,
  ...otherProps
}: ImageBackgroundProps) => {

  const userContext_array = useUserContext();

  //check background color variable in the userContext to determine which background to render
  if(userContext_array[4] == "black"){
    return (
      <ImageBackground
        resizeMode={"cover"}
        source={backgroundBlack}
        {...otherProps}
        style={otherProps.style}
      >
        {children}
      </ImageBackground>
    );
  }else{
    return (
      <ImageBackground
        resizeMode={"cover"}
        source={backgroundWhite}
        {...otherProps}
        style={otherProps.style}
      >
        {children}
      </ImageBackground>
    );
  }
};
