import * as React from "react";
import Svg, { G, Rect, Defs } from "react-native-svg";
import { View, Text } from "react-native";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function ButtonBackground(props) {
  return (
    <Svg
      width={335}
      height={59}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G filter="url(#prefix__filter0_d_101_1299)" shapeRendering="crispEdges">
        <Rect
          x={4}
          width={327}
          height={51}
          rx={12}
          fill="#2B3FF2"
          fillOpacity={0.25}
        />
        <Rect
          x={4.5}
          y={0.5}
          width={326}
          height={50}
          rx={11.5}
          stroke="#2B3FF2"
        />
      </G>
      <Defs></Defs>
    </Svg>
  );
}

function ButtonBackgroundSVG({ ButtonText }) {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ButtonBackground />
      <Text
        style={{
          position: "absolute",
          color: "white",
        }}
      >
        {ButtonText}
      </Text>
    </View>
  );
}

export default ButtonBackgroundSVG;
