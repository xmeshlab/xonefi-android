import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState
} from "react";
import { View, TouchableOpacity } from "react-native";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { colors } from "../../constants/colors";
import {WifiIcon} from "../../icons/wifi_icon";
import ChevronRight from "../../icons/chevron_right";

import WifiManager from "react-native-wifi-reborn";
import { is_onefi_ssid } from "../../hooks/is_onefi_ssid";
import { read_default_config } from "../../../xonefi-api-client/config";

import { useUserContext } from "../../context/UserContext";
import PageHeaderWhite from "./PageHeaderWhite";
import PageHeaderBlack from "./PageHeaderBlack";

export type PageHeaderProps = BottomTabHeaderProps & {
  leftView?: JSX.Element;
  rightView?: JSX.Element;
};

const PageHeader: FunctionComponent<PageHeaderProps> = (props) => {
  const userContext_array = useUserContext();

  //Checks what the current background color is, and then instantiates the correct page header component
  if(userContext_array[4] == "black"){
    return (
      <PageHeaderBlack {...props}/>
    );
  }else{
    return (
      <PageHeaderWhite {...props}/>
    );

  }
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
  const clientStatus = false;
  const buggerIconClick = useCallback(() => {}, []);
  const wifiIconClick = useCallback(() => {}, []);

  const [isConnected, setIsConnected] = useState(false);
  const [ssid, setSSID] = useState<String>();

  useEffect(() => {

    let interval = setInterval(() => {
      WifiManager.getCurrentWifiSSID().then(
        (_ssid) => {
          if (_ssid != ssid) {
            setSSID(_ssid);
            const isOnefi = is_onefi_ssid(_ssid);
            if (isOnefi == true){

              read_default_config((config_json) => {
                if(config_json.client_session.sack_amount == 0){
                  setIsConnected(false)
                }else{
                  setIsConnected(true)
                }
              });
            }else{
              setIsConnected(false)
            }
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
            {isConnected ? <WifiIcon color={colors.successColor} /> : 
            <WifiIcon color={colors.inActiveWifiIconColor} />}
          </View>
        </TouchableOpacity>
      }
    />
  );
};
export default PageHeader;
