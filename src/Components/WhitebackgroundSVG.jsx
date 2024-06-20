import * as React from "react";
import Svg, {
  G,
  Rect,
  Circle,
  Ellipse,
  Defs,
  RadialGradient,
  Stop,
  ClipPath,
} from "react-native-svg";

const WhitebackgroundSVG = () => (
  <Svg
    width={375}
    height={812}
    viewBox="0 0 375 812"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <G>
      <G clipPath="url(#clip0_4180_569)">
        <Rect width={375} height={812} fill="white" />
        <G>
          <Circle
            cx={380}
            cy={42}
            r={215}
            fill="url(#paint0_radial_4180_569)"
          />
          <G
            style={{
              mixBlendMode: "lighten",
            }}
          >
            <Ellipse
              cx={-6.5}
              cy={361}
              rx={212.5}
              ry={219}
              fill="url(#paint1_radial_4180_569)"
            />
          </G>
          <Circle
            cx={405}
            cy={763}
            r={314}
            fill="url(#paint2_radial_4180_569)"
            fillOpacity={0.7}
          />
        </G>
      </G>
    </G>
    <Defs>
      <RadialGradient
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(380 42) rotate(90) scale(215)"
      >
        <Stop stopColor="#00D1FF" stopOpacity={0.3} />
        <Stop offset={1} stopColor="#FF375F" stopOpacity={0} />
      </RadialGradient>
      <RadialGradient
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(-6.5 361) rotate(90) scale(219 212.5)"
      >
        <Stop stopColor="#0034FF" stopOpacity={0.31} />
        <Stop offset={1} stopColor="#0034FF" stopOpacity={0} />
      </RadialGradient>
      <RadialGradient
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(405 763) rotate(90) scale(314)"
      >
        <Stop stopColor="#FF4D00" stopOpacity={0.48} />
        <Stop offset={1} stopColor="#BE1AF7" stopOpacity={0} />
      </RadialGradient>
      <ClipPath>
        <Rect width={375} height={812} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

export { WhitebackgroundSVG };