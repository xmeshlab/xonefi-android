import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function SearchIcon(props) {
  return (
    <Svg
      width={16}
      height={17}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M11.714 3.42a6.276 6.276 0 11-8.875 8.876 6.276 6.276 0 018.875-8.876M15 15.582l-3.29-3.29"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
