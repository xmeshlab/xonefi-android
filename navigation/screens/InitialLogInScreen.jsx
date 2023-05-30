import { View, Text } from 'react-native'
import React from 'react'
import BigBlueButton from '../Components/BigBlueButton'
import XOneFi_Logo_Big from '../icons/XOneFi'

const InitialLogInScreen = ({logInFunction}) => {
  return (
    <View>
      <Text>Not Logged In</Text>
      <XOneFi_Logo_Big/>
      <BigBlueButton text={"Log In"} onPressFunction={logInFunction}/>
    </View>
  )
}

export default InitialLogInScreen