import * as React from 'react'
import { RootSiblingParent } from 'react-native-root-siblings';
import MainContainer from './navigation/MainContainer'
import BackgroundTimer from 'react-native-background-timer';
import { bar } from './xonefiapi/foo';
import { read_default_config, write_default_config } from './xonefiapi/config'
import {clientFoo} from "./client-daemon/client-foo";


function App() {
    console.log("XLOG: App.tsx");

    clientFoo();


    // BackgroundTimer.runBackgroundTimer(async () => {
    //         let config_json = await read_default_config();
    //         console.log("XLOG: ping: " + JSON.stringify(config_json));
    //         config_json["port"]++;
    //         await write_default_config(config_json);
    //     },
    //     3000);


    return (<RootSiblingParent>
            <MainContainer/>
        </RootSiblingParent>);
}

export default App;