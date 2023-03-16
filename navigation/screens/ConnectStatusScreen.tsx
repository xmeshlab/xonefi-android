import React, { useEffect, useMemo, useState } from 'react';
import { processColor, ScrollView, StyleSheet, Text, View } from 'react-native';
import Card from '../../utils/components/Card';
import { RouteComponent } from '../../types/global';
import { colors } from '../../constants/colors';
import { Slider } from '../../utils/components/Slider';
import ArrowUpIcon from '../icons/arrow_up_icon';
import { globalStyle } from '../../constants/globalStyle';
import DownLoadLinearGradient from '../icons/linear_gradient';
import UploadGradientBg from '../icons/UploadGradientBg';
import {LineChart} from 'react-native-charts-wrapper';
import ExchangeIcon from '../icons/ExchangeIcon';
type ConnectStatusDetail = {
    ofiTokens: number; gbData: number; usdCost: number; dataCost: number; usageTime: number; dataUsage: number; maxUsage: number;
}

const getStatusDetail = (): ConnectStatusDetail => {
    return {
        ofiTokens: 37.49, dataCost: 0.14,
        dataUsage: Math.random() * 5,
        // dataUsage: 4,
        gbData: 3.7, maxUsage: 5, usageTime: 46, usdCost: 4.76
    }
}

const lineChartStartARGBColor = "rgba(43,63,242, 0.25)";
const lineChartEenARGBColor = "rgba(43,63,242, 0.4)";

