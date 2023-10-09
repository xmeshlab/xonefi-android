import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { Linking } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import ViewButton from "../Components/ViewButton";
import GreyBackgroundBar from "../Components/GreyBackgroundBar";
import GreyBackgroundBox from "../Components/GreyBackgroundBox";
import { useUserContext } from "../context/UserContext";

import Clipboard from '@react-native-clipboard/clipboard';

import Web3 from "web3";
//@TODO check what the local host param is doing
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");


//functions for opening links
const openPrivacyPoligy = async () => {
  // Checking if the link is supported for links with custom URL scheme.
  const supported = await Linking.canOpenURL("https://xmesh.org/PrivacyPolicy");

  if (supported) {
    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    // by some browser in the mobile
    await Linking.openURL("https://xmesh.org/PrivacyPolicy");
  } else {
    Alert.alert("Failed to Open Privacy Policy");
  }
}

//functions for opening links
const openTermsAndConditions = async () => {
  // Checking if the link is supported for links with custom URL scheme.
  const supported = await Linking.canOpenURL("https://xmesh.org/TermsAndConditions");

  if (supported) {
    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    // by some browser in the mobile
    await Linking.openURL("https://xmesh.org/TermsAndConditions");
  } else {
    Alert.alert("Failed to Open Terms and Conditions");
  }
}

export function AccountInformationScreen({ navigation, userContext_array }) {
  const [pkModalIsOpen, setPKModalIsOpen] = useState(false);
  const [addressModalIsOpen, setAddressModalIsOpen] = useState(false);

  function openModal_PK() {
    setPKModalIsOpen(true);
  }

  function closeModal_PK() {
    setPKModalIsOpen(false);
  }

  function openAddressModal() {
    setAddressModalIsOpen(true);
  }

  function closeAddressModal() {
    setAddressModalIsOpen(false);
  }

  return (
    <ScrollView>
      <GreyBackgroundBox
        titleText={"Account Information"}
        children={
          <>
            <GreyBackgroundBar
              LeftText={"Native Currency"}
              RightSideComponent={
                <>
                  <View className="rounded-md border-slate-600 bg-slate-600 pl-3 pr-3 py-1">
                    <Text className="text-white">***************</Text>
                  </View>
                </>
              }
            />
            <GreyBackgroundBar
              LeftText={"Country"}
              RightSideComponent={
                <>
                  <View className="rounded-md border-slate-600 bg-slate-600 pl-4 pr-3 py-1">
                    <Text className="text-white">United States</Text>
                  </View>
                </>
              }
            />
          </>
        }
      />

      <GreyBackgroundBox
        titleText={"Legal"}
        children={
          <>
            <GreyBackgroundBar
              LeftText={"Terms"}
              RightSideComponent={
                <ViewButton
                  OnPressFunction={
                    openTermsAndConditions
                  }
                />
              }
            />

            <GreyBackgroundBar
              LeftText={"Privacy Policy"}
              RightSideComponent={
                <ViewButton
                  OnPressFunction={
                    openPrivacyPoligy
                  }
                />
              }
            />
          </>
        }
      />

      <GreyBackgroundBox
        titleText={"Wallet Address"}
        children={
          <>
            <GreyBackgroundBar
              LeftText={"Address"}
              RightSideComponent={
                <ViewButton
                  OnPressFunction={() => {
                    openAddressModal();
                  }}
                />
              }
            />

            <GreyBackgroundBar
              LeftText={"Private Key"}
              RightSideComponent={
                <ViewButton
                  OnPressFunction={() => {
                    openModal_PK();
                  }}
                />
              }
            />
            <PrivateKeyModal
              inputText={"Private Key"}
              modalIsOpen={pkModalIsOpen}
              closeModal={closeModal_PK}
            />
            <AddressModeal
              inputText={userContext_array[0]}
              modalIsOpen={addressModalIsOpen}
              closeModal={closeAddressModal}
            />
          </>
        }
      />
  <View className="mb-5">
    <GreyBackgroundBox
          titleText={"App Information"}
          children={
              <GreyBackgroundBar
                LeftText={"Current Version"}
                RightSideComponent={
                  <View className="rounded-md border-slate-600 bg-slate-600 pl-3 pr-3 py-1">
                    <Text className="text-white">0.1.1</Text>
                </View>
                }
              />
          }
        />
      </View>
    </ScrollView>
  );
}

function AddressModeal({ inputText, modalIsOpen, closeModal }) {

  const copyToClipboard = () => {
    Clipboard.setString(web3.eth.accounts.privateKeyToAccount(inputText).address);
  };

  return (
    <Modal isVisible={modalIsOpen}>
      <View className="flex flex-col bg-white h-24 p-5">
        <TouchableOpacity
          onPress={closeModal}
          className="absolute top-1 right-2"
        >
          <Text className="text-red-400">X</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={copyToClipboard}>
          <Text className="mt-1">
            {web3.eth.accounts.privateKeyToAccount(inputText).address}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

function PrivateKeyModal({ inputText, modalIsOpen, closeModal }) {
  return (
    <Modal isVisible={modalIsOpen}>
      <View className="flex flex-col bg-white h-24 p-5">
        <TouchableOpacity
          onPress={closeModal}
          className="absolute top-1 right-2"
        >
          <Text className="text-red-400">X</Text>
        </TouchableOpacity>
        <Text className="mt-1">{inputText}</Text>
      </View>
    </Modal>
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