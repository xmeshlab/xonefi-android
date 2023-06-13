import * as React from "react";
import { View, Text, Image, ImageBackground, Touchable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

//import providor component
import Provider from "../Components/Provider";

import backgroundImage from "../../assets/background.png";

export default function ProviderScreen({ navigation }) {
  return (
    <View className="flex-1">
      <Provider
        ProviderName="R139481"
        UsersConnectedNumber={5}
        TokenGenNumber={230}
        Status={true}
        navigationFunction={() => navigation.navigate("ProviderDetails")}
      />
      <Provider
        ProviderName="R139481"
        UsersConnectedNumber={2}
        TokenGenNumber={123}
        Status={true}
        navigationFunction={() => navigation.navigate("ProviderDetails")}
      />
      <Provider
        ProviderName="R139481"
        UsersConnectedNumber={6}
        TokenGenNumber={192}
        Status={false}
        navigationFunction={() => navigation.navigate("ProviderDetails")}
      />
    </View>
  );
}
