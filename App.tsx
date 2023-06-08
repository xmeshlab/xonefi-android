import React, { useEffect } from 'react';
import { RootSiblingParent } from "react-native-root-siblings";
import MainContainer from "./src/MainContainer";
import BackgroundTimer from "react-native-background-timer";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  read_default_config,
  write_default_config,
  starter_config,
  config_init_if_absent,
} from "./xonefi-api-client/config";
import { startClientDaemon } from "./client-daemon/start-client-daemon";

import SplashScreen from 'react-native-splash-screen'

function App() {
  console.log("XLOG: App.tsx");

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

  useEffect(() => {
    SplashScreen.hide();
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootSiblingParent>
        <MainContainer />
      </RootSiblingParent>
    </GestureHandlerRootView>
  );
}

export default App;
