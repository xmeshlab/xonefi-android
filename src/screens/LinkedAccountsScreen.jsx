import * as React from "react";
import { View } from "react-native";
import LinkedPaymentCardIcon from "../../assets/LinkedPaymentCardIcon.png";
import UserIcon from "../../assets/UserIcon.png";
import LogoutIcon from "../../assets/LogoutIcon.png";
import { TouchableOpacity } from "react-native-gesture-handler";
//This Screen Should just be an option under accounts
import GreyButton from "../Components/GreyButton";
import { useContext } from "react";

import { useCallback } from "react";
import { useUserContext } from "../context/UserContext";
import storePrivteKey from "../hooks/StorePrivateKey"

export default function LinkedAccountScreen({ navigation }) {
  const userContext_array = useUserContext();

  return (
    //<View className="flex-1 flex-col bg-black pt-5">
    <View
      className="flex-1 flex-col pt-5"
      style={{ backgroundColor: "rgba(0,0,0,0.0)" }}
    >
      <GreyButton
        imageSource={LinkedPaymentCardIcon}
        textInput={"Linked Payment Card"}
        onPressFunction={() => navigation.navigate("Linked Payment Card")}
      />
      <GreyButton
        imageSource={UserIcon}
        textInput={"Account Information"}
        onPressFunction={() => navigation.navigate("Account Information")}
      />
      <GreyButton
        imageSource={UserIcon}
        textInput={"Legal"}
        onPressFunction={() => navigation.navigate("Legal")}
      />

    <GreyButton
        imageSource={UserIcon}
        textInput={"Change Background Color"}
        onPressFunction={() => {
          if(userContext_array[4] == "black"){
            userContext_array[5]("white");
          }else{
            userContext_array[5]("black");
          }}}
      />
      
      <GreyButton
        imageSource={LogoutIcon}
        textInput={"Logout"}
        onPressFunction={() => {
          storePrivteKey("")  //storing null in async storage for private key
          userContext_array[1]("");
          userContext_array[3]({});
        }}
      />
    </View>
  );
}
