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
export function UserIconAnimated(props: SvgProps) {

    const strokeWidth = useState(new Animated.Value(0))[0];// Initial 
    const [extraStrokeWidth, setExtraStrokeWidth] = useState(props.strokeWidth);

    async function GrowAndShrink(setExtraHeightSVG){
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
                d="M30.421 32v-3a6 6 0 00-6-6h-12a6 6 0 00-6 6v3M18.421 17a6 6 0 100-12 6 6 0 000 12z"
                stroke={props.color ?? "#fff"}
                strokeWidth={extraStrokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                />
            </Svg>
        </TouchableOpacity>
    );
}