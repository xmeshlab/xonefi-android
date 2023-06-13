import { StyleSheet, View, ViewComponent, ViewProps, Text } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { colors } from "../../constants/colors";
import { useViewRect } from "../hooks/useViewRect";

interface SliderProps {
  value: number;
  maxiumValue: number;
}

export const Slider = ({
  value,
  maxiumValue,
  ...viewProps
}: SliderProps & ViewProps) => {
  const mainRef = useRef(null);
  const bgRef = useRef<View>(null);
  // const [fullWidth, setFullWidth] = useState(100);
  const { width: fullWidth = 0 } = useViewRect(bgRef.current, mainRef.current);

  const percent = useMemo(() => {
    return Math.round((value / maxiumValue) * 100);
  }, [fullWidth]);
  const progressWidth = useMemo(() => {
    return (value / maxiumValue) * fullWidth;
  }, [fullWidth]);

  const tooltipWidth = 45;
  return (
    <View {...viewProps} ref={mainRef} style={viewProps.style}>
      <View style={style.sliderBg} ref={bgRef}>
        <View style={[style.sliderProgress, { width: progressWidth }]}>
          <View style={style.slideCircle} />

          <View style={{ flex: 1, position: "relative" }}>
            <View
              style={[
                style.tooltip,
                {
                  left: 0,
                  transform: [
                    {
                      translateX: progressWidth - tooltipWidth / 2,
                    },
                  ],
                },
              ]}
            >
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 6,
                  // backgroundColor: 'green',
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderLeftWidth: 1,
                    borderTopWidth: 1,
                    borderColor: "#9FAEC3",
                    backgroundColor: "#1A2028",

                    transform: [
                      {
                        translateX: -2,
                      },
                      {
                        rotate: "45deg",
                      },
                      {
                        translateY: -5,
                      },
                    ],
                  }}
                />
              </View>

              <Text numberOfLines={1} style={style.tooltipText}>
                {percent}%
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  sliderBg: {
    marginTop: 9, // flex: 1,
    height: 4,
    width: "100%",
    borderRadius: 2,
    backgroundColor: "black",
    position: "relative",
  },
  sliderProgress: {
    height: 4,
    borderRadius: 40,
    backgroundColor: "#2B3FF2",
    position: "relative",
  },
  slideCircle: {
    position: "absolute",
    right: -8,
    top: -6,
    width: 15,
    height: 15,
    backgroundColor: "#1A2028",
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 1.0)",
    borderRadius: 10.5,
  },
  tooltip: {
    top: 20,
    position: "absolute",
    width: 45,
    height: 24,
    paddingBottom: 4,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#9FAEC3",
    borderRadius: 12,
    backgroundColor: "#1A2028", // right: '-50%',
    justifyContent: "center",
    alignItems: "center",
  },
  tooltipText: {
    fontSize: 12,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 12,
    color: "#9FAEC3",
  },
});
