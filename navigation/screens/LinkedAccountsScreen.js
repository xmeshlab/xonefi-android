import * as React from "react";
import { useState } from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import LinkedPaymentCardIcon from "../../assets/LinkedPaymentCardIcon.png";
import RightArrowIcon from "../../assets/RightArrowIcon.png";
import UserIcon from "../../assets/UserIcon.png";
import CreateNewUserIcon from "../../assets/CreateNewUserIcon.png";
import LogoutIcon from "../../assets/LogoutIcon.png";
import { TouchableOpacity } from "react-native-gesture-handler";
//This Screen Should just be an option under accounts
import GreyButton from "../Components/GreyButton";

import { useCallback } from "react";

import * as WebBrowser from "@toruslabs/react-native-web-browser";
import Web3Auth, {
  LOGIN_PROVIDER,
  OPENLOGIN_NETWORK,
} from "@web3auth/react-native-sdk";

//web3Auth Code
const scheme = "web3authrnexample"; // Or your desired app redirection scheme
const resolvedRedirectUrl = `${scheme}://openlogin`;

const clientId =
  "BHU5wO49Ul-c13pLy6HT84KINj4fcQ20W_3H7dZWj5AP3LRWIE69ZjVVWZ3B0u_TkJx8TbPK6iFeK0gzf5is5Oo";

const web3auth = new Web3Auth(WebBrowser, {
  clientId,
  network: OPENLOGIN_NETWORK.TESTNET, // or other networks
});

export default function LinkedAccountScreen({ navigation }) {
  const [key, setKey] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [console, setConsole] = useState("");

  const onTouchableOpacityPress = useCallback(
    () => navigation.navigate("Account Information"),
    []
  );

  const loginWithWeb3Auth = async () => {
    try {
      setConsole("Logging in");
      const web3auth = new Web3Auth(WebBrowser, {
        clientId,
        network: OPENLOGIN_NETWORK.TESTNET, // or other networks
      });
      const info = await web3auth.login({
        loginProvider: LOGIN_PROVIDER.GOOGLE,
        redirectUrl: resolvedRedirectUrl,
        mfaLevel: "default",
        curve: "secp256k1",
      });

      setUserInfo(info);
      setKey(info.privKey);
      uiConsole("Logged In");
    } catch (e) {
      console.error(e);
    }
  };

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
        onPressFunction={onTouchableOpacityPress}
      />
      <GreyButton
        imageSource={CreateNewUserIcon}
        textInput={"Create New Account"}
        onPressFunction={() => navigation.navigate("Create New Account")}
      />
      <GreyButton
        imageSource={LogoutIcon}
        textInput={"Logout"}
        onPressFunction={() => navigation.navigate("Logout")}
      />
      <GreyButton
        imageSource={LogoutIcon}
        textInput={"Login Using Web3Auth"}
        onPressFunction={loginWithWeb3Auth}
      />
    </View>
  );
}
