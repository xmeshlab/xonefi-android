import * as React from "react";
import Svg, { SvgProps, Path, Rect, G } from "react-native-svg";
import { WiFiLevel } from "../types/global";
import { useCallback } from "react";
import { RectProps } from "react-native-svg/src/elements/Rect";

function WifiLevelIcon(props: SvgProps & { signalLevel: WiFiLevel }) {
  const renderRect = useCallback(() => {
    const items = [];
    const smallest = 8.5;
    for (let i = 0; i < 4; i++) {
      const rectProps: RectProps = {
        width: 2,
        height: smallest + i * 2.5,
        translateX: 6 * i,
        translateY: 20 - (smallest + i * 2.5),
        fill: "rgba(130, 130, 130, 1.0)",
      };
      if (props.signalLevel === 4) {
        rectProps.fill = "#00E188";
      } else if (props.signalLevel === 3 && i <= 2) {
        rectProps.fill = "#FF9600";
      } else if (props.signalLevel < 3 && i <= 1) {
        rectProps.fill = "#b00b0b";
      }
      // @ts-ignore
      items.push(<Rect {...rectProps} key={i} />);
    }
    return items;
  }, [props.signalLevel]);

  return (
    <Svg
      width={24}
      height={16}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {renderRect()}
      {/*<Rect translateY={20-10} width={2} height={12.5} translateX={0} fill={'red'}/>*/}
      {/*<Rect translateY={20-12.5} translateX={6} width={2} height={15} fill={'red'}/>*/}
      {/*<Rect  translateY={20-15} translateX={12} width={2} height={17.5} fill={'red'}/>*/}
      {/*<Rect translateY={0} translateX={18} width={2} height={20} fill={'red'}/>*/}
    </Svg>
  );
}

export default WifiLevelIcon;
