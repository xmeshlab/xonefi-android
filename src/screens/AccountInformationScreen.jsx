import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { Linking } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import ViewButton from "../Components/ViewButton";
import GreyBackgroundBar from "../Components/GreyBackgroundBar";
import GreyBackgroundBox from "../Components/GreyBackgroundBox";
import { useUserContext } from "../context/UserContext";

import Web3 from "web3";
//@TODO check what the local host param is doing
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");


//functions for opening links
const openPrivacyPoligy = async () => {
  // Checking if the link is supported for links with custom URL scheme.
  const supported = await Linking.canOpenURL("https://app.termly.io/document/privacy-policy/91a73555-e6c8-4e46-86f9-8f3e23fd1a65");

  if (supported) {
    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    // by some browser in the mobile
    await Linking.openURL("https://app.termly.io/document/privacy-policy/91a73555-e6c8-4e46-86f9-8f3e23fd1a65");
  } else {
    Alert.alert("Failed to Open Privacy Policy");
  }
}

//functions for opening links
const openTermsAndConditions = async () => {
  // Checking if the link is supported for links with custom URL scheme.
  const supported = await Linking.canOpenURL("https://app.termly.io/document/terms-of-service/7fbdfe09-aaa4-495c-a70a-ac2131a72168");

  if (supported) {
    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    // by some browser in the mobile
    await Linking.openURL("https://app.termly.io/document/terms-of-service/7fbdfe09-aaa4-495c-a70a-ac2131a72168");
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
    </ScrollView>
  );
}

function AddressModeal({ inputText, modalIsOpen, closeModal }) {
  return (
    <Modal isVisible={modalIsOpen}>
      <View className="flex flex-col bg-white h-24 p-5">
        <TouchableOpacity
          onPress={closeModal}
          className="absolute top-1 right-2"
        >
          <Text className="text-red-400">X</Text>
        </TouchableOpacity>
        <Text className="mt-1">
          {web3.eth.accounts.privateKeyToAccount(inputText).address}
        </Text>
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
