import React, { useEffect, useMemo, useState } from "react";
import { processColor, ScrollView, StyleSheet, Text, View } from "react-native";
import Card from "../Components/Card";
import { RouteComponent } from "../types/global";
import { colors } from "../constants/colors";
import ArrowUpIcon from "../icons/arrow_up_icon";
import { globalStyle } from "../constants/globalStyle";
import DownLoadLinearGradient from "../icons/linear_gradient";
import UploadGradientBg from "../icons/UploadGradientBg";


import Slider from '@react-native-community/slider';

import {
  read_default_config,
} from "../../xonefi-api-client/config";

import { isClientConnectedToXoneFi } from "../hooks/isClientConnectedToXOneFi";
import { getCurrentConnectedSSID } from "../hooks/GetConnectedSSID";

type ConnectStatusDetail = {
  ofiTokens: number;
  gbData: number;
  usdCost: number;
  dataCost: number;
  usageTime: number;
  dataUsage: number;
  maxUsage: number;
};

const getStatusDetail = (): ConnectStatusDetail => {
  return {
    ofiTokens: 0,
    dataCost: 0,
    dataUsage: 0,
    gbData: 0,
    maxUsage: 0,
    usageTime: 0,
    usdCost: 0,
  };
};

const ConnectStatusScreen: RouteComponent<"Status"> = (props) => {

  //Here we create a state for SSID. Then we read the ssid in from SQLite and display that information
  const [ssid, setSSID] = useState<string | number>();

  //creating a second value of maxUsage that uses state. This value is changed whenever the sliding is complete.
  //There is another max usage variable created by the developer. Might need to delte previous variable
  //const [maxUsageSliderValue, setmaxUsageSliderValue] = useState(0)

  //This is a state variable for if the User is connected to a Provider. This variable is gotten by reading the default config
  //The devolper has a connectStatus object which holds information form the dummy data. Might need to delte this
  const [isConnected, setIsConnected] = useState<boolean>()

  //maybe use events to change this code
  useEffect(() => {
    const getConnectionStatus = async () => {
      //debug coomment : according to logs isClientConnectedToXoneFi is working properly
      const ret = await isClientConnectedToXoneFi();

      //debug code
      //console.log("ret from isClientConnectedToXoneFi : ")
      //console.log(ret)
      console.log("Value in isClientConnectedToXoneFi : " + ret)
      console.log(ret)
      console.log("type of ret : " + typeof(ret))

      setIsConnected(ret)
      if(ret === true){
        const currentSSID = await getCurrentConnectedSSID()
        setSSID(currentSSID)
      }

    }
    //(async ()=>{await getConnectionStatus()})()
    getConnectionStatus()

  }, []);


  /*read_default_config((config_json) => {
    setSSID(config_json.client_session.ssid)
    setIsConnected(config_json.client_session.status)
  });*/


  // const {BSSID, SSID} = props.route.params ?? {BSSID: undefined, SSID: undefined};
  const { BSSID, SSID } = { BSSID: "1111q", SSID: ssid};
  const [connectStatus, setConnectStatus] = useState<ConnectStatusDetail>(
    null as ConnectStatusDetail
  );
  useEffect(() => {
    const detail = getStatusDetail();
    setConnectStatus(detail);
  }, []);
 
  return (
    <ScrollView style={{ backgroundColor: "transparent" }}>
      <Card style={style.card}>
        <View style={style.summaryGroup}>
          <View
            style={[style.summaryItem, style.summaryItemValueWithoutBorder]}
          >
            <Text style={style.summaryItemValue}>
              {connectStatus?.ofiTokens}
            </Text>
            <Text style={style.summaryDesc}>OFI TOKENS</Text>
          </View>
          <View style={style.summaryItem}>
            <Text style={style.summaryItemValue}>{connectStatus?.gbData}</Text>
            <Text style={style.summaryDesc}>Minutes</Text>
          </View>
          <View style={style.summaryItem}>
            <Text style={style.summaryItemValue}>{connectStatus?.usdCost}</Text>
            <Text style={style.summaryDesc}>USD COST</Text>
          </View>
        </View>
        {/*<View style={style.percentContainer}>
          <View style={{ height: 8, flex: 1 }}>

            <Slider
              style={{width: "100%", height: 80}}
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor="#2B3FF2"
              maximumTrackTintColor="#000000"
              thumbTintColor="#FFFFFF"
              onSlidingComplete={(value)=>{setmaxUsageSliderValue(Math.round(value))}}
            />

          </View>
          <View style={style.maxUsage}>
            <Text style={style.summaryItemValue}>
              {//connectStatus?.maxUsage}GB}
              {maxUsageSliderValue} GB
            </Text>
            <Text style={style.maxUsageDesc}>MAX USAGE</Text>
          </View>
        </View>*/}
      </Card>
      <Card style={style.card}>
        <View style={style.routerName}>
          <Text style={[style.descriptionItem, { width: "69%" }]}>
            Router Name
          </Text>
          <Text style={style.descriptionItem}>{isConnected ? ssid : ""}</Text>
        </View>
        <View style={style.description}>
          <Text style={[style.descriptionItem, { width: "69%" }]}>
            Router Status
          </Text>
          <Text style={style.descriptionItem}>{isConnected ? "Connected" : "Not Connected"}</Text>
        </View>
        <View style={style.description}>
          <Text style={[style.descriptionItem, { width: "69%" }]}>
            Time Cost
          </Text>
          <Text style={style.descriptionItem}>
            {connectStatus?.dataCost} OFI/Hour
          </Text>
        </View>
        <View style={style.description}>
          <Text style={[style.descriptionItem, { width: "69%" }]}>
            Usage Time
          </Text>
          <Text style={style.descriptionItem}>
            {connectStatus?.usageTime} min
          </Text>
        </View>
      </Card>
      <View
        style={{
          flexDirection: "row",
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 8.5,
        }}
      >
        <Card style={style.smallCard}>
          <View style={[globalStyle.row, globalStyle.withSmallPaddingX]}>
            <View style={globalStyle.col1}>
              <Text style={style.speed}>Download</Text>
              <Text style={style.speed}>107 mbs</Text>
            </View>
            <ArrowUpIcon style={{ transform: [{ rotate: "180deg" }] }} />
          </View>
          <DownLoadLinearGradient style={style.smallCardChartBg} />
        </Card>
        <View style={{ width: 3.48 }}></View>
        <Card style={style.smallCard}>
          <View style={[globalStyle.row, globalStyle.withSmallPaddingX]}>
            <View style={globalStyle.col1}>
              <Text style={style.speed}>Upload</Text>
              <Text style={style.speed}>107 mbs</Text>
            </View>
            <ArrowUpIcon />
          </View>
          <UploadGradientBg style={style.smallCardChartBg} />
        </Card>
      </View>
    </ScrollView>
  );
};

