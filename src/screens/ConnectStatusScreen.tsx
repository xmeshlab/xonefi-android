import React, { useCallback, useEffect, useMemo, useState, useContext} from "react";
import { processColor, ScrollView, StyleSheet, Text, View } from "react-native";

import {linkSpeedContext} from "../MainContainer"

import Card from "../Components/Card";
import { RouteComponent } from "../types/global";
import { colors } from "../constants/colors";
import ArrowUpIcon from "../icons/arrow_up_icon";
import { globalStyle } from "../constants/globalStyle";
import DownLoadLinearGradient from "../icons/linear_gradient";
import UploadGradientBg from "../icons/UploadGradientBg";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";

import { read_default_config } from "../../xonefi-api-client/config";

import { isClientConnectedToXoneFi } from "../hooks/isClientConnectedToXOneFi";
import { getCurrentConnectedSSID } from "../hooks/GetConnectedSSID";
import { getCurrentLinkpeed } from "../hooks/GetLinkSpeed";

import { GlobalRoute } from "../MainContainer";
import { NavigationProp } from "@react-navigation/core/src/types";
import { useNavigation } from "@react-navigation/native";

import { useLinkSpeedContext } from "../context/LinkSpeedContext";

const ConnectStatusScreen: RouteComponent<"Status"> = (props) => {
  const [ssid, setSSID] = useState<string | number>();
  const [linkSpeeds, setLinkSpeeds] = useState<any[]>([]);
  const navigation = props.navigation
  const linkspeed_list = useLinkSpeedContext();

  //creating a second value of maxUsage that uses state. This value is changed whenever the sliding is complete.
  //There is another max usage variable created by the developer. Might need to delte previous variable
  //const [maxUsageSliderValue, setmaxUsageSliderValue] = useState(0)

  //This is a state variable for if the User is connected to a Provider. This variable is gotten by reading the default config
  //The devolper has a connectStatus object which holds information form the dummy data. Might need to delte this
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [lastSackTimestamp, setLastSackTimestap] = useState(0);
  const [initialSackTimestamp, setInitialSackTimestamp] = useState(0);

  const getConnectionStatus1 = async () => {
    //debug coomment : according to logs isClientConnectedToXoneFi is working properly
    const ret = await isClientConnectedToXoneFi();

    //debug code
    console.log("Value in isClientConnectedToXoneFi : " + ret);
    //alert(ret)

    if (ret != isConnected){
      setIsConnected(ret);
      //alert("isConnected after change: " + isConnected)
    }
    //alert("isConnected : " + isConnected)

    if (ret == true) {
      const currentSSID = await getCurrentConnectedSSID();
      setSSID(currentSSID);
      
      //const linkArray = await getCurrentLinkpeed();
      //debug code
      //console.log("Above setLinkSpeeds")
      //setLinkSpeeds(linkArray);

      read_default_config((config_json) => {
        const lastSackTime = config_json.client_session.last_sack_timestamp
        setLastSackTimestap(lastSackTime)
  
        if(lastSackTime > 0){
          const initalTimestamp = config_json.client_session.started_timestamp
          setInitialSackTimestamp(initalTimestamp)
        }
      });
    }else{
      setSSID(0)
    }
  };
  const getLinkSpeeds = async () => {
    if (isConnected === true) {
      const linkArray = await getCurrentLinkpeed();
      setLinkSpeeds(linkArray);
      //debug code
      console.log("Link Speed : " + linkSpeeds[0])
      console.log("Download Speed : " + linkSpeeds[1])
      console.log("Upload Speed : " + linkSpeeds[2])
    }
  }



  //This works for being called on render and bottom bar navigation
  //The interval is set up, and constantly runs
  useEffect(() => {
    
    const unsubscribe = navigation.addListener("focus", async () => {
      console.log("useEffect called")
      await getConnectionStatus1()
      
    });

    //commented out cause we have context for linkspeed
    /*let interval = setInterval(async () => {
      //debug code
      //alert("Inside linkspeed interval")
      console.log("Interval value of isConnected: " + isConnected)
      await getLinkSpeeds()
    }, 2000);

    return () => {
      clearInterval(interval);
      return unsubscribe;
    };*/

    //return unsubscribe;
  }, [navigation, ssid]);


  const { BSSID, SSID } = { BSSID: "1111q", SSID: ssid };

  return (
    <ScrollView style={{ backgroundColor: "transparent" }}>
      <Card style={style.card}>
        <View style={style.summaryGroup}>
          <View
            style={[style.summaryItem, style.summaryItemValueWithoutBorder]}
          >
            <Text style={style.summaryItemValue}>{0}</Text>
            <Text style={style.summaryDesc}>OFI TOKENS</Text>
          </View>
          <View style={style.summaryItem}>
            <Text style={style.summaryItemValue}>{0}</Text>
            <Text style={style.summaryDesc}>Minutes</Text>
          </View>
          <View style={style.summaryItem}>
            <Text style={style.summaryItemValue}>{0}</Text>
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
          <Text style={style.descriptionItemConnected}>
            {isConnected ? ssid : ""}
          </Text>
        </View>
        <View style={style.description}>
          <Text style={[style.descriptionItem, { width: "69%" }]}>
            Router Status
          </Text>
          <Text
            style={
              isConnected
                ? style.descriptionItemConnected
                : style.descriptionItem
            }
          >
            {isConnected ? "Connected" : "Not Connected"}
          </Text>
        </View>
        <View style={style.description}>
          <Text style={[style.descriptionItem, { width: "69%" }]}>
            Usage Cost
          </Text>
          <Text style={style.descriptionItem}>{0} OFI/Hour</Text>
        </View>
        <View style={style.description}>
          <Text style={[style.descriptionItem, { width: "69%" }]}>
            Usage Time
          </Text>
          <Text style={style.descriptionItem}>{Math.floor((lastSackTimestamp-initialSackTimestamp)/60)} min</Text>
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
        {isConnected ? (
          <Card style={style.smallCard}>
            <View style={[globalStyle.row, globalStyle.withSmallPaddingX]}>
              <View style={globalStyle.col1}>
                <Text style={style.speed}>Download (mbps)</Text>
              </View>
              <ArrowUpIcon style={{ transform: [{ rotate: "180deg" }] }} />
            </View>
            <DownLoadLinearGradient style={style.smallCardChartBg} />
          </Card>
        ) : (
          <></>
        )}

        <View style={{ width: 3.48 }}></View>

        {isConnected ? (
          <Card style={style.smallCard}>
            <View style={[globalStyle.row, globalStyle.withSmallPaddingX]}>
              <View style={globalStyle.col1}>
                <Text style={style.speed}>Upload (mbps)</Text>
              </View>
              <ArrowUpIcon />
            </View>
            <UploadGradientBg style={style.smallCardChartBg} />
          </Card>
        ) : (
          <></>
        )}
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
  descriptionItemConnected: {
    color: colors.successColor,
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
