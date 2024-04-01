import {useEffect, useRef, useState} from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import {Animated, Text, Touchable, View} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

//stpleWidth = 4
//width height = 37
//d="M9.579 30.5v-6M18.579 30.5v-15M27.579 30.5v-24"
//change v value for animation
export function BarIconAnimated(props: SvgProps) {

    const extraHeight = useState(new Animated.Value(0))[0];// Initial 
    const [extraHeightSVG, setExtraHeightSVG] = useState(0);

    async function GrowAndShrink(setExtraHeightSVG){
        extraHeight.addListener((value) => {
            console.log(value);
            setExtraHeightSVG(value.value);
          });
        Animated.timing(extraHeight, {
            toValue: 5,
            duration: 200, 
            useNativeDriver: false
        }).start()
        await delay(200);
        Animated.timing(extraHeight, {
            toValue: 0,
            duration: 200, 
            useNativeDriver: false
        }).start()
        //alert("M9.579 30.5v-"+(extraHeightSVG.toString())+"M18.579 30.5v-"+(extraHeightSVG.toString())+"M27.579 30.5v-24");
        /*return () => {
            extraHeight.removeAllListeners();
          };*/
    }
    /*useEffect(()=>{
        extraHeight.addListener((value) => {
            console.log(value);
            setExtraHeightSVG(value.value);
          });
        Animated.timing(extraHeight, {
            toValue: 5,
            duration: 200, 
            useNativeDriver: false
        }).start()
        setTimeout(()=>{
            Animated.timing(extraHeight, {
                toValue: 0,
                duration: 200, 
                useNativeDriver: false
            }).start()
        }, 200);
        Animated.timing(extraHeight, {
            toValue: 0,
            duration: 200, 
            useNativeDriver: false
        }).start()

    }, [props.strokeWidth])
    */

    /*if(props.strokeWidth == 4 && extraHeightSVG == 0){
        extraHeight.addListener((value) => {
            console.log(value);
            setExtraHeightSVG(value.value);
          });
        Animated.timing(extraHeight, {
            toValue: 5,
            duration: 200, 
            useNativeDriver: false
        }).start()
        setTimeout(()=>{
            Animated.timing(extraHeight, {
                toValue: 0,
                duration: 200, 
                useNativeDriver: false
            }).start()
        }, 200);
    }*/

    //alert(extraHeight.toString());

    return (
        <TouchableOpacity className="w-37 h-37" onPress={()=>{GrowAndShrink(setExtraHeightSVG)}}>
                <Svg
                width={37}
                height={37}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                {...props}
                >
                <Path
                    d={"M9.579 30.5v-"+((extraHeightSVG+6).toString())+"M18.579 30.5v-"+((extraHeightSVG+15).toString())+"M27.579 30.5v-"+((extraHeightSVG+24).toString())}
                    stroke={props.color ?? "#fff"}
                    strokeWidth={props.strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                </Svg>
        </TouchableOpacity>
    );
}