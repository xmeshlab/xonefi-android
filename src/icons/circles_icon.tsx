import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const CircleIcon = (props: SvgProps) => (
  <Svg
    width={35}
    height={35}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      clipRule="evenodd"
      d="M5.833 9.566a3.733 3.733 0 0 1 3.734-3.733v0A3.733 3.733 0 0 1 13.3 9.566v0A3.733 3.733 0 0 1 9.567 13.3v0a3.733 3.733 0 0 1-3.734-3.734v0ZM5.833 24.5a3.733 3.733 0 0 1 3.734-3.733v0A3.733 3.733 0 0 1 13.3 24.5v0a3.733 3.733 0 0 1-3.733 3.733v0A3.733 3.733 0 0 1 5.833 24.5v0ZM28.233 9.566A3.733 3.733 0 0 1 24.5 13.3v0a3.733 3.733 0 0 1-3.733-3.734v0A3.733 3.733 0 0 1 24.5 5.833v0a3.733 3.733 0 0 1 3.733 3.733v0Z"
      stroke={props.color ?? "#fff"}
      strokeWidth={2.188}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M24.566 24.434a.093.093 0 1 1-.132.132.093.093 0 0 1 .132-.132M20.833 20.7a.093.093 0 1 1-.132.132.093.093 0 0 1 .132-.132M20.833 28.167a.093.093 0 1 1-.132.132.093.093 0 0 1 .132-.132M28.3 28.167a.093.093 0 1 1-.133.132.093.093 0 0 1 .132-.132M28.3 20.7a.093.093 0 1 1-.133.132.093.093 0 0 1 .132-.132"
      stroke={props.color ?? "#fff"}
      strokeWidth={2.188}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CircleIcon;
