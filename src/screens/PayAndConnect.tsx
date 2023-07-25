import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  NativeModules,
  ScrollView,
  PermissionsAndroid,
  Platform
} from "react-native";
import { PrimaryBtn } from "../Components/PrimaryBtn";
import { colors } from "../constants/colors";
import WifiLevelIcon from "../icons/WifiLevelIcon";
import { globalStyle } from "../constants/globalStyle";
import { RouteComponent } from "../types/global";
import WifiManager from "react-native-wifi-reborn";
import { useAsync } from "../hooks/useAsync";
import {
  read_default_config,
  write_default_config,
} from "../../xonefi-api-client/config";

//API used to get information regarding the Provider. The information is encoded into the SSID
import { deserialize_ssid } from "../../xonefi-api-client/ssid";

import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Circle } from "react-native-svg";

import NetInfo from "@react-native-community/netinfo";
import {useNetInfo} from "@react-native-community/netinfo";

const {WifiModule} = NativeModules;
//Takes a callback as a param
//WifiModule.logEvent(res => console.log(res));

const OsVer = Platform.constants['Release'];

/**
 * This Component handles the functionality of allowing a user to Connect or 
 * Disconnect from an XOneFi Provider
 * 
 * A User is routed to this page after clicking on a WifiItem that is rendered on the ConnectScreen
 * 
 * It is passed in the Provider's SSID and BSSID as props
 * 
 */
