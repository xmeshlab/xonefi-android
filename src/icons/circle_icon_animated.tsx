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
export function CircleIconAnimated(props: SvgProps) {

    const stokeWidth = useState(new Animated.Value(0))[0];// Initial 
    const [extraStokeWidth, setExtraStrokeWidth] = useState(props.strokeWidth);

    async function GrowAndShrink(setExtraStrokeWidth){
        let initial: number = +props.strokeWidth;
        stokeWidth.addListener((value) => {
            //console.log(value);
            setExtraStrokeWidth(value.value);
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
        <TouchableOpacity className="w-37 h-37" onPress={()=>{GrowAndShrink(setExtraStrokeWidth)}}>
            <Svg
      width={35}
      height={35}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        clipRule="evenodd"
        d="M5.833 9.566a3.733 3.733 0 0 1 3.734-3.733v0A3.733 3.733 0 0 1 13.3 9.566v0A3.733 3.733 0 0 1 9.567 13.3v0a3.733 3.733 0 0 1-3.734-3.734v0ZM5.833 24.5a3.733 3.733 0 0 1 3.734-3.733v0A3.733 3.733 0 0 1 13.3 24.5v0a3.733 3.733 0 0 1-3.733 3.733v0A3.733 3.733 0 0 1 5.833 24.5v0ZM28.233 9.566A3.733 3.733 0 0 1 24.5 13.3v0a3.733 3.733 0 0 1-3.733-3.734v0A3.733 3.733 0 0 1 24.5 5.833v0a3.733 3.733 0 0 1 3.733 3.733v0Z"
        stroke={props.color ?? "#fff"}
        strokeWidth={extraStokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M24.566 24.434a.093.093 0 1 1-.132.132.093.093 0 0 1 .132-.132M20.833 20.7a.093.093 0 1 1-.132.132.093.093 0 0 1 .132-.132M20.833 28.167a.093.093 0 1 1-.132.132.093.093 0 0 1 .132-.132M28.3 28.167a.093.093 0 1 1-.133.132.093.093 0 0 1 .132-.132M28.3 20.7a.093.093 0 1 1-.133.132.093.093 0 0 1 .132-.132"
        stroke={props.color ?? "#fff"}
        strokeWidth={extraStokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
        </TouchableOpacity>
    );
}