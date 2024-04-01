import React, { useRef } from "react";
import { View, Text, Image, NativeModules } from "react-native";
import {createContext, useContext} from 'react'

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//stack navigator
import { createStackNavigator } from "@react-navigation/stack";

//screens
import ConnectScreen from "./screens/ConnectScreen";
import LinkedAccountScreen from "./screens/LinkedAccountsScreen";
import ProviderScreen from "./screens/ProviderScreen";
import WalletScreen from "./screens/WalletScreen";
import ProviderDetailScreen from "./screens/ProviderDetailScreen";
import AccountInformationScreen from "./screens/AccountInformationScreen";
import { LegalScreen } from "./screens/LegalScreen";
import LinkedPaymentCardScreen from "./screens/LinkedPaymentCardScreen";
import PayAndConnectScreen from "./screens/PayAndConnect";
import { useCallback, useEffect, useState } from "react";
import {BarIcon, BarIcon36} from "./icons/bars_icon";
import {CardIcon, CardIcon36} from "./icons/card_icon";
import {WifiIcon, WifiIcon36} from "./icons/wifi_icon";
import {UserIcon, UserIcon36} from "./icons/user_icon";
import CircleIcon from "./icons/circles_icon";
import {
  DefaultNavigatorOptions,
  RouteConfig,
} from "@react-navigation/core/lib/typescript/src/types";
import ConnectStatusScreen from "./screens/ConnectStatusScreen";
import { TabPageHeader, WithBackBtnPageHeader } from "./Components/PageHeader";
import { colors } from "./constants/colors";
import { WifiWithSignalLevel } from "./types/global";
import InitialLogInScreen from "./screens/InitialLogInScreen";

//login function imports
import { loginWithWeb3Auth } from "./hooks/LoginWithWeb3Auth";
import { loginWithWeb3AuthFacebook } from "./hooks/LoginWithWeb3Auth";
import { loginWithWeb3AuthTwitter } from "./hooks/LoginWithWeb3Auth";

import { useUserContext } from "./context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  read_default_config,
  write_default_config,
} from "../xonefi-api-client/config";
import DeviceInfo from "react-native-device-info";

import { decrypt_aes256ctr } from "../xonefi-api-client/symcrypto";
import NetInfo from "@react-native-community/netinfo";
import { is_onefi_ssid } from "./hooks/is_onefi_ssid";

import { isClientConnectedToXoneFi, getPermission } from "./hooks/isClientConnectedToXOneFi";
import { getCurrentConnectedSSID } from "./hooks/GetConnectedSSID";
import { getCurrentLinkpeed } from "./hooks/GetLinkSpeed";
import {useNetInfo} from "@react-native-community/netinfo";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";

import { BarIconAnimated } from "./icons/bar_icon_animated";

//import { useLinkSpeedContext } from "./context/LinkSpeedContext";

//screen names
const connectName = "Connect" as keyof RootStackParamList;
const linkedAccountName = "Account" as keyof RootStackParamList;
const providerName = "Provider" as keyof RootStackParamList;
const cardName = "Wallet" as keyof RootStackParamList;
const ProviderName = "Provider" as keyof RootStackParamList;
const StatusName = "Status" as keyof RootStackParamList;
type RootStackParamList = {
  Connect: undefined;
  Status: undefined;
  Account: undefined;
  Provider: undefined;
  Wallet: undefined;
  Home: undefined;
};
export type GlobalRoute = {
  HomeTab: undefined;
  // Home: undefined,
  Account: undefined;
  Provider: undefined;
  ProviderDetails: undefined;
  ["Linked Payment Card"]: undefined;
  ["Create New Account"]: undefined;
  ["Account Information"]: undefined;
  ["Legal"]: undefined;
  Logout: undefined;
  PayAndConnect: Partial<WifiWithSignalLevel>;
  ConnectStatus: undefined;
  ["Create New Account"]: undefined;
  ["Generating New Account"]: undefined;
  ["Importing New Account"]: undefined;
} & RootStackParamList;
const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createStackNavigator<GlobalRoute>();
const TabNavigator = Tab.Navigator;
const TabScreen = Tab.Screen;
//Sets our TabPageHeader as the header for tabOptions
const tabOptions = {
  tabBarLabel: () => null,
  header: (props) => <TabPageHeader {...props} />,
};

