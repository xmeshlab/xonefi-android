import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import BackgroundBar from "../Components/BackgroundBar/BackgroundBar";
import GreyBackgroundBox from "../Components/GreyBackgroundBox/GreyBackgroundBox";
import { useUserContext } from "../context/UserContext";

import Clipboard from '@react-native-clipboard/clipboard';

import Web3 from "web3";
//@TODO check what the local host param is doing
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");


export function AccountInformationScreen({ navigation, userContext_array }) {

  const copyToClipboard = () => {
    Clipboard.setString(web3.eth.accounts.privateKeyToAccount(userContext_array[0]).address);
  };

  return (
    <ScrollView>
      <GreyBackgroundBox
        titleText={"Wallet Address"}
        children={
          <>
             <View className="flex flex-row justify-center items-center">
                <TouchableOpacity onPress={copyToClipboard}>
                  <Text className="text-xs">
                    {web3.eth.accounts.privateKeyToAccount(userContext_array[0]).address}
                  </Text>
                </TouchableOpacity>
              </View>
          </>
          }
      />
  <View className="mb-5">
    <GreyBackgroundBox
          titleText={"App Information"}
          children={
              <BackgroundBar
                LeftText={"Current Version"}
                RightSideComponent={
                  <View className="rounded-md border-slate-600 bg-slate-600 pl-3 pr-3 py-1">
                    <Text className="text-white">1.0.10</Text>
                </View>
                }
              />
          }
        />
      </View>
    </ScrollView>
  );
}

export default ({ navigation }) => {
  //the context is passed in as a prop. This makes writing jest tests feasible while dealing with the usage of native code
  const userContext_array = useUserContext();

  return (
    <AccountInformationScreen
      navigation={navigation}
      userContext_array={userContext_array}
    />
  );
};