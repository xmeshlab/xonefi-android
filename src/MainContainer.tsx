import React from "react";
import { View, Text, Image, NativeModules } from "react-native";

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
import LinkedPaymentCardScreen from "./screens/LinkedPaymentCardScreen";
import PayAndConnectScreen from "./screens/PayAndConnect";
import { useCallback, useEffect, useState } from "react";
import BarIcon from "./icons/bars_icon";
import CardIcon from "./icons/card_icon";
import WifiIcon from "./icons/wifi_icon";
import UserIcon from "./icons/user_icon";
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
import { read_default_config } from "../xonefi-api-client/config";
import DeviceInfo from "react-native-device-info";

import { decrypt_aes256ctr } from "../xonefi-api-client/symcrypto";
import NetInfo from "@react-native-community/netinfo";
import { is_onefi_ssid } from "./hooks/is_onefi_ssid";

import { isClientConnectedToXoneFi, getPermission } from "./hooks/isClientConnectedToXOneFi";
import { getCurrentConnectedSSID } from "./hooks/GetConnectedSSID";
import { getCurrentLinkpeed } from "./hooks/GetLinkSpeed";
import {useNetInfo} from "@react-native-community/netinfo";

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
    return {
      tabBarIcon: (param) => {
        const { focused, color, size } = param;
        let iconPath;
        let rn = route.name;
        const iconColor = focused ? colors.light : colors.inActiveColor;
        if (rn === connectName) {
          return <BarIcon color={iconColor} />;
        } else if (rn === linkedAccountName) {
          return <UserIcon color={iconColor} />;
        } else if (rn === StatusName) {
          return <WifiIcon color={iconColor} />;
        } else if (rn === ProviderName) {
          return <CircleIcon color={iconColor} />;
        } else if (rn === cardName) {
          return <CardIcon color={iconColor} />;
        }
        return null;
      },
      tabBarStyle: {
        borderTopWidth: 0,
        height: 81,
        backgroundColor: colors.tabBarBackgroundColor,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
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
    }

  }catch(e){
    alert(e)
    console.log(e)
  }
}






export default function MainContainer() {
  const context_array = useUserContext();
  //const netInfo = useNetInfo();

  const [linkSpeeds, setLinkSpeeds] = useState<any[]>([]);

  const getLinkSpeeds = async () => {
    let isConnectedToOnefi2 = false

    const ret = await isClientConnectedToXoneFi(); 

    //This is currently working. The ret value is accurate
    if (ret === true) {
      const linkArray = await getCurrentLinkpeed();
      setLinkSpeeds(linkArray)
      //const linkSpeedObject = Promise.resolve(linkArray)
      alert(linkArray[0])
    }
  }


  //Checking to see if the user has previously logged in and the private key is stored
  useEffect(() => {
    readData(context_array[1])

    //code for link speeds
    let interval = setInterval(async () => {
      //debug code
      //alert("Inside linkspeed interval")
      await getLinkSpeeds()
    }, 12000);

    return () => {
      clearInterval(interval);
    };
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
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
