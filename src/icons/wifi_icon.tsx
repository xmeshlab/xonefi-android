import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const WifiIcon = (props: SvgProps) => (
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

export function WifiIcon36(props: SvgProps) {
  return (
    <Svg
      width={34}
      height={35}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M5.667 16.083a12.75 12.75 0 0112.75 12.75M5.667 6.167a22.667 22.667 0 0122.666 22.667M7.083 28.833a1.417 1.417 0 100-2.833 1.417 1.417 0 000 2.833z"
        stroke={props.color ?? "#fff"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
