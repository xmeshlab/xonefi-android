import * as React from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import ViewButton from "../Components/ViewButton";
import GreyBackgroundBar from "../Components/GreyBackgroundBar";
import {GreyTextInputBarNoMargin} from "../Components/GreyTextInputBar";
import GreyBackgroundBox from "../Components/GreyBackgroundBox";
import { useState } from "react";

/**
 * This screen displays additional information about a specific XOneFi Provider. 
 * A User is routed to this page after clicking on a Provider displayed on the Provider Screen. 
 */
export default function ProviderDetailScreen({ route, navigation }) {

  const {SSID} = route.params;

  const [shareTimeDaily, setShareTimeDaily] = useState(0);

  return (
    <ScrollView>
      <GreyBackgroundBox
        titleText={"Router Information"}
        children={
          <>
            <Text className="text-orange-500 mb-5 text-base">{SSID}</Text>
            <GreyBackgroundBar
              LeftText={"IP Address"}
              RightSideComponent={<ViewButton
                OnPressFunction={() => {
                  alert("Button Pressed");
                }}
              />}
            />
            <GreyBackgroundBar
              LeftText={"Wifi-Speed"}
              RightSideComponent={<ViewButton
                OnPressFunction={() => {
                  alert("Button Pressed");
                }}
              />}
            />
          </>
        }
      />

      <GreyBackgroundBox
        titleText={"Sharing  Setting"}
        children={
          <>
            <GreyBackgroundBar
              LeftText={"OFI/Minute"}
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
                <GreyTextInputBarNoMargin placeholder_text={""} state_function={setShareTimeDaily}/>
              }
            />
          </>
        }
      />

      {/*<GreyBackgroundBox
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
      />*/}
      <Text className="text-white text-3xl mt-6 mb-8 mx-6">Connected Clients</Text>
      </ScrollView>
  );
}
