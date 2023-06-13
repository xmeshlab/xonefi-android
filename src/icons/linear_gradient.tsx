import * as React from "react";
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const DownLoadLinearGradient = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={172}
    height={65}
    fill="none"
    {...props}
  >
    <Path
      fill="url(#a)"
      fillRule="evenodd"
      d="M.918 45.396v-5.51c0-11.91 14.597-1.212 26.489-1.87 6.724-.373 13.429-1.818 17.031-1.084 7.254 1.477 9.236 3.458 16.49 3.458 7.253 0 19.778-1.98 27.03-.504 7.254 1.478 18.157-7.508 25.41-17.849C120.622 11.697 124.226 0 131.479 0c7.254 0 14.507 5.91 21.761 16.25 7.253 10.34 14.507 25.114 18.133 32.5l2.891 5.887a7.2 7.2 0 0 1 .736 3.17v3.566A3.627 3.627 0 0 1 171.373 65H4.545a3.627 3.627 0 0 1-3.627-3.627V45.396Z"
      clipRule="evenodd"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={87.959}
        x2={87.959}
        y1={-5.909}
        y2={65}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#0047FF" stopOpacity={0.62} />
        <Stop offset={1} stopColor="#2D2D2D" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default DownLoadLinearGradient;
