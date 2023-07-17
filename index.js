

import "react-native-gesture-handler";
import "./global";
import { registerRootComponent } from "expo";


import {AppRegistry} from 'react-native';


import App from "./App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);


AppRegistry.registerHeadlessTask('bgtask', () =>
    require('./bgtask'),
);