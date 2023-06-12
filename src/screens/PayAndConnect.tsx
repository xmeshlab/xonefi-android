import React, { useCallback, useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  TextInput,
  ScrollView,
  PermissionsAndroid,
} from "react-native";
import { PrimaryBtn } from "../../utils/components/PrimaryBtn";
import { colors } from "../../constants/colors";
import WifiLevelIcon from "../icons/WifiLevelIcon";
import { globalStyle } from "../../constants/globalStyle";
import { RouteComponent } from "../../types/global";
import WifiManager from "react-native-wifi-reborn";
import { useAsync } from "../../utils/hooks/useAsync";
import BackgroundTimer from "react-native-background-timer";
import {
  read_default_config,
  write_default_config,
} from "../../xonefi-api-client/config";

import { deserialize_ssid } from "../../xonefi-api-client/ssid";

import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Circle } from "react-native-svg";
import { OneFiStorage } from "../../api/storage/OneFiStorage";

const PayAndConnect: RouteComponent<"PayAndConnect"> = (props) => {
  console.log("XLOG: Pay and Connect Component Activated");
  const { SSID, BSSID, signalLevel } = props.route.params;
  const [password, setPassword] = useState("seitlab123!@");
  //const [buttonText, setButtonText] = useState('')

  const {
    value: currentConnectedSSID,
    execute: getCurrentWifiSSID,
    setValue: setCurrentConnectSSID,
  } = useAsync(WifiManager.getCurrentWifiSSID, true);

  const isConnected = useMemo(() => {
    return currentConnectedSSID === SSID;
  }, [currentConnectedSSID]);
  //debug code
  console.log("XLOG: Current value of isConnected : " + isConnected);

  read_default_config((config_json) => {
    //console.log(`config_json: ${JSON.stringify(config_json)}`);
    config_json.client_on = true;
    config_json.client_session.ssid = SSID;

    write_default_config(config_json, () => {
      console.log("XLOG: Config update successful (1).");
    });
  });

  //const sack_number = require("../../xonefi-api-client/sack_number");

  // sack_number.set_initiated_sack_number(2048, (res) => {
  //     if(res) {
  //         console.log("XLOG: Successfully set initiated sack number.");
  //     } else {
  //         console.log("XLOG: Failure setting initiated sack number.");
  //     }
  // });

  const client_session = require("../../xonefi-api-client/client_session");

  client_session.get_client_session((res) => {
    console.log("XLOG: CLIENT SESSION: " + JSON.stringify(res));
  });

  const payAndConnect = useCallback(async () => {
    console.log("XLOG: Pay and Connect Callback Activated");

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

      // let config_json = await read_default_config();
      // config_json.client_session.ssid = SSID;
      // config_json.client_on = true;
      // await write_default_config(config_json);

      console.log(`XLOG: deserialized ssid: ${JSON.stringify(ssid_json)}`);

      WifiManager.connectToProtectedSSID(SSID, ssid_json.prefix, false).then(
        () => {
          console.log("XLOG: Connected successfully!");
        },
        () => {
          console.log("XLOG: Connection failed!");
        }
      );
      /*.then(()=>{
                setButtonText('Disconnect')
            })*/
      //setButtonText('Disconnect')
      //Set the text for the button. Will cause React to rerender the component
    } else {
      // Permission denied
      console.log(
        "XLOG: You CANNOT use react-native-wifi-reborn (permissions denied)"
      );

      // let config_json = await read_default_config();
      // config_json.client_on = false;
      // await write_default_config(config_json);
      //
      //
      // let status = await WifiManager.connectionStatus();
      //
      // console.log("XLOG: current WiFi conntection status: " + status)
    }

    //
    // try {
    //     // Enable Wi-Fi (Android only)
    //     //WifiManager.setEnabled(true);
    //     //WifiManager.connect(SSID, ssid_json.prefix, false, false);
    //
    //     // WifiManager.connectToProtectedSSID(SSID, ssid_json.prefix, false).then(() => {
    //     //     console.log('Connected successfully!')
    //     // }, () => {
    //     //     console.log('Connection failed!')
    //     // })
    //
    //
    // } catch (error) {
    //     console.log('Error connecting to Wi-Fi:', error.message);
    // }

    // if (isConnected) {
    //     try {
    //        await WifiManager.disconnect();
    //        setCurrentConnectSSID(undefined);
    //     } catch (e) {
    //         console.error('disconnect', e);
    //     } finally {
    //     }
    //     return;
    // }

    // <<<<<<< previous code >>>>>>>>>>>>
    // try {
    //     // await NativeModules.XOneFiWiFiModule.connectWifi(SSID, 'QwerTyuioP');
    //     // 'QwerTyuioP'
    //     await NativeModules.XOneFiWiFiModule.initialConnect(SSID, // replace with your Wi-Fi pwd
    //         password);
    //     await OneFiStorage.setItem('client_on', true);
    //     setCurrentConnectSSID(SSID,);
    // } catch (e) {
    //     console.warn('connect error', '#051e2a');
    //     console.error(e)
    // } finally {
    // }
    // <<<<<< end-of-previous code >>>>>>>>>
  }, [isConnected, setCurrentConnectSSID, password]);

  //discconect function
  const disconnectFromOnefi = useCallback(async () => {
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
      /*.then(()=>{
                setButtonText('Pay and Connect')
            })*/
      //setButtonText('Pay and Connect')
    } else {
      // Permission denied
      console.log(
        "XLOG: You CANNOT use react-native-wifi-reborn (permissions denied)"
      );
    }
  }, [isConnected, setCurrentConnectSSID, password]);

  WifiManager.getCurrentWifiSSID().then(
    async (ssid) => {
      console.log("XLOG: Your current connected wifi SSID is " + ssid);
      console.log("XLOG: The SSID we want to connect to is: " + SSID);
      if (ssid === SSID) {
        console.log("XLOG: The device is already connected to: " + SSID);

        console.log("XLOG: Background timer will start in here.");

        // let config_json = await read_default_config();
        // config_json.client_session.ssid = SSID;
        // config_json.client_on = true;
        // await write_default_config(config_json);

        // BackgroundTimer.runBackgroundTimer(async () => {
        //         let config_json = await read_default_config();
        //         console.log("XLOG: ping: " + JSON.stringify(config_json));
        //         config_json["port"]++;
        //         await write_default_config(config_json);
        //     },
        //     3000);
      } else {
        console.log(
          "XLOG: Before using XOneFi, the device must connect to: " + SSID
        );

        console.log("XLOG: Background timer will start in here.");

        // let ssid_json = deserialize_ssid(SSID);
        //
        // console.log(`XLOG: deserialized ssid: ${JSON.stringify(ssid_json)}`)
        //
        // try {
        //     // Enable Wi-Fi (Android only)
        //     //WifiManager.setEnabled(true);
        //     //WifiManager.connect(SSID, ssid_json.prefix, false, false);
        //
        //     WifiManager.connectToProtectedSSID(SSID, ssid_json.prefix, false).then(() => {
        //         console.log('Connected successfully!')
        //     }, () => {
        //         console.log('Connection failed!')
        //     })
        // } catch (error) {
        //     console.log('Error connecting to Wi-Fi:', error.message);
        // }

        //await WifiManager.connectToProtectedSSID(SSID, ssid_json.prefix, false);

        //console.log("XLOG: Connected successfully!");

        // BackgroundTimer.runBackgroundTimer(async () => {
        //         let config_json = await read_default_config();
        //         console.log("XLOG: ping: " + JSON.stringify(config_json));
        //         config_json["port"]++;
        //         await write_default_config(config_json);
        //     },
        //     3000);

        console.log(
          "XLOG: Confirming that the background timer doesn't block the main thread."
        );
      }
    },
    () => {
      console.log("XLOG: Cannot get current SSID!");
    }
  );

  //isConnected ? setButtonText('Disconnect') : setButtonText('Pay and Connect')
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
        <AnimatedCircularProgress
          size={120}
          width={10}
          fill={67}
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
              <Text style={globalStyle.light}>{v}</Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>
      <View style={[globalStyle.row, style.statusView]}>
        <View style={globalStyle.row}>
          <WifiLevelIcon signalLevel={signalLevel ?? 0} />
          <Text style={[globalStyle.light, { paddingRight: 40 }]}>{SSID}</Text>
        </View>
        <Text style={globalStyle.light}>.014 OFI/GB</Text>
      </View>
      <View className="flex flex-col ml-5 mr-5 bg-slate-800 bg-rounded p-5 rounded-2xl justify-around">
        <View className="flex flex-row justify-between">
          <Text className="text-white text-base mb-1">Private</Text>
        </View>
        <View className="flex flex-row justify-between">
          <Text className="text-white text-base my-1">Per Hour</Text>
        </View>
        <View className="flex flex-row justify-between">
          <Text className="text-white text-base my-1">Per GB</Text>
        </View>
        <View className="flex flex-row justify-between">
          <Text className="text-white text-base mt-1">Conversion</Text>
        </View>
        {/*<View className="flex flex-row justify-between" style={{alignItems: 'center'}}>*/}
        {/*    <Text className="text-white text-base mt-1">Password</Text>*/}
        {/*    <TextInput secureTextEntry={true} style={style.input} textContentType={'password'} value={password}*/}
        {/*               onChangeText={setPassword}/>*/}
        {/*</View>*/}
        <View style={{ flexDirection: "row" }}>
          <Text className="text-white text-base mt-1">Total</Text>
        </View>
      </View>

      <PrimaryBtn
        onPress={isConnected ? disconnectFromOnefi : payAndConnect}
        style={style.connectBtn}
      >
        {isConnected ? "Disconnect" : "Pay and Connect"}
      </PrimaryBtn>
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