import React, {useContext} from "react";
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

import InitialLogInScreen from "./screens/InitialLogInScreen";
//web3 auth code
import * as WebBrowser from "@toruslabs/react-native-web-browser";
import Web3Auth, {
  LOGIN_PROVIDER,
  OPENLOGIN_NETWORK,
} from "@web3auth/react-native-sdk";
import BigBlueButton from "./Components/BigBlueButton";
import worker from "../client-daemon/worker";
import {read_default_config, write_default_config} from "../xonefi-api-client/config";

//web3Auth Code
const scheme = "web3authrnexample"; // Or your desired app redirection scheme
const resolvedRedirectUrl = `${scheme}://openlogin`;

const clientId =
  "BHU5wO49Ul-c13pLy6HT84KINj4fcQ20W_3H7dZWj5AP3LRWIE69ZjVVWZ3B0u_TkJx8TbPK6iFeK0gzf5is5Oo";

const web3auth = new Web3Auth(WebBrowser, {
  clientId,
  network: OPENLOGIN_NETWORK.TESTNET, // or other networks
});

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








export const userContext = React.createContext(['', (value: string)=>{},{}, (value: string)=>{}]);

export default function MainContainer() {
  useEffect(() => {
    (async () => {
      // OneFiStorage.clear();
      const clientSession = await OneFiStorage.getItem("client_session");
      //
      console.log("get client session", clientSession);
    })();
  }, []);

  const [key, setKey] = useState("");
  const [userInfo, setUserInfo] = useState({});
  //const [console, setConsole] = useState("");

  const loginWithWeb3Auth = async () => {
    console.log("Loggin in with Web3Auth");
    try {
      console.log("Loggin in with Web3Auth");
      //setConsole("Logging in");
      const web3auth = new Web3Auth(WebBrowser, {
        clientId,
        network: OPENLOGIN_NETWORK.TESTNET, // or other networks
      });
      console.log("web3auth object");
      console.log(web3auth);
      const info = await web3auth.login({
        loginProvider: LOGIN_PROVIDER.GOOGLE,
        redirectUrl: resolvedRedirectUrl,
      });
      console.log("info returned from web3 Auth");
      console.log(info);

      setUserInfo(info);
      setKey(info.privKey);

      read_default_config((config_json2) => {
        config_json2.account.dpk = info.privKey;
        config_json2.account_set = true;
        let Web3 = require("web3");
        let web3 = new Web3();
        let account = web3.eth.accounts.privateKeyToAccount(info.privKey);
        config_json2.account.address = account.address;

        console.log(`info acct: ${JSON.stringify(info)}`);
        console.log(`config_json2: ${JSON.stringify(config_json2)}`);
        write_default_config(config_json2, () => {
          console.log("XLOG: Config is successfully initialized (2).");
        });
      });

      //uiConsole("Logged In");
    } catch (e) {
      console.error(e);
    }
  };

  const loginWithWeb3AuthFacebook = async () => {
    console.log("Loggin in with Web3Auth");
    try {
      console.log("Loggin in with Web3Auth");
      //setConsole("Logging in");
      const web3auth = new Web3Auth(WebBrowser, {
        clientId,
        network: OPENLOGIN_NETWORK.TESTNET, // or other networks
      });
      console.log("web3auth object");
      console.log(web3auth);
      const info = await web3auth.login({
        loginProvider: LOGIN_PROVIDER.FACEBOOK,
        redirectUrl: resolvedRedirectUrl,
      });
      console.log("info returned from web3 Auth");
      console.log(info);

      setUserInfo(info);
      setKey(info.privKey);
      //uiConsole("Logged In");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <WithMainBg style={{ flex: 1 }}>
      <StatusBar style="light" />
      {key ? 
      <userContext.Provider value={[key, setKey, userInfo, setUserInfo]}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName={"HomeTab"}>
          <Stack.Screen
            options={{ header: () => null}}
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
            options={{ ...stackNavigatorScreenOptions, title: "Account"}}
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
      </userContext.Provider>
       : <InitialLogInScreen logInFunction={loginWithWeb3Auth} loginFacebook={loginWithWeb3AuthFacebook}/>}
    </WithMainBg>
  );
}
