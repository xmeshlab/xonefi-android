import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const ArrowUpIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={31}
    height={32}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color ?? "#fff"}
      d="M15.364 24.647c.627 0 1.07-.444 1.07-1.08V11.655l-.077-2.083 2.498 2.787 2.2 2.18c.192.193.462.318.761.318.588 0 1.032-.443 1.032-1.051 0-.28-.106-.54-.337-.772L16.154 6.67a1.096 1.096 0 0 0-.79-.338 1.1 1.1 0 0 0-.801.338l-6.347 6.365a1.063 1.063 0 0 0-.337.772c0 .608.434 1.051 1.022 1.051.309 0 .579-.125.772-.318l2.19-2.18 2.507-2.797-.087 2.093v11.912c0 .636.444 1.08 1.08 1.08Z"
    />
  </Svg>
);

export default ArrowUpIcon;