const ConnectStatusScreen: RouteComponent<'Status'> = (props) => {
    // const {BSSID, SSID} = props.route.params ?? {BSSID: undefined, SSID: undefined};
    const {BSSID, SSID} = {BSSID: '1111q', SSID:'cccccc'};
    const [connectStatus, setConnectStatus] = useState<ConnectStatusDetail>(null as ConnectStatusDetail);
    useEffect(() => {
        const detail = getStatusDetail();
        setConnectStatus(detail);
    }, []);
    let dataSets = useMemo(() => {
        return [
            {
                values: [
                    {
                        y: 11,
                        x: 0,
                        marker: "65 kg"
                    },
                    {
                        y: 17,
                        x: 1,
                        marker: "77 kg"
                    },
                    {
                        y: 33,
                        x: 2,
                        marker: "76 kg"
                    },
                    {
                        y: 44,
                        x: 3,
                        marker: "74 kg"
                    },
                    {
                        y: 55,
                        x: 4,
                        marker: "76 kg"
                    },
                    {
                        y: 65,
                        x: 5,
                        marker: "Today: 65 kg"
                    },
                    {
                        y: 58,
                        x: 6,
                        marker: "65 kg"
                    },
                    {
                        y: 44,
                        x: 7,
                        marker: "77 kg"
                    },
                    {
                        y: 76,
                        x: 8,
                        marker: "76 kg"
                    },
                    {
                        y: 74,
                        x: 9,
                        marker: "74 kg"
                    },
                    {
                        y: 76,
                        x: 10,
                        marker: "76 kg"
                    },
                    {
                        y: 33,
                        x: 11,
                        marker: "Today: 65 kg"
                    }
                ],
                label: "",
                config: {
                    lineWidth: 2,
                    mode: "CUBIC_BEZIER",
                    drawValues: false,
                    color: processColor('#2B3FF2'),
                    drawCircles: false,
                    circleColor: processColor(lineChartStartARGBColor),
                    drawCircleHole: true,
                    circleRadius: 5,
                    highlightColor: processColor("transparent"),
                    // color: processColor(lineChartStartARGBColor),
                    drawFilled: true,
                    fillGradient: {
                        colors: [processColor(lineChartStartARGBColor), processColor(lineChartEenARGBColor)],
                        positions: [0, 0.2],
                        angle: 90,
                        // orientation: "TOP_BOTTOM"
                        orientation: "BOTTOM_TOP"
                    },
                    fillAlpha: 1000,
                    valueTextSize: 15
                }
            },
        ]
    }, []);
    return (<ScrollView style={{backgroundColor: 'transparent'}}>
        <Card style={style.card}>
            <View style={style.summaryGroup}>
                <View style={[style.summaryItem, style.summaryItemValueWithoutBorder]}>
                    <Text style={style.summaryItemValue}>{connectStatus?.ofiTokens}</Text>
                    <Text style={style.summaryDesc}>OFI TOKENS</Text>
                </View>
                <View style={style.summaryItem}>
                    <Text style={style.summaryItemValue}>{connectStatus?.gbData}</Text>
                    <Text style={style.summaryDesc}>GB DATA</Text>
                </View>
                <View style={style.summaryItem}>
                    <Text style={style.summaryItemValue}>{connectStatus?.usdCost}</Text>
                    <Text style={style.summaryDesc}>USD COST</Text>
                </View>
            </View>
            <View style={style.percentContainer}>
                <View style={{height: 8, flex: 1}}>
                    <Slider style={{width: '100%'}} value={connectStatus?.dataUsage ?? 0}
                            maxiumValue={connectStatus?.maxUsage ?? 10}/>
                </View>
                <View style={style.maxUsage}>
                    <Text style={style.summaryItemValue}>{connectStatus?.maxUsage}GB</Text>
                    <Text style={style.maxUsageDesc}>MAX USAGE</Text>
                </View>
            </View>
            {/*<Text style={{color: 'red', marginTop: 300}}>*/}
            {/*    status*/}
            {/*</Text>*/}
        </Card>
        <Card style={style.card}>
            <View style={style.description}>
                <Text style={[style.descriptionItem, {width: '69%'}]}>Router Name</Text>
                <Text style={style.descriptionItem}>{SSID}</Text>
            </View>
            <View style={style.description}>
                <Text style={[style.descriptionItem, {width: '69%'}]}>Router Status</Text>
                <Text style={style.descriptionItem}>Connected</Text>
            </View>
            <View style={style.description}>
                <Text style={[style.descriptionItem, {width: '69%'}]}>Data Cost</Text>
                <Text style={style.descriptionItem}>{connectStatus?.dataCost} OFI/GB</Text>
            </View>
            <View style={style.description}>
                <Text style={[style.descriptionItem, {width: '69%'}]}>Usage Time</Text>
                <Text style={style.descriptionItem}>{connectStatus?.usageTime} min</Text>
            </View>
            <View style={[style.description, {marginBottom: 0}]}>
                <Text style={[style.descriptionItem, {width: '69%'}]}>Data Usage</Text>
                <Text style={style.descriptionItem}>{connectStatus?.dataUsage?.toFixed(2)} gb</Text>
            </View>
        </Card>
        <View style={{flexDirection: 'row', marginLeft: 15, marginRight: 15, marginBottom: 8.5}}>
            <Card style={style.smallCard}>
                <View style={[globalStyle.row, globalStyle.withSmallPaddingX]}>
                    <View style={globalStyle.col1}>
                        <Text style={style.speed}>
                            Download
                        </Text>
                        <Text style={style.speed}>
                            107 mbs
                        </Text>
                    </View>
                    <ArrowUpIcon style={{transform:[{rotate: '180deg'}]}}/>
                </View>
                <DownLoadLinearGradient style={style.smallCardChartBg}/>
            </Card>
            <View style={{width:3.48}}></View>
            <Card style={style.smallCard}>
                <View style={[globalStyle.row, globalStyle.withSmallPaddingX]}>
                    <View style={globalStyle.col1}>
                        <Text style={style.speed}>
                            Upload
                        </Text>
                        <Text style={style.speed}>
                            107 mbs
                        </Text>
                    </View>
                    <ArrowUpIcon/>
                </View>
                <UploadGradientBg style={style.smallCardChartBg}/>
            </Card>
        </View>
        <Card style={[style.card, style.lineChartCard]}>
            <View style={[style.lineChartInfo, globalStyle.row]}>
                <View style={[globalStyle.col1, globalStyle.column]}>
                    <Text style={[style.descriptionItem]}>340.12 OFI</Text>
                    <View style={[globalStyle.row, globalStyle.verticalCenter ]}>
                        <Text style={[style.descriptionItem, {fontSize: 12, flex: null, color: colors.inActiveColor}]}>2.4 OFI</Text>
                        <ExchangeIcon/>
                        <Text style={[style.descriptionItem, {fontSize: 12, flex: null,  color: colors.inActiveColor}]}>$1.00 USD</Text>
                    </View>
                </View>
                <View style={[globalStyle.col1, globalStyle.verticalCenter,style.lineChartSuccessText ]}>
                    <Text  style={globalStyle.successText}>+13%</Text>
                </View>
            </View>
            <View style={style.lineChart}>
                <Text style={style.chartTitle}>LAST 30 DAYS</Text>
                <LineChart
                    style={{flex: 1}}
                    data={{
                        dataSets
                    }}

                    drawBorders={false}
                    chartDescription={{ text: "" }}
                    legend={{
                        enabled: false
                    }}
                    marker={{
                        enabled: true,
                        markerColor: processColor("white"),
                        textColor: processColor("black")
                    }}
                    xAxis={{
                        enabled: false,
                    }}
                    yAxis={{
                        left: {
                            enabled: false
                        },
                        right: {
                            enabled: false
                        }
                    }}
                    autoScaleMinMaxEnabled={true}
                    animation={{
                        durationX: 0,
                        durationY: 1500,
                        easingY: "EaseInOutQuart"
                    }}
                    drawGridBackground={false}
                    touchEnabled={true}
                    dragEnabled={false}
                    scaleEnabled={false}
                    scaleXEnabled={false}
                    scaleYEnabled={false}
                    pinchZoom={false}
                    doubleTapToZoomEnabled={false}
                    dragDecelerationEnabled={true}
                    dragDecelerationFrictionCoef={0.99}
                    keepPositionOnRotation={false}
                    onSelect={e => console.log('select', e)}
                    onChange={event => console.log(event.nativeEvent)}
                />
            </View>

        </Card>
    </ScrollView>);
};

