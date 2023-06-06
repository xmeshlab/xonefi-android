import { View, Text } from 'react-native'
import React from 'react'
import BigBlueButton from '../Components/BigBlueButton'
import XOneFi_Logo_Big from '../icons/XOneFi'

const InitialLogInScreen = ({logInFunction}) => {
  return (
    <View className="h-screen">
        <View className="flex flex-row justify-center w-screen absolute top-1/4">
            <XOneFi_Logo_Big/>
        </View>

        <View className="absolute top-1/2 w-screen">
            <BigBlueButton text={"Log In"} onPressFunction={logInFunction}/>
            <BigBlueButton text={"Sign Up"} onPressFunction={()=>{alert("Sign Up Button Clicked")}}/>
        </View>
    </View>
  )
}

export default InitialLogInScreen