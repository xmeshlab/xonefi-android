import * as React from "react";
import Svg, {
    SvgProps,
    Path,
    Defs,
    LinearGradient,
    Stop,
} from "react-native-svg";

function UploadGradientBg(props: SvgProps) {
    return (
        <Svg
            width="169"
            height="46"
            viewBox="0 0 169 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M176.229 32.183v-3.814c0-1.378 3.3-2.634 3.705-3.559 4.167-9.533-21.187 2.484-30.572-2.007-4.235-2.028-8.473-4.404-12.735-3.936-9.309 1.023-30.198 0-39.507 0-9.309 0-31.295 1.172-40.604 2.195-9.309 1.022-15.297 2.11-24.606-5.048C22.601 8.856 17.975.76 8.666.76S-9.952 4.85-19.26 12.008c-9.309 7.158-18.618 17.384-23.273 22.497l-3.502 3.847a4.423 4.423 0 003.271 7.401H171.575a4.654 4.654 0 004.654-4.654v-8.916z"
                fill="url(#prefix__paint0_linear_81_1373)"
            />
            <Defs>
                <LinearGradient
                    id="prefix__paint0_linear_81_1373"
                    x1={64.521}
                    y1={-3.331}
                    x2={64.521}
                    y2={45.753}
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop stopColor="#0047FF" stopOpacity={0.62} />
                    <Stop offset={1} stopColor="#2D2D2D" stopOpacity={0} />
                </LinearGradient>
            </Defs>
        </Svg>
    );
}

export default UploadGradientBg;