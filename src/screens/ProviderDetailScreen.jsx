import * as React from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import ViewButton from "../Components/ViewButton";
import GreyBackgroundBar from "../Components/GreyBackgroundBar";

import { useLocation } from "react-router-dom";

//import providor component
import Provider from "../Components/Provider";
import GreyBackgroundBox from "../Components/GreyBackgroundBox";

/**
 * This screen displays additional information about a specific XOneFi Provider. 
 * A User is routed to this page after clicking on a Provider displayed on the Provider Screen. 
 */
export default function ProviderDetailScreen({ route, navigation }) {

  const {SSID} = route.params;

  return (
    <ScrollView>
      <GreyBackgroundBox
        titleText={"Router Information"}
        children={
          <>
            <GreyBackgroundBar
              LeftText={"Router Name"}
              RightSideComponent={<Text className="text-white">{SSID}</Text>}
            />
            <GreyBackgroundBar
              LeftText={"IP Address"}
              RightSideComponent={<Text>Insert</Text>}
            />
            <GreyBackgroundBar
              LeftText={"Wifi-Speed"}
              RightSideComponent={<Text>Insert</Text>}
            />
          </>
        }
      />

      <GreyBackgroundBox
        titleText={"Sharing  Setting"}
        children={
          <>
            <GreyBackgroundBar
              LeftText={"OFI/GB"}
              RightSideComponent={
                <ViewButton
                  OnPressFunction={() => {
                    alert("Button Pressed");
                  }}
                />
              }
            />
            <GreyBackgroundBar
              LeftText={"Private Connection"}
              RightSideComponent={
                <ViewButton
                  OnPressFunction={() => {
                    alert("Button Pressed");
                  }}
                />
              }
            />
            <GreyBackgroundBar
              LeftText={"Share Time/Daily"}
              RightSideComponent={
                <ViewButton
                  OnPressFunction={() => {
                    alert("Share Times/Daily");
                  }}
                />
              }
            />
          </>
        }
      />

      <GreyBackgroundBox
        titleText={"Connected Clients"}
        children={
          <>
            <View className="flex flex-row mb-2 justify-between">
              <Text className="text-white text-base">OFI/GB</Text>
              <TouchableOpacity className="rounded-md border-slate-600 bg-slate-600 pl-3 pr-3 py-1">
                <Text className="text-white">View</Text>
              </TouchableOpacity>
            </View>
          </>
        }
      />
    </ScrollView>
  );
}
