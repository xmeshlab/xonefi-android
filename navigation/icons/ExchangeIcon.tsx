import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";

function ExchangeIcon(props: SvgProps) {
    return (
        <Svg
            width={29}
            height={28}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <G clipPath="url(#prefix__clip0_81_1357)">
                <Path
                    d="M9.003 17.85l3.018 2.953a.698.698 0 00.456.193c.364 0 .61-.252.61-.61a.56.56 0 00-.176-.427l-1.254-1.213-.908-.785 1.254.047h7.324a.595.595 0 00.621-.615.596.596 0 00-.62-.616h-7.325l-1.254.047.908-.79 1.254-1.208a.57.57 0 00.176-.428c0-.357-.246-.609-.61-.609a.67.67 0 00-.457.193L9.004 16.93a.62.62 0 000 .92zm10.746-7.7l-3.03-2.953a.671.671 0 00-.45-.193c-.364 0-.61.252-.61.61 0 .175.059.316.176.433l1.248 1.207.914.785-1.254-.047H9.42a.599.599 0 00-.621.615c0 .358.264.622.62.622h7.325l1.254-.047-.914.785-1.248 1.207a.58.58 0 00-.176.428c0 .357.246.609.61.609.158 0 .334-.07.45-.188l3.03-2.953a.629.629 0 000-.92z"
                    fill={props.color ?? '#fff'}
                />
            </G>
            <Defs>
                <ClipPath id="prefix__clip0_81_1357">
                    <Path
                        fill={props.color ?? '#fff'}
                        transform="rotate(-90 14.3 13.7)"
                        d="M0 0h28v28H0z"
                    />
                </ClipPath>
            </Defs>
        </Svg>
    );
}

export default ExchangeIcon;