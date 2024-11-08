import * as React from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";

import AssetGain from "../../../assets/AssetGainLogo.png";
import Web3 from "web3";

import OneFiAssetBlack from "./OneFiAssetBlack";
import OneFiAssetWhite from "./OneFiAssetWhite";

//@TODO check what the local host param is doing
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

/**
 * A Component for displaying the XOnefi token information on top of the walletScreen
 */
export default function OneFiAsset({AssetPrice, AssetChange }) {
  const context_array = useUserContext();
  const user_address = web3.eth.accounts.privateKeyToAccount(context_array[0]).address

  const [userBalance, setUserBalance] = useState(0);

  useEffect(() => {
    const token = ""
    const url = "http://137.184.243.11:3000/quickservice?op=ofibalance&token=c916b36&address=" + user_address
    //const url = "/quickservice?op=ofibalance&token=" + token + "&address=" + user_address
    fetch(url).then((res) => res.json())
    .then((resJSON) => {
        console.log("resJson : ")
        console.log(resJSON)
        if(resJSON == -1){
          setUserBalance("Error");
        }else{
          const normalized_balance = resJSON / 10**18
          setUserBalance(normalized_balance);
        }
        });

  }, []);

  const userContext_array = useUserContext();

  //check background color variable in the userContext to determine which background to render
  if(userContext_array[4] == "black"){
    return (
      <OneFiAssetBlack AssetPrice={AssetPrice} AssetChange={AssetChange} userBalance={userBalance}/>
    );
  }else{
    //white background
    return(
      <OneFiAssetWhite AssetPrice={AssetPrice} AssetChange={AssetChange} userBalance={userBalance}/>
    );
  }
}