function HomeTab() {
  useEffect(() => {
    (async () => {
      setTimeout(() => {
        //Logging Native Modules causes error
        //console.log("NativeModules", NativeModules);
        // console.dir(NativeModules);
        // NativeModules.startScan();
      }, 3000);
      //
      // const  await OneFiStorage.getItem('client_session')
    })();
    console.log("start scan");
    console.log("after scan");
  }, []);

  const tabNavigatorScreenOptions: DefaultNavigatorOptions<
    any,
    any,
    any,
    any
  >["screenOptions"] = useCallback(({ route }) => {
    //Changing icon size in the sivg only changes the size of the background, not the image portion
    return {
      tabBarIcon: (param) => {
        const { focused, color, size } = param;
        let rn = route.name;
        const iconColor = focused ? colors.light : colors.inActiveColor;
        const strokeWidth = focused ? 4 : 2;
        if (rn === connectName) {
          return <BarIconAnimated color={iconColor} strokeWidth={strokeWidth}/>
        } else if (rn === linkedAccountName) {
          return <UserIcon36 color={iconColor} strokeWidth={strokeWidth}/>
        } else if (rn === StatusName) {
          return <WifiIcon36 color={iconColor} strokeWidth={strokeWidth}/>
        } else if (rn === ProviderName) {
          return <CircleIcon color={iconColor} strokeWidth={strokeWidth}/>
        } else if (rn === cardName) {
          return <CardIcon36 color={iconColor} strokeWidth={strokeWidth}/>;
        }
        return null;
      },
      //height here changes the size of the background black in the tab bar
      tabBarStyle: {
        borderTopWidth: 0,
        height: 75,
        backgroundColor: colors.tabBarBackgroundColor,
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
      },
      style: {
        padding: 10,
      },
    };
  }, []);

  return (
    <TabNavigator
      initialRouteName={connectName}
      screenOptions={tabNavigatorScreenOptions}
    >
      <TabScreen
        options={{ ...tabOptions, title: connectName }}
        name={connectName}
        component={ConnectScreen}
      />
      <TabScreen
        name={StatusName}
        component={ConnectStatusScreen}
        options={{ ...tabOptions, title: StatusName }}
      />
      {/*<TabScreen name={providerName} component={ProviderScreen} options={{...tabOptions, title: providerName}}/>*/}
      <TabScreen
        options={{ ...tabOptions, title: ProviderName }}
        name={ProviderName}
        component={ProviderScreen}
      />
      <TabScreen
        options={{ ...tabOptions, title: cardName }}
        name={cardName}
        component={WalletScreen}
      />
      <TabScreen
        name={linkedAccountName}
        component={LinkedAccountScreen}
        options={{ ...tabOptions, title: linkedAccountName }}
      />
    </TabNavigator>
  );
}

const MyTheme = {
  dark: false,
  colors: {
    primary: "rgb(255, 45, 85)",
    background: "rgba(242, 242, 242, 0)",
    card: "rgba(255, 255, 255, 0)",
    text: "rgb(28, 28, 30)",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
  },
};
const accountOption: RouteConfig<GlobalRoute, any, any, any, any>["options"] = {
  title: "Account",
};

const stackNavigatorScreenOptions: DefaultNavigatorOptions<
  GlobalRoute,
  any,
  any,
  any
>["screenOptions"] = {
  // presentation: 'transparentModal',
  // cardShadowEnabled: true,
  header: (props) => <WithBackBtnPageHeader {...props} />,
};

