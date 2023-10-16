import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

//24 was original height width
export const BarIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M6.934 20.5v-4M13.29 20.5v-10M19.645 20.5v-16"
      stroke={props.color ?? "#fff"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export function BarIcon36(props: SvgProps) {
  return (
    <Svg
      width={37}
      height={37}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M9.579 30.5v-6M18.579 30.5v-15M27.579 30.5v-24"
        stroke={props.color ?? "#fff"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
