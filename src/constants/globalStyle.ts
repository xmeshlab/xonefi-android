import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const globalStyle = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
  col1: {
    flex: 1,
  },
  light: {
    color: colors.light,
  },
  warningText: {
    color: colors.warning,
  },
  successText: {
    color: colors.successColor,
  },
  withSmallPaddingX: {
    paddingLeft: 12,
    paddingRight: 12,
  },
  verticalCenter: {
    alignItems: "center",
  },
  centerCenter: {
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
