import * as React from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import MainContainer from "./navigation/MainContainer";
import BackgroundTimer from "react-native-background-timer";

import {
  read_default_config,
  write_default_config,
  starter_config,
  config_init_if_absent,
} from "./xonefi-api-client/config";
import { startClientDaemon } from "./client-daemon/start-client-daemon";

//web3Auth Code
import * as WebBrowser from "@toruslabs/react-native-web-browser";
import Web3Auth, {
  LOGIN_PROVIDER,
  OPENLOGIN_NETWORK,
} from "@web3auth/react-native-sdk";

const scheme = "web3authrnbareauth0example"; // Or your desired app redirection scheme
const resolvedRedirectUrl = `${scheme}://openlogin`;

const clientId =
  "BHU5wO49Ul-c13pLy6HT84KINj4fcQ20W_3H7dZWj5AP3LRWIE69ZjVVWZ3B0u_TkJx8TbPK6iFeK0gzf5is5Oo";

const web3auth = new Web3Auth(WebBrowser, {
  clientId,
  network: OPENLOGIN_NETWORK.TESTNET, // or other networks
});

function App() {
  console.log("XLOG: App.tsx");

  // var SQLite = require('react-native-sqlite-storage');
  //
  //
  // var db = SQLite.openDatabase("test.db", "1.0", "Test Database", 200000, () => {
  //     console.log("XLOG: Database opened");
  // }, (err) => {
  //     console.log("XLOG: Error opening database");
  // });

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

  return (
    <RootSiblingParent>
      <MainContainer />
    </RootSiblingParent>
  );
}

export default App;
