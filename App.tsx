import React, { useEffect } from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import MainContainer from "./src/MainContainer";
import BackgroundTimer from "react-native-background-timer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  read_default_config,
  write_default_config,
  starter_config,
  config_init_if_absent,
} from "./xonefi-api-client/config";
import { UserContextProvider } from "./src/context/UserContext";
import { startClientDaemon } from "./client-daemon/start-client-daemon";

import SplashScreen from "react-native-splash-screen";
import { WithMainBg } from "./src/Components/WithMainBg";
import { StatusBar } from "expo-status-bar";

function App() {
  console.log("XLOG: App.tsx");

  let daemon_counter = 0;

  config_init_if_absent((ret) => {
    if (ret === true) {
      console.log("XLOG: Database is ready.");
      console.log("XLOG: Starting Client Daemon.");
      daemon_counter++;
      console.log(`Daemon counter: ${daemon_counter}`);
      startClientDaemon().then(() => {
        console.log("XLOG: Client Daemon Started");
      });
    } else {
      console.log("XLOG: Database initialization error.");
    }
  });

  //startClientDaemon();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootSiblingParent>
          <UserContextProvider>
          <WithMainBg style={{ flex: 1 }}>
            <StatusBar style="light" />
            <MainContainer />
            </WithMainBg>
          </UserContextProvider>
      </RootSiblingParent>
    </GestureHandlerRootView>
  );
}

export default App;
