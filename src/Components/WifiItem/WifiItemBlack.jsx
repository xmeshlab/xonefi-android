import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import ChevronRight from "../../icons/chevron_right";
import WifiLevelIcon from "../../icons/WifiLevelIcon";
import LockICon from "../../icons/LockIcon";
import { globalStyle } from "../../constants/globalStyle";

//A Component for the available XOneFi Routers icons displayed on the ConnectScreen
export default function WifiItemWhite({
    SSID,
    frequency,
    signalLevel,
  }) {
    return (
        <View style={style.wifiItem}>
          <View
            style={[
              style.wifiItemText,
              globalStyle.row,
              globalStyle.verticalCenter,
              { marginRight: 15 },
            ]}
          >
            <WifiLevelIcon signalLevel={signalLevel} />
    
            <LockICon style={{ marginLeft: 15, marginTop: 5 }} />
          </View>
          <Text style={style.wifiItemText}>{SSID}</Text>
          <ChevronRight />
        </View>
      );
        
}
  
  const style = StyleSheet.create({
    wifiItem: {
      flexDirection: "row",
      height: 78,
      justifyContent: "space-between",
      alignItems: "center",
      paddingLeft: 15,
      paddingRight: 15,
      borderBottomWidth: 2,
      borderBottomColor: "rgba(33, 145, 251, 0.095)",
      borderStyle: "solid",
    },
    wifiItemText: {
      flex: 1,
      color: "white"
    }
  });