import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { colors } from "../../constants/colors";

function LockICon(props: SvgProps) {
  return (
    <Svg
      width={21}
      height={21}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M16.625 9.625H4.375a1.75 1.75 0 00-1.75 1.75V17.5c0 .966.784 1.75 1.75 1.75h12.25a1.75 1.75 0 001.75-1.75v-6.125a1.75 1.75 0 00-1.75-1.75zM6.125 9.625v-3.5a4.375 4.375 0 018.75 0v3.5"
        stroke={props?.color ?? colors.light}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default LockICon;
