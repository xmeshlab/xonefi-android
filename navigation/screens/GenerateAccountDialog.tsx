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

const GenerateAccountDialog: RouteComponent<'Create New Account'> = (props) => {
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


   return(
            <>
            <View className="flex-1 flex-col">
                <Text className="text-white text-3xl mt-6 mb-2 mx-6">Generating a new crypto account.</Text>
                <Text className="text-white text-l mb-2 mx-6 mt-2">To make account secure, we need a good random seed. For that, please type random letters, numbers or punctuation in the field below. You can type as many random symbols as you want, but not less than 16. </Text>
                <GreyTextInputBar placeholder_text={"Enter Random Seed"} state_function={setAccountName}/>
                <Text className="text-white text-l mb-2 mx-6 mt-2">Please create a good secret password that will be used to encrypt the private key stored at this computer. The password must be at least 8 symbols long. Please note that this password is used only locally, and it is not your account password. </Text>
                <GreyTextInputBar placeholder_text={"Enter Secret Password"} state_function={setPassword}/>
                <BigBlueButton text={"Generate Account"} onPressFunction={createAccount}/>
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
            </View>
            </>
        )
    
}

export default GenerateAccountDialog