import React, { useEffect } from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import MainContainer from "./src/MainContainer";
import BackgroundTimer from "react-native-background-timer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  read_default_config,
  write_default_config,
  starter_config,
} from "./xonefi-api-client/config";
import { UserContextProvider } from "./src/context/UserContext";
import { startClientDaemon } from "./client-daemon/start-client-daemon";

import SplashScreen from "react-native-splash-screen";
import { WithMainBg } from "./src/Components/WithMainBg";
import { StatusBar } from "expo-status-bar";

import AsyncStorage from '@react-native-async-storage/async-storage';
import {json} from "react-router-dom";

//
// function store_value(value, callback) {
//   try {
//     //const jsonValue = JSON.stringify(value);
//     AsyncStorage.setItem('key7', value).then(() => {
//         return callback(true);
//     });
//   } catch (e) {
//     console.log("CC3");
//     return callback(false);
//   }
// }
//
// function retrieve_value(callback) {
//   try {
//     AsyncStorage.getItem('key7').then((value) => {
//       if(value !== null) {
//         return callback(value);
//       } else {
//         return callback({});
//       }
//     });
//   } catch (e) {
//     console.log("CC1");
//     return callback({"error": true});
//   }
// }
//
// async function atest() {
//   const getData = async () => {
//     try {
//       const jsonValue = await AsyncStorage.getItem('key5');
//       return jsonValue != null ? JSON.parse(jsonValue) : null;
//     } catch (e) {
//       console.log("CC1");
//     }
//   };
//
//   const storeData = async (value) => {
//     try {
//       const jsonValue = JSON.stringify(value);
//       await AsyncStorage.setItem('key5', jsonValue);
//     } catch (e) {
//       console.log("CC3");
//     }
//   };
//
//
//   let val = await getData();
//   console.log(`getData1: ${JSON.stringify(val)}`);
//
//   await storeData({"vall": "kappa"});
//
//   val = await getData();
//   console.log(`getData2: ${JSON.stringify(val)}`);
// }

function App() {
  console.log("XLOG: App.tsx");

  //
  // read_default_config_new((cjson) => {
  //   console.log(`RDCN result: ${JSON.stringify(cjson)}`);
  //   //cjson.version = "0.3";
  //   // write_default_config_new(cjson, () => {
  //   //   console.log(`CJSON Writing done.`);
  //   // });
  // });

  // store_value("hello", () => {
  //     retrieve_value((value) => {
  //       console.log(`RETRIEVED VALUE: ${value}`);


  let daemon_counter = 0;

  startClientDaemon().then(() => {
    console.log("XLOG: Client Daemon Started");
  });



  // config_init_if_absent((ret) => {
  //   if (ret === true) {
  //     console.log("XLOG: Database is ready.");
  //     console.log("XLOG: Starting Client Daemon.");
  //     daemon_counter++;
  //     console.log(`Daemon counter: ${daemon_counter}`);
  //     if(daemon_counter === 1) {
  //       console.log(`XLOG5: daemon counter after start ${daemon_counter}`);
  //       startClientDaemon().then(() => {
  //         console.log("XLOG: Client Daemon Started");
  //       });
  //     }
  //   } else {
  //     console.log("XLOG: Database initialization error.");
  //   }
  // });

        //startClientDaemon();






  //     });
  // });


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
