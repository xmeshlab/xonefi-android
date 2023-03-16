import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Toast from 'react-native-root-toast';
import Modal from 'react-native-modal';
import { PrimaryBtn } from '../../utils/components/PrimaryBtn';
import { useCallback, useState } from 'react';
import { generatedAccount, saveAccount } from '../../api/account';
import { BlurView } from '@react-native-community/blur';
import { RouteComponent } from '../../types/global';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/core/src/types';
import { GlobalRoute } from '../MainContainer';
import { BlurModal } from '../../utils/components/BlurModall';
import { globalStyle } from '../../constants/globalStyle';


const CreateAccountScreen: RouteComponent<'Create New Account'> = (props) => {
    const navigation = useNavigation<NavigationProp<GlobalRoute>>();
    const [isVisible, setIsVisible] = useState(false);
    const [accountName, setAccountName] = useState('');
    const [password, setPassword] = useState('');
    const createAccount = useCallback(async function () {
        if (accountName.length < 16 || password.length < 16) {
            Toast.show('Please input 16 or more characters.');
            return;
        }
        const account = await generatedAccount(accountName, password);
        await saveAccount(account.address, account.privateKey, account.encryptedPrivateKey);
        setIsVisible(true);
    }, [accountName, password]);
    const hideModal = useCallback(() => {
        setIsVisible(false);
        console.log('hide modal');
        navigation.goBack();
    }, [navigation]);

    const onTextInputChangeText = useCallback(text => {
        setAccountName(text);
    }, [])

    return (<><View className="flex-1 flex-col">
        <Text className="text-white text-3xl mt-6 mb-8 mx-6">New OneFi Account</Text>
        <View className="flex flex-col ml-5 mr-5 bg-slate-800 bg-rounded p-5 rounded-2xl justify-around">
            <View className="flex flex-row mb-5 justify-between">
                <Text className="text-white text-base">Account Name</Text>
                <View className="rounded-md border-slate-600 bg-slate-600 pl-3 pr-3 py-1">
                    <TextInput value={accountName} selectionColor="#FFF"
                               onChangeText={onTextInputChangeText}
                               placeholderTextColor="#FFF" placeholder="Username"/>
                </View>
            </View>

            <View className="flex flex-row justify-between">
                <Text className="text-white text-base">Password</Text>
                <View className="rounded-md border-slate-600 bg-slate-600 pl-4 pr-3 py-1">
                    <TextInput value={password} placeholder="Password"
                               onChangeText={setPassword}
                               placeholderTextColor="#FFF"/>
                </View>
            </View>
        </View>

        <View className="mt-8 p-5 flex flex-row justify-center">
            <PrimaryBtn className="flex-1" onPress={createAccount}>
                <Text className="text-white text-sm m-1">Create Account</Text>
            </PrimaryBtn>
        </View>
        <BlurModal  onSwipeComplete={hideModal} isVisible={isVisible}
                   onBackdropPress={hideModal}
        >

                <Text style={globalStyle.light}>
                    Success! Your new OneFi
                    account has been created.
                </Text>

        </BlurModal>
    </View>

    </>);
}

export default CreateAccountScreen;
