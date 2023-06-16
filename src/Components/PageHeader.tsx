import React, {
  FunctionComponent,
  ReactComponentElement,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { colors } from "../constants/colors";
import BuggerIcon from "../icons/bugger_icon";
import WifiIcon from "../icons/wifi_icon";
import ChevronRight from "../icons/chevron_right";
//import { useClientStatus } from "../../store/clientStatus"; returns True or False. Just Set to False for now

export type PageHeaderProps = BottomTabHeaderProps & {
  leftView?: JSX.Element;
  rightView?: JSX.Element;
};
const PageHeader: FunctionComponent<PageHeaderProps> = (props) => {
  return (
    <>
      <View style={pageHeaderStyle.headerStatusPadding} />
      <View style={pageHeaderStyle.header}>
        <View style={pageHeaderStyle.headerBtn}>{props?.leftView ?? null}</View>

        <Text style={pageHeaderStyle.headerTitle}>{props.options.title}</Text>
        <View style={pageHeaderStyle.headerBtn}>
          {props?.rightView ?? null}
        </View>
      </View>
    </>
  );
};
export const WithBackBtnPageHeader: FunctionComponent<PageHeaderProps> = ({
  leftView,
  rightView,
  ...otherProps
}) => {
  const onTouchableOpacityPress = useCallback(
    () => otherProps.navigation.goBack(),
    []
  );

  return (
    <PageHeader
      {...otherProps}
      leftView={
        <TouchableOpacity onPress={onTouchableOpacityPress}>
          <View
            style={{
              transform: [
                {
                  rotateY: "180deg",
                },
              ],
            }}
          >
            <ChevronRight />
          </View>
        </TouchableOpacity>
      }
    />
  );
};

export const TabPageHeader: FunctionComponent<PageHeaderProps> = ({
  leftView,
  rightView,
  ...otherProps
}) => {
  //const clientStatus = useClientStatus();
  const clientStatus = false
  const buggerIconClick = useCallback(() => {}, []);
  const wifiIconClick = useCallback(() => {}, []);

  return (
    <PageHeader
      {...otherProps}
      leftView={
        <TouchableOpacity onPress={buggerIconClick}>
          <BuggerIcon />
        </TouchableOpacity>
      }
      rightView={
        <TouchableOpacity onPress={wifiIconClick}>
          <View
            style={{
              transform: [
                {
                  rotate: "-45deg",
                },
                {
                  translateY: -6,
                },
              ],
            }}
          >
            {/*color={clientStatus.isActive ? colors.successColor : colors.light}*/}
            <WifiIcon
              color={0? colors.successColor : colors.light}
            />
          </View>
        </TouchableOpacity>
      }
    />
  );
};
export default PageHeader;
const pageHeaderStyle = StyleSheet.create({
  headerStatusPadding: {
    height: getStatusBarHeight(),
    backgroundColor: colors.pageHeaderBackgroundColor,
  },
  header: {
    height: 60,
    backgroundColor: colors.pageHeaderBackgroundColor,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  headerBtn: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
