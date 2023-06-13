import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const WifiIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M4 11.5a9 9 0 0 1 9 9M4 4.5a16 16 0 0 1 16 16M5 20.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
      stroke={props.color ?? "#fff"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default WifiIcon;
