import React, {useState} from "react";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import backgroundImage from "../../assets/background.png";
import Modal from 'react-native-modal';
import ReactDOM from 'react-dom';

import { useContext } from "react";
import { userContext } from "../MainContainer";
import { ScrollView } from "react-native-gesture-handler";


function ViewButton({ OnPressFunction }) {
  return (
    <TouchableOpacity className="rounded-md border-slate-600 bg-slate-600 pl-3 pr-3 py-1" onPress={OnPressFunction}>
      <Text className="text-white">View</Text>
    </TouchableOpacity>
  );
}

function GreyBackgroundBar({ RightSideComponent, LeftText }) {
  return (
    <View className="flex flex-row mb-5 justify-between items-center">
      <Text className="text-white text-base">{LeftText}</Text>
      {RightSideComponent}
    </View>
  );
}

export default function AccountInformationScreen({ navigation }) {
  const userContext_array = useContext(userContext)

  const [pkModalIsOpen, setPKModalIsOpen] = useState(false);

  function openModal_PK() {
    setPKModalIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal_PK() {
    setPKModalIsOpen(false);
  }

  return (
    <ScrollView>
      <Text className="text-white text-3xl mt-6 mb-8 mx-6">
        Account Informtion
      </Text>
      <View className="flex flex-col ml-5 mr-5 bg-slate-800 bg-rounded p-5 rounded-2xl justify-around">
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
      </View>

      <Text className="text-white text-3xl mt-6 mb-8 mx-6">Legal</Text>
      <View className="flex flex-col ml-5 mr-5 bg-slate-800 bg-rounded p-5 rounded-2xl justify-around">
        <GreyBackgroundBar
          LeftText={"Terms"}
          RightSideComponent={<ViewButton OnPressFunction={()=>{openModal_PK()}} />}
        />
        
        <GreyBackgroundBar
          LeftText={"Privacy Policy"}
          RightSideComponent={<ViewButton OnPressFunction={()=>{openModal_PK()}}/>}
        />
      </View>

      <Text className="text-white text-3xl mt-6 mb-8 mx-6">Wallet Address</Text>
      <View className="flex flex-col ml-5 mr-5 bg-slate-800 bg-rounded p-5 rounded-2xl justify-around">
        <GreyBackgroundBar
          LeftText={"Address"}
          RightSideComponent={<ViewButton OnPressFunction={()=>{openModal_PK()}}/>}
        />

        <GreyBackgroundBar
          LeftText={"Private Key"}
          RightSideComponent={<ViewButton OnPressFunction={()=>{openModal_PK()}} />}
        />
        <ModalWithCustomText inputText={userContext_array[0]} modalIsOpen={pkModalIsOpen} closeModal={closeModal_PK}/>
      </View>
      </ScrollView>
  );
}



function ModalWithCustomText({inputText, modalIsOpen, closeModal}){
  return(
    <Modal
    isVisible={modalIsOpen}
  >
    <View className="flex flex-col bg-white h-24 p-5">
      <TouchableOpacity onPress={closeModal} className="absolute top-1 right-2">
        <Text className="text-red-400">X</Text>
      </TouchableOpacity>
      <Text className="mt-1">{inputText}</Text>
    </View>
  </Modal>
  )
}