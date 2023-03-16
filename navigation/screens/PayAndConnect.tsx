import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text, View, NativeModules, TextInput, ScrollView } from 'react-native';
import { PrimaryBtn } from '../../utils/components/PrimaryBtn';
import { colors } from '../../constants/colors';
import WifiLevelIcon from '../icons/WifiLevelIcon';
import { globalStyle } from '../../constants/globalStyle';
import { RouteComponent } from '../../types/global';
import WifiManager from 'react-native-wifi-reborn';
import { useAsync } from '../../utils/hooks/useAsync';

import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Circle } from 'react-native-svg';
import { OneFiStorage } from '../../api/storage/OneFiStorage';

const PayAndConnect: RouteComponent<'PayAndConnect'> = (props) => {
    const {SSID, BSSID, signalLevel} = props.route.params;
    const [password, setPassword] = useState('seitlab123!@');
    const {
        value: currentConnectedSSID,
        execute: getCurrentWifiSSID,
        setValue: setCurrentConnectSSID
    } = useAsync(WifiManager.getCurrentWifiSSID, true);
    const isConnected = useMemo(() => {
        return currentConnectedSSID === SSID
    }, [currentConnectedSSID]);
    const payAndConnect = useCallback(async () => {
        // if (isConnected) {
        //     try {
        //        await WifiManager.disconnect();
        //        setCurrentConnectSSID(undefined);
        //     } catch (e) {
        //         console.error('disconnect', e);
        //     } finally {
        //     }
        //     return;
        // }
        try {
            // await NativeModules.XOneFiWiFiModule.connectWifi(SSID, 'QwerTyuioP');
            // 'QwerTyuioP'
            await NativeModules.XOneFiWiFiModule.initialConnect(SSID, // replace with your Wi-Fi pwd
                password);
            await OneFiStorage.setItem('client_on', true);
            setCurrentConnectSSID(SSID,);
        } catch (e) {
            console.warn('connect error', '#051e2a');
            console.error(e)
        } finally {
        }
    }, [isConnected, setCurrentConnectSSID, password])

    return (<ScrollView className="flex-1 flex-col">
        <View style={[globalStyle.row, {marginLeft: 37, marginTop: 23}]}>
            <Text style={[style.statusText, globalStyle.light]}>Status:</Text>
            <Text
                style={[isConnected ? globalStyle.successText : globalStyle.warningText, style.statusText]}> {isConnected ? 'Connected' : 'Not Connected'}</Text>
        </View>
        <View style={style.chart}>
            <AnimatedCircularProgress
                size={120}
                width={10}
                fill={67}
                arcSweepAngle={180}
                rotation={270}
                renderCap={({center}) => <Circle cx={center.x} cy={center.y} r="6" fill="#00B2FF"/>}
                tintColor="#18384D"
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="#051e2a">
                {v => <View><Text style={globalStyle.light}>{v}</Text></View>}
            </AnimatedCircularProgress>
        </View>
        <View style={[globalStyle.row, style.statusView]}>
            <View style={globalStyle.row}>
                <WifiLevelIcon signalLevel={signalLevel ?? 0}/>
                <Text style={[globalStyle.light, {paddingRight: 40}]}>{SSID}</Text>
            </View>
            <Text style={globalStyle.light}>
                .014 OFI/GB
            </Text>
        </View>
        <View className="flex flex-col ml-5 mr-5 bg-slate-800 bg-rounded p-5 rounded-2xl justify-around">
            <View className="flex flex-row justify-between">
                <Text className="text-white text-base mb-1">Private</Text>
            </View>
            <View className="flex flex-row justify-between">
                <Text className="text-white text-base my-1">Per Hour</Text>
            </View>
            <View className="flex flex-row justify-between">
                <Text className="text-white text-base my-1">Per GB</Text>
            </View>
            <View className="flex flex-row justify-between">
                <Text className="text-white text-base mt-1">Conversion</Text>
            </View>
            <View className="flex flex-row justify-between" style={{alignItems: 'center'}}>
                <Text className="text-white text-base mt-1">Password</Text>
                <TextInput secureTextEntry={true} style={style.input} textContentType={'password'} value={password}
                           onChangeText={setPassword}/>
            </View>
            <View
                style={{flexDirection: 'row'}}>
                <Text className="text-white text-base mt-1">Total</Text>
            </View>


        </View>

        <PrimaryBtn onPress={payAndConnect} style={style.connectBtn}>
            {isConnected ? 'Disconnect' : 'Pay and Connect'}

        </PrimaryBtn>

    </ScrollView>)

};

export default PayAndConnect

const style = StyleSheet.create({
    withBorderTop: {borderStyle: 'solid', borderTopWidth: 1, borderColor: colors.light},
    connectBtn: {marginLeft: 24, marginRight: 24, marginTop: 46},
    chart: {
        position: 'relative', alignItems: 'center', justifyContent: 'center',

        height: 90, marginTop: 26
    },
    statusText: {
        fontSize: 18
    },
    input: {
        flex: 1, height: 24, margin: 12, borderWidth: 0, borderBottomWidth: 1, borderColor: '#fff', color: '#fff'
        // padding: 10,
    },
    statusView: {
        justifyContent: 'space-between',
        marginLeft: 24 + 23,
        marginRight: 24 + 23,
        marginBottom: 18,
        alignItems: 'center'
    }
})