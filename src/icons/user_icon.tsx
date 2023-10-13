import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

//Original height weight was 24
export const UserIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M20.421 21.5v-2a4 4 0 0 0-4-4h-8a4 4 0 0 0-4 4v2M12.421 11.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
      stroke={props.color ?? "#fff"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export function UserIcon36(props) {
  return (
    <Svg
      width={37}
      height={37}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M30.421 32v-3a6 6 0 00-6-6h-12a6 6 0 00-6 6v3M18.421 17a6 6 0 100-12 6 6 0 000 12z"
        stroke={props.color ?? "#fff"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default UserIcon;
