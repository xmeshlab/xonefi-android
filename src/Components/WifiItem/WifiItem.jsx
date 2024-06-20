import * as React from "react";

import WifiItemWhite from "./WifiItemWhite";
import WifiItemBlack from "./WifiItemBlack";
import { useUserContext } from "../../context/UserContext";


//A Component for the available XOneFi Routers icons displayed on the ConnectScreen
export default function WifiItem({
    SSID,
    frequency,
    signalLevel,
  }) {
    const userContext_array = useUserContext();

    if(userContext_array[4] == "black"){
      return( <WifiItemBlack SSID={SSID} signalLevel={signalLevel}/>)
  }else{
    return( <WifiItemWhite SSID={SSID} signalLevel={signalLevel}/>)
  }
}