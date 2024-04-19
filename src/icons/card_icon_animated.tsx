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
export function CardIconAnimated(props: SvgProps) {

    const strokeWidth = useState(new Animated.Value(0))[0];// Initial 
    const [extraStokeWidth, setExtraStrokeWidth] = useState(props.strokeWidth);

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
            width={36}
            height={37}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
                <Path
                d="M31.5 6.5h-27a3 3 0 00-3 3v18a3 3 0 003 3h27a3 3 0 003-3v-18a3 3 0 00-3-3zM1.5 15.5h33"
                stroke={props.color ?? "#fff"}
                strokeWidth={extraStokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                />
            </Svg>
        </TouchableOpacity>
    );
}