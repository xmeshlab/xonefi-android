import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityBase,
  View,
} from "react-native";
import * as React from "react";
import { ComponentProps, useCallback, useState } from "react";
import { useUserContext } from "../../context/UserContext";

export type PrimaryBtnProps = ComponentProps<typeof TouchableOpacity> & {
  text?: string;
};
export const PrimaryBtn = ({
  children,
  style,
  onPress,
  ...otherProps
}: ComponentProps<typeof TouchableOpacity>) => {
  const [pending, setPending] = useState(false);
  const wrapperPress = useCallback(
    async function (ev) {
      setPending(true);
      try {
        await onPress(ev);
      } finally {
        setPending(false);
      }
    },
    [onPress]
  );

  const userContext_array = useUserContext();

  //check background color variable in the userContext to determine which background to render
  if(userContext_array[4] == "black"){
    return (
      <TouchableOpacity
        style={[defaultStyle.primaryBtn, style]}
        {...otherProps}
        onPress={wrapperPress}
        disabled={pending}
      >
        {pending && (
          <View style={defaultStyle.loading}>
            <ActivityIndicator color={"#fff"} />
          </View>
        )}
        {typeof children === "string" ? (
          <Text style={defaultStyle.text}>{children}</Text>
        ) : (
          children
        )}
      </TouchableOpacity>
    );
  }else{
    //white background styling
    return (
      <TouchableOpacity
        style={[whiteBackgroundStyle.primaryBtn, style]}
        {...otherProps}
        onPress={wrapperPress}
        disabled={pending}
      >
        {pending && (
          <View style={whiteBackgroundStyle.loading}>
            <ActivityIndicator color={"#fff"} />
          </View>
        )}
        {typeof children === "string" ? (
          <Text style={whiteBackgroundStyle.text}>{children}</Text>
        ) : (
          children
        )}
      </TouchableOpacity>
    );
  }
};

const defaultStyle = StyleSheet.create({
  primaryBtn: {
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2B3FF240",
    shadowColor: "rgba(0, 0, 0, 1.0)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    flexDirection: "row",
    shadowRadius: 4,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgba(43, 63, 242, 1.0)",
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
  loading: {
    position: "absolute",
    left: 1,
    right: 1,
    bottom: 1,
    top: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
});


const whiteBackgroundStyle = StyleSheet.create({
  primaryBtn: {
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0E60FF",
    shadowColor: "rgba(0, 0, 0)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    flexDirection: "row",
    shadowRadius: 4,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgba(43, 63, 242)",
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
  loading: {
    position: "absolute",
    left: 1,
    right: 1,
    bottom: 1,
    top: 1,
    backgroundColor: "rgba(255,255,255)",
    justifyContent: "center",
    alignItems: "center",
  },
});