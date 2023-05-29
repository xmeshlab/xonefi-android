import * as React from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import MainContainer from "./navigation/MainContainer";
import BackgroundTimer from "react-native-background-timer";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useState } from "react";
import {
  View,
  Text,
} from "react-native";
import {
  read_default_config,
  write_default_config,
  starter_config,
  config_init_if_absent,
} from "./xonefi-api-client/config";
import { startClientDaemon } from "./client-daemon/start-client-daemon";

import * as WebBrowser from "@toruslabs/react-native-web-browser";
import Web3Auth, {
  LOGIN_PROVIDER,
  OPENLOGIN_NETWORK,
} from "@web3auth/react-native-sdk";
import BigBlueButton from "./navigation/Components/BigBlueButton";

//web3Auth Code
const scheme = "web3authrnexample"; // Or your desired app redirection scheme
const resolvedRedirectUrl = `${scheme}://openlogin`;

const clientId =
  "BHU5wO49Ul-c13pLy6HT84KINj4fcQ20W_3H7dZWj5AP3LRWIE69ZjVVWZ3B0u_TkJx8TbPK6iFeK0gzf5is5Oo";

const web3auth = new Web3Auth(WebBrowser, {
  clientId,
  network: OPENLOGIN_NETWORK.TESTNET, // or other networks
});


function App() {
  console.log("XLOG: App.tsx");

  const [key, setKey] = useState("");
  const [userInfo, setUserInfo] = useState("");
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
      //uiConsole("Logged In");
    } catch (e) {
      console.error(e);
    }
  };

  config_init_if_absent((ret) => {
    if (ret === true) {
      console.log("XLOG: Database is ready.");
      console.log("XLOG: Starting Client Daemon.");
      startClientDaemon().then(() => {
        console.log("XLOG: Client Daemon Started");
      });
    } else {
      console.log("XLOG: Database initialization error.");
    }
  });

  const loggedInView = (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootSiblingParent>
        <MainContainer />
      </RootSiblingParent>
    </GestureHandlerRootView>
  )

  const unloggedInView = (
    <View>
      <Text>Not Logged In</Text>
      <BigBlueButton text={"Log In"} onPressFunction={loginWithWeb3Auth}/>
    </View>
  )

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootSiblingParent>
        <MainContainer />
      </RootSiblingParent>
    </GestureHandlerRootView>
  );
}

export default App;
