import * as React from "react";
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
import CreateNewAccountScreen from "./screens/CreateNewAccountScreen";
import LogoutScreen from "./screens/LogoutScreen";
import AccountBankDetails from "./screens/Account_BankDetails";
import AccountAddBankCard from "./screens/Account_AddBankCard";
import PayAndConnectScreen from "./screens/PayAndConnect";
import AddNewPaymentScreen from "./screens/AddNewPaymentCard";
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
import { WithMainBg } from "../utils/components/WithMainBg";
import { StatusBar } from "expo-status-bar";
import {
  TabPageHeader,
  WithBackBtnPageHeader,
} from "../utils/components/PageHeader";
import { colors } from "../constants/colors";
import PurchaseSell from "./screens/PurchaseSell";
import { WifiWithSignalLevel } from "../types/global";
import { OneFiStorage } from "../api/storage/OneFiStorage";
import AccountAddCrptoPaymentCard from "./screens/Account_AddCryptoPaymentCard";
import GenerateAccountDialog from "./screens/GenerateAccountDialog";
import ImportAccountDialog from "./screens/ImportAccountDialog";

//APIs
//import {LoggingApi} from './ApiCalls.js'

//onPress={LoggingApi("Provider Screen")}

//screen names
const connectName = "Connect" as keyof RootStackParamList;
const linkedAccountName = "Account" as keyof RootStackParamList;
const providerName = "Provider" as keyof RootStackParamList;
const cardName = "Wallet" as keyof RootStackParamList;
const homeName = "Home" as keyof RootStackParamList;
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
const tabOptions = {
  tabBarLabel: () => null,
  header: (props) => <TabPageHeader {...props} />,
};

function HomeTab() {
  useEffect(() => {
    (async () => {
      setTimeout(() => {
        console.log("NativeModules", NativeModules);
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
        } else if (rn === homeName) {
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

  const tabScreenComponent = useCallback(
    () => (
      <View>
        <Text>home</Text>
      </View>
    ),
    []
  );

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
        options={{ ...tabOptions, title: homeName }}
        name={homeName}
        component={tabScreenComponent}
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
export default function MainContainer() {
  useEffect(() => {
    (async () => {
      // OneFiStorage.clear();
      const clientSession = await OneFiStorage.getItem("client_session");
      //
      console.log("get client session", clientSession);
    })();
  }, []);
  return (
    <WithMainBg style={{ flex: 1 }}>
      <StatusBar style="light" />
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName={"HomeTab"}>
          <Stack.Screen
            options={{ header: () => null }}
            name={"HomeTab"}
            component={HomeTab}
          />
          <Stack.Screen
            options={{ ...stackNavigatorScreenOptions, title: "Connect" }}
            name={"PayAndConnect"}
            component={PayAndConnectScreen}
          />
          <Stack.Screen
            options={{ ...stackNavigatorScreenOptions, title: "ConnectStatus" }}
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
              title: "ProviderDetails",
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
            name="Create New Account"
            options={{
              ...stackNavigatorScreenOptions,
              title: "Create New Account",
            }}
            component={CreateNewAccountScreen}
          />
          <Stack.Screen
            name="Generating New Account"
            options={{
              ...stackNavigatorScreenOptions,
              title: "Generating New Account ",
            }}
            component={GenerateAccountDialog}
          />
          <Stack.Screen
            name="Importing New Account"
            options={{
              ...stackNavigatorScreenOptions,
              title: "Importing New Account",
            }}
            component={ImportAccountDialog}
          />
          <Stack.Screen name="Logout" component={AccountAddCrptoPaymentCard} />
        </Stack.Navigator>
      </NavigationContainer>
    </WithMainBg>
  );
}
