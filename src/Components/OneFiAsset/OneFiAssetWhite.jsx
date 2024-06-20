import * as React from "react";
import { View, Text, Image} from "react-native";

import AssetGain from "../../../assets/AssetGainLogo.png";
import Web3 from "web3";


//@TODO check what the local host param is doing
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

/**
 * A Component for displaying the XOnefi token information on top of the walletScreen
 */
export default function OneFiAssetWhite({AssetPrice, AssetChange,userBalance}) {
    return (
      <View className="flex flex-col bg-slate-100 m-2 rounded-lg p-2">
        <Text className="text-black">XOneFi</Text>
        <Text className="text-black">OFI</Text>
        <View className="flex flex-row justify-center">
          <Text className="text-black text-4xl mb-2 mt-2">{Number(userBalance).toFixed(3)}</Text>
        </View>

        <View className="flex flex-row justify-around">
          <Text className="text-black">{AssetPrice}</Text>
          <View className="flex flex-row">
            <Image className="mr-1" source={AssetGain} />
            <Text className="text-green-400 mr-3 pt-1">{AssetChange}</Text>
          </View>
        </View>
      </View>
    );
}
