import React, { FunctionComponent } from 'react';
import { RouteProp } from '@react-navigation/native';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import {SearchIcon} from '../icons/search_icon';

//componets
import TextInputEntry from '../Components/TextInputEntry';
interface OwnProps {}

type Props = OwnProps;
  
const AccountAddBankCard: FunctionComponent<Props & RouteProp<any>> = (props) => {
    return (
        <ScrollView style={{backgroundColor: 'transparent'}}>
            <View className="flex flex-col ml-5 mr-5">
                <Text className="text-white text-xl mb-8 mx-3">Add Bank Card</Text>
                <View className="flex flex-row pl-3 pr-3 justify-start mr-5 bg-inputBox bg-rounded p-2 rounded-2xl mb-5">
                    <View className="mt-1 ml-1 mr-2">
                        <SearchIcon/>
                    </View>
                    <TextInput selectionColor="#FFF" placeholderTextColor="#FFF" placeholder="Enter bank name"/>
                </View>
                <Text className="text-white text-xl mb-8 mx-3">Manual Entrey</Text>    
                <View className="bg-rounded bg-backgroundBox p-5 rounded-2xl justify-around">
                        <TextInputEntry input_text={"Bank Name:"}/>
                        <TextInputEntry input_text={"Account Number"}/>
                        <TextInputEntry input_text={"Routing Number"}/>
                        <TextInputEntry input_text={"Daily Limit"}/>
                    </View>
                </View>
        </ScrollView>
    )

}

export default AccountAddBankCard