const PayAndConnect: RouteComponent<"PayAndConnect"> = (props) => {
  console.log("XLOG: Pay and Connect Component Activated");
  const { SSID, BSSID, signalLevel, frequency } = props.route.params;

  //Functions for setting currentConnectedSSID
  const {
    value: currentConnectedSSID,
    execute: getCurrentWifiSSID,
    setValue: setCurrentConnectSSID,
  } = useAsync(WifiManager.getCurrentWifiSSID, true);

  //State for checking if we are connected to the SSID
  const [isConnected, setIsConnected] = useState(false);

  //The Speed of the internet in MBPS
  const [networkSpeed, setNetworkSpeed] = useState();

  //maybe change back to useMemo?
  //useEffect to set the isConnected state variable whenever the currently connected wifi network changes
  useEffect(() => {
    setIsConnected(currentConnectedSSID === SSID)
    if(isConnected){
      //replace with hook
      NetInfo.fetch().then(state => {
        console.log("Wifi Speed : " + state.details.linkSpeed);
        setNetworkSpeed(state.details.linkSpeed);
  
      });
    }
  }, [currentConnectedSSID]);


  //half circle should be min of (mbps/200) or 180-max of bar


  //An interval that will run each second. It will get the current wifi network ssid and check if it has changed. 
  //We do this since the user must manually change to the xonefi wifi. Check if there are event listeners we can use instead
  useEffect(() => {
    let interval = setInterval(() => {
      WifiManager.getCurrentWifiSSID().then(_ssid =>{
        if(_ssid != currentConnectedSSID){
          setCurrentConnectSSID(_ssid);

        }
      }, () => {
        console.log("Cannot get current SSID!");
      })
      
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  read_default_config((config_json) => {
    //console.log(`config_json: ${JSON.stringify(config_json)}`);
    config_json.client_on = true;
    config_json.client_session.ssid = SSID;

    write_default_config(config_json, () => {
      console.log("XLOG: Config update successful (1).");
    });
  });

  const client_session = require("../../xonefi-api-client/client_session");

  client_session.get_client_session((res) => {
    console.log("XLOG: CLIENT SESSION: " + JSON.stringify(res));
  });

  //function to connect to OneFi Provider
  const payAndConnect = async ()=> {
    console.log("XLOG: Pay and Connect Callback Activated");

    //Ask Android Permission to use Location Access. Thi is required for react native wifi reborn
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location permission is required for WiFi connections",
        message:
          "This app needs location permission as this is required  " +
          "to scan for wifi networks.",
        buttonNegative: "DENY",
        buttonPositive: "ALLOW",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // You can now use react-native-wifi-reborn
      console.log("XLOG: You can now use react-native-wifi-reborn");

      let ssid_json = deserialize_ssid(SSID);

      console.log(`XLOG: deserialized ssid: ${JSON.stringify(ssid_json)}`);

      //debug code to check that our native module WifiModule.java is working
      //WifiModule.logEvent(res => console.log(res));

      if (OsVer >= 10){
        //Call the connectToWifi function in our native module WifiModule.java. This will use Suggestions API so the user does not have to input the password
        //Then it will route the user to the wifi options page and tell them to switch to the XOneFi Provider API
        await WifiModule.connectToWifi2(SSID, ssid_json.prefix);
        WifiModule.ShowNotification(SSID);
      }else{
        WifiManager.connectToProtectedSSID(SSID, ssid_json.prefix, false, false).then(
          () => {
            console.log("XLOG: Connected successfully!");
            //setIsConnected(true)
            //setCurrentConnectSSID(SSID)
          },
          () => {
            console.log("XLOG: Connection failed!");
          });
      }

      //We do not change currentConnectedSSID here, since we have an interval that does that for us every second. 

    } else {
      // Permission denied
      console.log(
        "XLOG: You CANNOT use react-native-wifi-reborn (permissions denied)"
      );
    }

  }


  //Function to disconnect from OneFi Provider on Android 9 and below
  const disconnectFromOnefi = async () => {
    console.log("XLOG: DisconnectFromOnefi Callback Activated");

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title:
          "Location permission is required to disconnect from WiFi connections",
        message:
          "This app needs location permission as this is required  " +
          "to scan for wifi networks.",
        buttonNegative: "DENY",
        buttonPositive: "ALLOW",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // You can now use react-native-wifi-reborn
      console.log("XLOG: You can now use react-native-wifi-reborn");

      let ssid_json = deserialize_ssid(SSID);

      console.log(`XLOG: deserialized ssid: ${JSON.stringify(ssid_json)}`);

      WifiManager.isRemoveWifiNetwork(SSID);
      //setIsConnected(false)

    } else {
      // Permission denied
      console.log(
        "XLOG: You CANNOT use react-native-wifi-reborn (permissions denied)"
      );
    }
  }

  //right now fill is always 80 when connected. fix this
  return (
    <ScrollView className="flex-1 flex-col">
      <View style={[globalStyle.row, { marginLeft: 37, marginTop: 23 }]}>
        <Text style={[style.statusText, globalStyle.light]}>Status:</Text>
        <Text
          style={[
            isConnected ? globalStyle.successText : globalStyle.warningText,
            style.statusText,
          ]}
        >
          {" "}
          {isConnected ? "Connected" : "Not Connected"}
        </Text>
      </View>
      <View style={style.chart}>
      {isConnected ? <AnimatedCircularProgress
          size={120}
          width={10}
          fill={80}
          arcSweepAngle={180}
          rotation={270}
          renderCap={({ center }) => (
            <Circle cx={center.x} cy={center.y} r="6" fill="#00B2FF" />
          )}
          tintColor="#18384D"
          onAnimationComplete={() => console.log("onAnimationComplete")}
          backgroundColor="#051e2a"
        >
           {(v) => (
            <View>
              <Text style={globalStyle.light}>{isConnected ? networkSpeed + " mbps": ""}</Text>
            </View>)}
        </AnimatedCircularProgress>
         :
        <AnimatedCircularProgress
          size={120}
          width={10}
          fill={0}
          arcSweepAngle={180}
          rotation={270}
          renderCap={({ center }) => (
            <Circle cx={center.x} cy={center.y} r="6" fill="#00B2FF" />
          )}
          tintColor="#18384D"
          onAnimationComplete={() => console.log("onAnimationComplete")}
          backgroundColor="#051e2a"
        >
           {(v) => (
            <View>
              <Text style={globalStyle.light}>{isConnected ? networkSpeed : ""}</Text>
            </View>)}
        </AnimatedCircularProgress>}
      </View>
      <View style={[globalStyle.row, style.statusView]}>
        <View style={globalStyle.row}>
          <WifiLevelIcon signalLevel={signalLevel ?? 0} />
          <Text style={[globalStyle.light, { paddingRight: 40 }]}>{SSID}</Text>
        </View>
      </View>
      <View className="flex flex-col ml-5 mr-5 bg-slate-800 bg-rounded p-5 rounded-2xl justify-around">
        <View className="flex flex-row justify-between">
          <Text className="text-white text-base mb-1">Private</Text>
          <Text className="text-white text-base mb-1">0 OFI</Text>
        </View>
        <View className="flex flex-row justify-between">
          <Text className="text-white text-base my-1">Per Hour</Text>
          <Text className="text-white text-base my-1">{deserialize_ssid(SSID).cost} OFI</Text>
        </View>
        <View className="flex flex-row justify-between">
          <Text className="text-white text-base my-1">Per GB</Text>
          <Text className="text-white text-base mb-1">0 OFI</Text>
        </View>
        <View className="flex flex-row justify-between">
          <Text className="text-white text-base mt-1">Total</Text>
          <Text className="text-white text-base my-1">{deserialize_ssid(SSID).cost} OFI</Text>
        </View>
      </View>

      {OsVer >= 10 ? <>
      {isConnected ?
      <PrimaryBtnGrey style={style.connectBtn}>
        <Text>Pay and Connect</Text>
      </PrimaryBtnGrey>
      :
      <PrimaryBtn
        onPress={payAndConnect}
        style={style.connectBtn}
      >
        {isConnected ? "Disconnect" : "Pay and Connect"}
      </PrimaryBtn>}
      </>:
      <PrimaryBtn
        onPress={isConnected ? disconnectFromOnefi : payAndConnect}
        style={style.connectBtn} 
      >
        {isConnected ? "Disconnect" : "Pay and Connect"}
        </PrimaryBtn>}
    </ScrollView>
  );
};

export default PayAndConnect;

const style = StyleSheet.create({
  withBorderTop: {
    borderStyle: "solid",
    borderTopWidth: 1,
    borderColor: colors.light,
  },
  connectBtn: { marginLeft: 24, marginRight: 24, marginTop: 46 },
  chart: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",

    height: 90,
    marginTop: 26,
  },
  statusText: {
    fontSize: 18,
  },
  input: {
    flex: 1,
    height: 24,
    margin: 12,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: "#fff",
    color: "#fff",
    // padding: 10,
  },
  statusView: {
    justifyContent: "space-between",
    marginLeft: 24 + 23,
    marginRight: 24 + 23,
    marginBottom: 18,
    alignItems: "center",
  },
});








const PrimaryBtnGrey = ({
  style, children
}) => {
  return (
    <View
      style={[defaultStyle.primaryBtn, style]}
    >
      {typeof children === "string" ? (
        <Text style={defaultStyle.text}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
};

const defaultStyle = StyleSheet.create({
  primaryBtn: {
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#404040",
    shadowColor: "rgba(0, 0, 0, 1.0)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    flexDirection: "row",
    shadowRadius: 4,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#404040",
  },
  text: {
    color: 	"#000000",
    fontSize: 16,
  },
  loading: {
    position: "absolute",
    left: 1,
    right: 1,
    bottom: 1,
    top: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
});
