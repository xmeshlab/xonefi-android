import { View, Text } from 'react-native'
import React from 'react'
import { useState } from 'react';
import BigBlueButton from "../Components/BigBlueButton/BigBlueButton";
import GreyTextInputBar from "../Components/GreyTextInputBar";
import XOneFi_Logo_Big from "../icons/XOneFi";
import { useUserContext } from "../context/UserContext";

const ProviderPasswordScreen = ({setValidPasswordProvided}) => {
    const [currentPassword, setCurrentPassword] = useState("")
    const userContext_array = useUserContext();

  return (
    <View className='flex flex-col justify-center flex-grow pb-10'>
        <View className='flex flex-row justify-center m-5'>
        {userContext_array[4] == "black" ? <XOneFi_Logo_Big /> : <View className='bg-black'><XOneFi_Logo_Big /></View>}
        </View>
      <GreyTextInputBar placeholder_text={" Enter Password"}
            state_function={setCurrentPassword}/>
        <BigBlueButton text={"Submit"}
          onPressFunction={
            ()=>{
                if(currentPassword=="Password"){
                    setValidPasswordProvided(true)
                }}
          }/>
    </View>
  )
}

export default ProviderPasswordScreen