import React from 'react';
import { View, Text, TextInput } from 'react-native';

export default function TextInputEntry({input_text}){
    return(
        <View className="flex flex-row mb-5 justify-between">
            <Text className="text-white text-base">{input_text}</Text>
            <View className="flex flex-row pl-3 pr-3 justify-between bg-inputBox bg-rounded rounded-xl w-5/12">
                <TextInput selectionColor="#FFF" placeholderTextColor="#FFF" placeholder="********"/>
            </View>
        </View>
    )
}