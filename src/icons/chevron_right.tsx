import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

declare module 'react-native-svg' {
    export interface SvgProps {
      xmlns?: string;
      xmlnsXlink?: string;
    }
  }
  
const ChevronRight = (props: SvgProps ) => (<Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <Path
            stroke={props.color ?? '#fff'}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m10.389 17.124 6.753-5.708-6.753-5.708"
        />
    </Svg>)

export default ChevronRight
