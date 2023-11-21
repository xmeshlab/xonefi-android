import React, {
  FunctionComponent,
  ReactComponentElement,
  useCallback,
  useContext,
  useMemo,
  useEffect,
  useState
} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { colors } from "../constants/colors";
import BuggerIcon from "../icons/bugger_icon";
import {WifiIcon} from "../icons/wifi_icon";
import ChevronRight from "../icons/chevron_right";
import { useNavigation } from "@react-navigation/native";

import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

import WifiManager from "react-native-wifi-reborn";
import { is_onefi_ssid } from "../hooks/is_onefi_ssid";


//import { useClientStatus } from "../../store/clientStatus"; returns True or False. Just Set to False for now
//Use professor Nick's client status

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
  const clientStatus = false;
  //const navigation = useNavigation()
  const buggerIconClick = useCallback(() => {}, []);
  const wifiIconClick = useCallback(() => {}, []);

  /*type RootStackParamList = {
    Connect: undefined;
    Status: undefined;
    Account: undefined;
    Provider: undefined;
    Wallet: undefined;
    Home: undefined;
  };
  const navigation = useNavigation<RootStackParamList>();
*/

const [isConnected, setIsConnected] = useState(false);
  const [ssid, setSSID] = useState<String>();

  useEffect(() => {

    let interval = setInterval(() => {
      WifiManager.getCurrentWifiSSID().then(
        (_ssid) => {
          if (_ssid != ssid) {
            setSSID(_ssid);
            const isOnefi = is_onefi_ssid(_ssid);
            setIsConnected(isOnefi)
          }
        },
        () => {
          console.log("Cannot get current SSID!");
        }
      );
    }, 2000);

    return () => {
      clearInterval(interval);
    };

  }, []);

  return (
    <PageHeader
      {...otherProps}
      leftView={<></>}
      rightView={
        <TouchableOpacity
          onPress={() => {
            otherProps.navigation.navigate("Status");
          }}
        >
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
            {isConnected ? <WifiIcon color={colors.successColor} /> : 
            <WifiIcon color={colors.inActiveWifiIconColor} />}
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
