import React from "react";
import { ImageBackground, ImageBackgroundProps } from "react-native";
import backgroundImage2 from "../../assets/background.png";

export const WithMainBg = ({
  children,
  ...otherProps
}: ImageBackgroundProps) => {
  return (
    <ImageBackground
      resizeMode={"cover"}
      source={backgroundImage2}
      {...otherProps}
      style={otherProps.style}
    >
      {children}
    </ImageBackground>
  );
};