export default ConnectStatusScreen;
const style = StyleSheet.create({
  card: {
    marginLeft: 15,
    marginRight: 15,
    paddingBottom: 12.5,
    paddingTop: 16,
    marginBottom: 8.5,
  },
  summaryItem: {
    height: 38,
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: "rgba(63,82,109, 0.5)",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  summaryGroup: {
    flexDirection: "row", // paddingLeft:10,
    // paddingRight:10,
    justifyContent: "space-evenly", // backgroundColor: 'red',
  },
  summaryItemValue: {
    fontSize: 18,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 18,
    textAlign: "center",
    color: colors.light,
    marginBottom: 4,
  },
  summaryItemValueWithoutBorder: {
    borderLeftWidth: 0,
  },
  summaryDesc: {
    fontSize: 11,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 11,
    letterSpacing: 2,
    textAlign: "center",
    color: "#9FAEC3",
  },
  description: {
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 15,
    // backgroundColor: 'red',
    flexDirection: "row",
    height: 24,
    justifyContent: "space-between",
  },
  routerName: {
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 15,
    // backgroundColor: 'red',
    flexDirection: "row",
    height: 35,
    justifyContent: "space-between",
  },
  percentContainer: {
    // backgroundColor: 'red',
    flexDirection: "row",
    height: 54,
    marginTop: 32,
    paddingLeft: 15,
    paddingRight: 15,
  },
  maxUsage: {
    height: 54,
    paddingLeft: 20,
    alignItems: "center",
    flexDirection: "column",
  },
  maxUsageDesc: {
    // width: 73,
    // height: 15,
    fontSize: 13,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 13,
    color: colors.light,
    marginTop: 10,
  },
  descriptionItem: {
    color: colors.light,
    fontSize: 16,
    lineHeight: 16,
    flex: 1,
  },
  smallCard: { flex: 1, height: 104, paddingTop: 12, overflow: "hidden" },
  speed: {
    color: colors.light,
  },
  smallCardChartBg: {
    width: 177,
    height: 65,
  },
  lineChartCard: {
    height: 133,
    paddingTop: 0,
    paddingBottom: 0,
    flexDirection: "column",
  },
  lineChart: {
    position: "relative",
    marginLeft: -16,
    marginRight: -16,
    marginBottom: -16,
    flex: 1,
    overflow: "hidden",
  },
  lineChartInfo: {
    height: 57,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 13,
  },
  lineChartSuccessText: {
    flexDirection: "row-reverse",
    paddingRight: 20,
  },
  chartTitle: {
    color: colors.inActiveColor,
    position: "absolute",
    bottom: 20,
    right: 36,
  },
});