//This is a function to read the private key from async storage
//If the User has previously logged into the app, their Private key should be stored in persistant storage
const readData = async(setPrivateKey) => {
  try{
    const value = await AsyncStorage.getItem("privateKey")

    if (value !== null){
      let uniqueId = DeviceInfo.getDeviceId();
      let decrypted_value = decrypt_aes256ctr(value, uniqueId);
      setPrivateKey(decrypted_value);

        read_default_config((config_json2) => {
          config_json2.account.dpk = decrypted_value;
          config_json2.account_set = true;
          let Web3 = require("web3");
          let web3 = new Web3();
          let account = web3.eth.accounts.privateKeyToAccount(decrypted_value);
          config_json2.account.address = account.address;

          write_default_config(config_json2, () => {
            console.log("XLOG: Config is successfully initialized in Bypass Login mode.");
          });
        });
      }
  }catch(e){
    alert(e)
    console.log(e)
  }
}




//export const linkSpeedContext = createContext([]);

export default function MainContainer() {
  const context_array = useUserContext();
  //const netInfo = useNetInfo();
  //const linkspeed_array = useLinkSpeedContext();

//  const [linkSpeeds, setLinkSpeeds] = useState<any[]>([]);
  //context for the link speeds

  const getLinkSpeeds = async (setLinkspeed) => {
    let isConnectedToOnefi2 = false

    const ret = await isClientConnectedToXoneFi(); 

    //This is currently working. The ret value is accurate
    if (ret === true) {
      /*const linkArray = await getCurrentLinkpeed();
      if(linkspeed_array[0].length < 10){
        //let new_array =  [...linkspeed_array[0]]
        //new_array.push(linkArray)
        setLinkspeed([...linkspeed_array[0], linkArray])
      }else{
        let new_array =  [...linkspeed_array[0]]
        new_array.shift()
        new_array.push(linkArray)
        setLinkspeed(new_array)
      }*/
      //const linkSpeedObject = Promise.resolve(linkArray)
      //alert(linkspeed_array[0].length)
    }
  }


  //Checking to see if the user has previously logged in and the private key is stored
  useEffect(() => {
    readData(context_array[1])

    //code for link speeds
    /*let interval = setInterval(async () => {
      //debug code
      //alert("Inside linkspeed interval")
      await getLinkSpeeds(linkspeed_array[1])
    }, 12000);

    return () => {
      clearInterval(interval);
    };*/
  }, []);



  if (context_array[0] == "") {
    return (
      <InitialLogInScreen
        logInFunction={loginWithWeb3Auth}
        loginFacebook={loginWithWeb3AuthFacebook}
        loginTwitter={loginWithWeb3AuthTwitter}
      />
    );
  } else {
    //getAccountSet() //accountset is true here
    return (
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName={"HomeTab"}>
          <Stack.Screen
            options={{ header: () => null }}
            name={"HomeTab"}
            component={HomeTab}
          />
          {/*({ navigation }) =>({...stackNavigatorScreenOptions, title: "Connect", navFunction: ()=>navigation.navigate("Status")})*/}
          <Stack.Screen
            options={{ ...stackNavigatorScreenOptions, title: "Connect" }}
            name={"PayAndConnect"}
            component={PayAndConnectScreen}
          />
          <Stack.Screen
            options={{
              ...stackNavigatorScreenOptions,
              title: "ConnectStatus",
            }}
            name={"ConnectStatus"}
            component={ConnectStatusScreen}
          />
          <Stack.Screen
            options={{ ...stackNavigatorScreenOptions, title: "Provider" }}
            name="Provider"
            component={ProviderScreen}
          />
          <Stack.Screen
            options={{
              ...stackNavigatorScreenOptions,
              title: "Provider",
            }}
            name="ProviderDetails"
            component={ProviderDetailScreen}
          />
          <Stack.Screen
            options={{ ...stackNavigatorScreenOptions, title: "Account" }}
            name="Account"
            component={LinkedAccountScreen}
          />
          <Stack.Screen
            name="Linked Payment Card"
            options={{
              ...stackNavigatorScreenOptions,
              title: "Linked Payment Card",
            }}
            component={LinkedPaymentCardScreen}
          />
          <Stack.Screen
            name="Account Information"
            options={{
              ...stackNavigatorScreenOptions,
              title: "Account Information",
            }}
            component={AccountInformationScreen}
          />
          <Stack.Screen
            name="Legal"
            options={{
              ...stackNavigatorScreenOptions,
              title: "Legal",
            }}
            component={LegalScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
