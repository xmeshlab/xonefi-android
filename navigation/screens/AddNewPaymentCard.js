import * as React from 'react'
import {View, Text, Image, ImageBackground} from 'react-native'

import backgroundImage from "../../assets/background.png"

export default function AddNewPaymentCard({navigation}) {
    return(
        <ImageBackground source={backgroundImage} resizeMode="cover" className="flex-1 flex-col">
            <Text className="text-white text-4xl">Add New Payment Card</Text>
       </ImageBackground>
    );
}
