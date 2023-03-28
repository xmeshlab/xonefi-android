import * as React from 'react';
import { FunctionComponent } from 'react';
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

//components
import BigBlueButton from '../Components/BigBlueButton';
import GreyTextInputBar from '../Components/GreyTextInputBar';

//Importing accoun.js api 
//import {test_prk, import_account} from '../../xonefiapi/account';

import { ScrollView } from 'react-native-gesture-handler';

/**
 * 
 * Android Bundling failed 5903ms
You attempted attempted to import the Node standard library module "os" from "xonefiapi\account.js".
It failed because the native React runtime does not include the Node standard library.
 * 
 */

const ImportAccountDialog: RouteComponent<'Create New Account'> = (props) => {
  const navigation = useNavigation<NavigationProp<GlobalRoute>>();
    const [isVisible, setIsVisible] = useState(false);
    const [privateKey, setPrivateKey] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const importAccount = useCallback(async function () {
        if (password.length < 16) {
            Toast.show('Please input 16 or more characters.');
            return;
        }else{
            //const account = import_account(password2, privateKey)
            //test_prk(,privateKey)
            //await saveAccount(account.address, account.privateKey, account.encryptedPrivateKey);
            setIsVisible(true);
            return 
        }
    }, []);


    const hideModal = useCallback(() => {
        setIsVisible(false);
        console.log('hide modal');
        navigation.goBack();
    }, [navigation]);

    /*const onTextInputChangeText = useCallback(text => {
        setAccountName(text);
    }, [])*/


   return(
            <>
            <View className="flex-1 flex-col">
                <ScrollView>
                    <Text className="text-white text-3xl mt-6 mb-2 mx-6">Importing an existing account.</Text>
                    <Text className="text-white text-l mb-2 mx-6 mt-2">Please enter your existing account's private key below</Text>
                    <GreyTextInputBar placeholder_text={"Enter Private Key"} state_function={setPrivateKey}/>
                    <Text className="text-white text-l mb-2 mx-6 mt-2">Please create a good secret password that will be used to encrypt the private key stored at this computer. The password must be at least 8 symbols long. Please note that this password is used only locally, and it is not your account password. </Text>
                    <GreyTextInputBar placeholder_text={"Enter Secret Password"} state_function={setPassword}/>
                    <Text className="text-white text-l mb-2 mx-6 mt-2">Repeat Password</Text>
                    <GreyTextInputBar placeholder_text={"Enter Secret Password"} state_function={setPassword2}/>
                    <BigBlueButton text={"Import Account"} onPressFunction={importAccount}/>
                    <BlurModal  onSwipeComplete={hideModal} isVisible={isVisible}
                    onBackdropPress={hideModal}
            >

                        <Text style={globalStyle.light}>
                            Success! Your new OneFi
                            account has been created.
                        </Text>

                    </BlurModal>
                    {/***Navigate to account tab on cancel */}
                    <BigBlueButton text={"Cancel"} onPressFunction={()=>{navigation.navigate("Account")}}/>
                </ScrollView>
            </View>
            </>
        )
    
}

export default ImportAccountDialog