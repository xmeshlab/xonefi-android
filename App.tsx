import * as React from 'react'
import { RootSiblingParent } from 'react-native-root-siblings';
import MainContainer from './navigation/MainContainer'
import BackgroundTimer from 'react-native-background-timer';
import { bar } from './xonefiapi/foo';
import { read_default_config, write_default_config } from './xonefiapi/config'
import {startClientDaemon} from "./client-daemon/start-client-daemon";


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



    startClientDaemon().then(() => {
        console.log("XLOG: Client Daemon Started");
    });

    return (<RootSiblingParent>
            <MainContainer/>
        </RootSiblingParent>);
}

export default App;