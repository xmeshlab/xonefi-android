import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const BuggerIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={14}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color ?? "#fff"}
      fillRule="evenodd"
      d="M20.486 0c.595 0 1.078.448 1.078 1 0 .513-.416.936-.952.993L20.486 2H1.078C.483 2 0 1.552 0 1 0 .487.416.064.952.007L1.078 0h19.408Zm0 6c.595 0 1.078.448 1.078 1 0 .513-.416.936-.952.993L20.486 8H1.078C.483 8 0 7.552 0 7c0-.513.416-.936.952-.993L1.078 6h19.408Zm1.078 7c0-.552-.483-1-1.078-1H1.078l-.126.007C.416 12.065 0 12.487 0 13c0 .552.483 1 1.078 1h19.408l.126-.007c.536-.058.952-.48.952-.993Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default BuggerIcon;
