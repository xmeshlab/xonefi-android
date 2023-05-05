import * as React from "react";
import { FunctionComponent } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Toast from "react-native-root-toast";
import Modal from "react-native-modal";
import { PrimaryBtn } from "../../utils/components/PrimaryBtn";
import { useCallback, useState } from "react";
import { generatedAccount, saveAccount } from "../../api/account";
import { BlurView } from "@react-native-community/blur";
import { RouteComponent } from "../../types/global";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/core/src/types";
import { GlobalRoute } from "../MainContainer";
import { BlurModal } from "../../utils/components/BlurModall";
import { globalStyle } from "../../constants/globalStyle";

//import { OneFiStorage } from '../../api/storage/OneFiStorage';
import { OneFiStorage, useOnFiStorage } from "../../api/storage/OneFiStorage";
//import { OneFiInfo } from '../../types/one.json';

//components
import BigBlueButton from "../Components/BigBlueButton";

const CreateAccountScreen: RouteComponent<"Create New Account"> = (props) => {
  const navigation = useNavigation<NavigationProp<GlobalRoute>>();
  const [isVisible, setIsVisible] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  const createAccount = useCallback(
    async function () {
      if (accountName.length < 16 || password.length < 16) {
        Toast.show("Please input 16 or more characters.");
        return;
      }
      const account = await generatedAccount(accountName, password);
      await saveAccount(
        account.address,
        account.privateKey,
        account.encryptedPrivateKey
      );
      setIsVisible(true);
    },
    [accountName, password]
  );
  const hideModal = useCallback(() => {
    setIsVisible(false);
    console.log("hide modal");
    navigation.goBack();
  }, [navigation]);

  const onTextInputChangeText = useCallback((text) => {
    setAccountName(text);
  }, []);

  const NoAccount: FunctionComponent<Props> = (props) => {
    return (
      <>
        <View className="flex-1 flex-col">
          <Text className="text-white text-3xl mt-6 mb-2 mx-6">
            No account set up yet.
          </Text>
          <Text className="text-white text-l mb-8 mx-6">
            To use XOneFi, you need a crypto account. Crypto accounts are{" "}
            <Text className="font-bold">different</Text> from traditional online
            accounts.
          </Text>
          <BigBlueButton
            text={"Generate a new account"}
            onPressFunction={() => {
              navigation.navigate("Generating New Account");
            }}
          />
          <BigBlueButton
            text={"Import an existing Account"}
            onPressFunction={() => {
              navigation.navigate("Importing New Account");
            }}
          />
          <BlurModal
            onSwipeComplete={hideModal}
            isVisible={isVisible}
            onBackdropPress={hideModal}
          >
            <Text style={globalStyle.light}>
              Success! Your new OneFi account has been created.
            </Text>
          </BlurModal>
        </View>
      </>
    );
  };

  const originData =
    '{"version":"0.2","account_set":false,"client_on":false,"ap_on":false,"pft":false,"pfd":false,"cft":false,"cfd":false,"private_client":false,"private_provider":false,"max_ofi_mb":0,"max_ofi_hr":0,"price_ofi_mb":0,"price_ofi_hr":0,"infura_api_key":"","network":"ropsten","account":{"name":"","encrypted_prk":"97olL5BviXrG9gAqgZFUy/viASovAs/SJTWQ7I66gPrGafgYHt3sHcvJpx6w2ldweEHEiaWZmD3sk7dvtr5e9tAS","address":"0x0221B57Cc38C0360f1CAf638e1671243870C0424"},"private_providers":[],"private_clients":[],"provider_ip":"192.168.0.1","port":3141,"wlan_interface":"[none]","ssids":[],"pafren_percentage":100,"min_downlink_tier":10,"min_uplink_tier":9,"client_max_pafren":200,"gas_offer":{"mainnet":"121000000000","ropsten":"7000000","kovan":"2000000"},"gas_price":{"mainnet":"121000000000","ropsten":"7300000000","kovan":"2000000"},"call_confirmation_threshold":2,"handshake_time":300,"sack_period":70,"minimum_pafren_length":3540,"expected_sack_amount":131,"expected_pafren_amount":7900,"allow_handover":false,"e2e_mode":false,"client_session":{"status":0,"ssid":"","ip":"","port":0,"prefix":"","pfd":false,"pft":false,"free":false,"restricted":false,"sack_number":0,"expiration_timestamp":0,"pafren_timestamp":0,"session_id":"","number_of_sacks":0,"pafren_amount":0,"sack_amount":0,"pafren_percentage":0,"cost":0,"scan_counter":0,"last_sack_timestamp":0,"provider_address":"","initiated_sack_number":0,"sackok":{}}}';
  //originJsonObject = (JsonObject) JsonParser.parseString(originData);
  const obj = JSON.parse(originData);

  if (obj.account_set === true) {
    //alert("Account Set True")
    console.log("Account Set True");
    return <></>;
  } else {
    //alert("Account Set False")
    console.log("Account Set False");
    return (
      <>
        <NoAccount />
      </>
    );
  }
};

export default CreateAccountScreen;

interface OwnProps {}
type Props = OwnProps;

const AccountExists: FunctionComponent<Props> = (props) => {
  return <></>;
};
