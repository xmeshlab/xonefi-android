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
import Svg, { Path, Defs, G, Pattern, Use, Image } from "react-native-svg";
import BigBlueButton from "../Components/BigBlueButton";
import { CashLogoSVG } from "../icons/crypto_icons";
import { OneFiLogoSVG } from "../icons/crypto_icons";

const backgroundImage = require("../../assets/backgroundSquare.png");
interface OwnProps {}

type Props = OwnProps;

const tabBtnList = ["Buy", "Sell"];

function DropDownIcon(props) {
  return (
    <Svg
      width={19}
      height={19}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M4.044 6.4a.59.59 0 01.78-.058l.068.059 4.804 4.9 4.805-4.9a.59.59 0 01.78-.06l.067.06a.62.62 0 01.058.796l-.058.069-5.228 5.333a.59.59 0 01-.78.059l-.068-.06-5.228-5.332a.62.62 0 010-.865z"
        fill="#fff"
      />
    </Svg>
  );
}

const itemData = [
  {
    icon: <Text>1</Text>,
  },
  {
    icon: <Text>2</Text>,
  },
  {
    icon: <Text>3</Text>,
  },
  {
    icon: <Text>4</Text>,
  },
  {
    icon: <Text>5</Text>,
  },
  {
    icon: <Text>6</Text>,
  },
  {
    icon: <Text>7</Text>,
  },
  {
    icon: <Text>8</Text>,
  },
  {
    icon: <Text>9</Text>,
  },
  {
    icon: <Text>.</Text>,
  },
  {
    icon: <Text>1</Text>,
  },
  {
    icon: <Text>1</Text>,
  },
];

const InputBar = ({ IconComponent, TokenName }) => {
  return (
    <View className="flex flex-row mx-4 mb-1 mt-2 justify-between rounded-3xl border-slate-800 bg-slate-800 pl-3 pr-3 py-1 items-center">
      <TextInput
        className="w-4/6"
        selectionColor="#FFF"
        placeholderTextColor="#FFF"
        placeholder=""
        keyboardType="numeric"
      />
      <Text className="text-gray-600">|</Text>
      <IconComponent className="scale-50" />
      <Text className="text-white">{TokenName}</Text>
      <DropDownIcon />
    </View>
  );
};
const PurchaseSell: FunctionComponent<Props & RouteProp<any>> = (props) => {
  const [currentActive, setCurrentActive] = useState("Buy");

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      className="flex-1 flex-col"
    >
      <View style={style.tabBar}>
        <View style={style.tabBarInner}>
          {tabBtnList.map((tab) => {
            const tabStyle = [
              style.tabBtn,
              currentActive === tab ? style.tabBtnActive : null,
            ];
            const textStyle = [
              style.tabBtnText,
              currentActive === tab ? style.tabBtnActiveText : null,
            ];
            return (
              <TouchableOpacity
                key={tab}
                style={tabStyle}
                onPress={() => setCurrentActive(tab)}
              >
                <Text style={textStyle}>{tab}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View className="flex flex-row justify-center m-3">
        <Text className="text-white text-xl">1 OFI is roughly $5.087 USD</Text>
      </View>
      <InputBar IconComponent={OneFiLogoSVG} TokenName="OFI" />
      <InputBar IconComponent={CashLogoSVG} TokenName="USD" />
      <View className="mt-4">
        <BigBlueButton
          text={"Complete Purchase"}
          onPressFunction={() => {
            alert("Button Pressed");
          }}
        />
      </View>
    </ImageBackground>
  );
};

export default PurchaseSell;

const style = StyleSheet.create({
  mgnTop: { marginTop: 80 },
  tabBar: {
    marginTop: 18,
    height: 51,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 10,
  },
  tabBarInner: {
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 1,
    marginRight: 1,
  },
  tabBtn: {
    color: "#fff",
    width: 97,
    height: 33,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15.6,
    fontSize: 14,
  },
  tabBtnText: {
    color: "#D3D3D3",
  },
  tabBtnActiveText: {
    color: "#0000FF",
  },
});
