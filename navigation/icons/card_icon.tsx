import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'

const CardIcon = (props: SvgProps ) => (<Svg
        width={26}
        height={24}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G
            clipPath="url(#a)"
            stroke={props.color ?? '#fff'}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <Path
                d="M22.244 4.5H3.178c-1.17 0-2.119.895-2.119 2v12c0 1.105.949 2 2.119 2h19.066c1.17 0 2.118-.895 2.118-2v-12c0-1.105-.948-2-2.118-2ZM1.06 10.5h23.302"/>
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" transform="translate(0 .5)" d="M0 0h25.421v24H0z"/>
            </ClipPath>
        </Defs>
    </Svg>)

export default CardIcon