export default ConnectStatusScreen;
const style = StyleSheet.create({
    card: {
        marginLeft: 15, marginRight: 15, paddingBottom: 12.5, paddingTop: 16,
        marginBottom: 8.5
    }, summaryItem: {
        height: 38,
        flex: 1,
        borderLeftWidth: 1,
        borderLeftColor: 'rgba(63,82,109, 0.5)',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    }, summaryGroup: {
        flexDirection: 'row', // paddingLeft:10,
        // paddingRight:10,
        justifyContent: 'space-evenly', // backgroundColor: 'red',
    }, summaryItemValue: {
        fontSize: 18,
        fontWeight: '400',
        fontStyle: 'normal',
        lineHeight: 18,
        textAlign: 'center',
        color: colors.light,
        marginBottom: 4
    }, summaryItemValueWithoutBorder: {
        borderLeftWidth: 0,
    }, summaryDesc: {
        fontSize: 11,
        fontWeight: '400',
        fontStyle: 'normal',
        lineHeight: 11,
        letterSpacing: 2,
        textAlign: 'center',
        color: '#9FAEC3'
    }, description: {
        paddingLeft: 12,
        paddingRight: 12,
        marginBottom: 15,
        // backgroundColor: 'red',
        flexDirection: 'row',
        height: 21,
        justifyContent: 'space-between'
    }, percentContainer: {
        // backgroundColor: 'red',
        flexDirection: 'row', height: 54, marginTop: 32, paddingLeft: 15, paddingRight: 15,
    }, maxUsage: {
        height: 54, paddingLeft: 20, alignItems: 'center', flexDirection: 'column'
    }, maxUsageDesc: {
        // width: 73,
        // height: 15,
        fontSize: 13,
        fontWeight: "400",
        fontStyle: "normal",
        lineHeight: 13,
        color: colors.light,
        marginTop: 10
    }, descriptionItem: {
        color: colors.light,
        fontSize: 16,
        lineHeight: 16,
        flex: 1,
    },
    smallCard: {flex: 1, height: 104,  paddingTop:12, overflow: 'hidden'},
    speed: {
        color:  colors.light

    }, smallCardChartBg: {
        width: 177,
        height: 65,
    },
    lineChartCard: {
        height: 133,
        paddingTop: 0,
        paddingBottom: 0,
        flexDirection: 'column'
    },
    lineChart: {
        position: 'relative',
        marginLeft: -16,
        marginRight: -16,
        marginBottom: -16,
        flex: 1,
        overflow: 'hidden'
    },
    lineChartInfo: {height:57, paddingLeft: 16, paddingRight:16, paddingTop: 13}, lineChartSuccessText: {
        flexDirection: 'row-reverse',
        paddingRight:20,
    }, chartTitle: {
        color: colors.inActiveColor,
        position: 'absolute',
        bottom: 20,
        right: 36
    }
})
