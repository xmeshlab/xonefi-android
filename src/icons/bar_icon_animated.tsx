import {useEffect, useRef, useState} from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import {Animated, Text, Touchable, View} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

export function BarIconAnimated(props: SvgProps) {

    const strokeWidth = useState(new Animated.Value(0))[0];// Initial 
    const [extraStrokeWidth, setExtraStrokeWidth] = useState(props.strokeWidth);

    async function GrowAndShrink(setExtraStrokeWidth){
        let initial: number = +props.strokeWidth;
        strokeWidth.addListener((value) => {
            //console.log(value);
            setExtraStrokeWidth(value.value);
          });
        Animated.timing(strokeWidth, {
            toValue: initial+ 2,
            duration: 150, 
            useNativeDriver: false
        }).start()
        await delay(150);
        Animated.timing(strokeWidth, {
            toValue: initial,
            duration: 150, 
            useNativeDriver: false
        }).start()
    }

    return (
        <TouchableOpacity className="w-37 h-37" onPress={()=>{GrowAndShrink(setExtraStrokeWidth)}}>
            <Svg
            width={37}
            height={37}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
            >
                <Path
                d="M9.579 30.5v-6M18.579 30.5v-15M27.579 30.5v-24"
                stroke={props.color ?? "#fff"}
                strokeWidth={extraStrokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                />
            </Svg>
        </TouchableOpacity>
    );
}