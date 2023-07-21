import React from "react";
import { ImageBackground, ImageBackgroundProps } from "react-native";
import backgroundImage from "../../assets/backgroundSquare.png";

export const WithMainBg = ({
  children,
  ...otherProps
}: ImageBackgroundProps) => {
  return (
    <ImageBackground
      resizeMode={"cover"}
      source={backgroundImage}
      {...otherProps}
      style={otherProps.style}
    >
      {children}
    </ImageBackground>
  );
};
