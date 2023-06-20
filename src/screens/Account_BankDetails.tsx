import React, { FunctionComponent } from "react";
import { useCallback, useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { WithMainBg } from "../Components/WithMainBg";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

//icons
import AddIcon from "../icons/add_icon";

interface OwnProps {}

type Props = OwnProps;

const AccountBankDetails: FunctionComponent<Props & RouteProp<any>> = (
  props
) => {
  return (
    <View>
      <View className="flex flex-col ml-5 mr-5">
        <View className="flex flex-row mt-6 just justify-between mx-3">
          <Text className="text-white text-xl mb-8">Bank Details</Text>
          <AddIcon className="mt-1" />
        </View>
        <View className="bg-rounded bg-slate-800 p-5 rounded-2xl justify-around">
          <View className="flex flex-row mb-5 justify-between">
            <Text className="text-white text-base">Bank Of America</Text>
            <View className="pl-3 pr-3 py-1">
              <Text className="text-white">***************</Text>
            </View>
          </View>

          <View className="flex flex-row mb-5 justify-between">
            <Text className="text-white text-base">Account Number:</Text>
            <View className="pl-4 pr-3 py-1">
              <Text className="text-white">**************</Text>
            </View>
          </View>

          <View className="flex flex-row mb-5 justify-between">
            <Text className="text-white text-base">Routing Number:</Text>
            <View className="pl-4 pr-3 py-1">
              <Text className="text-white">**************</Text>
            </View>
          </View>

          <View className="flex flex-row mb-5 justify-between">
            <Text className="text-white text-base">Daily Limit:</Text>
            <View className=" pl-4 pr-3 py-1">
              <Text className="text-white">**************</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AccountBankDetails;
