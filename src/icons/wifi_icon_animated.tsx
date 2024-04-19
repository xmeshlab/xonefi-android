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
export function WifiIconAnimated(props: SvgProps) {

    const stokeWidth = useState(new Animated.Value(0))[0];// Initial 
    const [extraStrokeWidth, setExtraStokeWidth] = useState(props.strokeWidth);

    async function GrowAndShrink(setExtraStokeWidth){
        let initial: number = +props.strokeWidth;
        stokeWidth.addListener((value) => {
            //console.log(value);
            setExtraStokeWidth(value.value);
          });
        Animated.timing(stokeWidth, {
            toValue: initial+ 2,
            duration: 150, 
            useNativeDriver: false
        }).start()
        await delay(150);
        Animated.timing(stokeWidth, {
            toValue: initial,
            duration: 150, 
            useNativeDriver: false
        }).start()
    }

    return (
        <TouchableOpacity className="w-37 h-37" onPress={()=>{GrowAndShrink(setExtraStokeWidth)}}>
            <Svg
                width={34}
                height={35}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                {...props}
            >
                <Path
                d="M5.667 16.083a12.75 12.75 0 0112.75 12.75M5.667 6.167a22.667 22.667 0 0122.666 22.667M7.083 28.833a1.417 1.417 0 100-2.833 1.417 1.417 0 000 2.833z"
                stroke={props.color ?? "#fff"}
                strokeWidth={extraStrokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                />
            </Svg>
        </TouchableOpacity>
    );
}