import React, {
    FunctionComponent,
  } from "react";
  import { View, Text, StyleSheet } from "react-native";
  import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
  import { getStatusBarHeight } from "react-native-status-bar-height";
  
  import { useUserContext } from "../../context/UserContext";

export type PageHeaderProps = BottomTabHeaderProps & {
    leftView?: JSX.Element;
    rightView?: JSX.Element;
};

const PageHeaderWhite: FunctionComponent<PageHeaderProps> = (props) => {
    const userContext_array = useUserContext();

    return (
        <>
          <View style={pageHeaderStyleWhiteBackground.headerStatusPadding } />
          <View style={pageHeaderStyleWhiteBackground.header}>
            <View style={pageHeaderStyleWhiteBackground.headerBtn}>{props?.leftView ?? null}</View>
    
            <Text style={pageHeaderStyleWhiteBackground.headerTitle}>{props.options.title}</Text>
            <View style={pageHeaderStyleWhiteBackground.headerBtn}>
              {props?.rightView ?? null}
            </View>
          </View>
        </>
      );
    }

export default PageHeaderWhite;

const pageHeaderStyleWhiteBackground = StyleSheet.create({
    headerStatusPadding: {
      height: getStatusBarHeight(),
      backgroundColor: "#fff",
    },
    header: {
      height: 60,
      backgroundColor: "#fff",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingLeft: 15,
      paddingRight: 15,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    headerTitle: { fontSize: 20, fontWeight: "bold", color: "#000000" },
    headerBtn: {
      height: 40,
      width: 40,
      justifyContent: "center",
      alignItems: "center",
    },
  });