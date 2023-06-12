import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

function SuccessIcon(props: SvgProps) {
  return (
    <Svg
      width={22}
      height={16}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M20 1.96L7.625 14.337 2 8.71"
        stroke={props.color ?? "#0E60FF"}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SuccessIcon;
