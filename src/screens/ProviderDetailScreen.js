import * as React from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import ViewButton from "../Components/ViewButton";
import GreyBackgroundBar from "../Components/GreyBackgroundBar";

//import providor component
import Provider from "../Components/Provider";

import backgroundImage from "../../assets/background.png";

export default function ProviderDetailScreen({ navigation }) {
  return (
    <ScrollView>
        <Text className="text-white text-xl mt-6 mb-1 mx-6">
          Router Information
        </Text>
        <View className="flex flex-col ml-5 mr-5 bg-slate-800 bg-rounded p-5 rounded-2xl justify-around">
          
          <GreyBackgroundBar LeftText={"Router Name"} RightSideComponent={<Text>Insert</Text>}/>
          <GreyBackgroundBar LeftText={"IP Address"} RightSideComponent={<Text>Insert</Text>}/>
          <GreyBackgroundBar LeftText={"Wifi-Speed"} RightSideComponent={<Text>Insert</Text>}/>
        </View>

        <Text className="text-white text-xl mt-3 mb-1 mx-6">Sharing Setting</Text>
        <View className="flex flex-col ml-5 mr-5 bg-slate-800 bg-rounded p-5 rounded-2xl justify-around">
        
          <GreyBackgroundBar LeftText={"OFI/GB"}RightSideComponent={<ViewButton OnPressFunction={()=>{alert("Button Pressed")}}/>}/>
          <GreyBackgroundBar LeftText={'Private Connection'} RightSideComponent={<ViewButton OnPressFunction={()=>{alert("Button Pressed")}}/>}/>
          <GreyBackgroundBar LeftText={'Share Time/Daily'} RightSideComponent={<ViewButton OnPressFunction={()=>{alert("Share Times/Daily")}}/>}/>
        </View>

        <Text className="text-white text-xl mt-3 mb-1 mx-6">
          Connected Clients
        </Text>
        <View className="flex flex-col ml-5 mr-5 bg-slate-800 bg-rounded p-5 rounded-2xl justify-around">
          <View className="flex flex-row mb-2 justify-between">
            <Text className="text-white text-base">OFI/GB</Text>
            <TouchableOpacity className="rounded-md border-slate-600 bg-slate-600 pl-3 pr-3 py-1">
              <Text className="text-white">View</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
  );
}
