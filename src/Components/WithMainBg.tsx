import React from "react";
import { ImageBackground, ImageBackgroundProps, View, StyleSheet } from "react-native";
import backgroundBlack from "../../assets/backgroundSquare.png";
import backgroundWhite from "../../assets/BackgroundWhite.png";
import { WhitebackgroundSVG } from "./WhitebackgroundSVG";
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
    return(
      <View style={{
        position: "absolute",
        width: "100%",
        height: "32%",
        bottom: 0,
        zIndex: -1, 
      }}>
        <WhitebackgroundSVG />
      </View>
    )
    /*return (
      <ImageBackground
        resizeMode={"cover"}
        source={backgroundWhite}
        {...otherProps}
        style={otherProps.style}
      >
        {children}
      </ImageBackground>
    );*/
  }
};
