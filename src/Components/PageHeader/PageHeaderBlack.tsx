import React, {
    FunctionComponent,
  } from "react";
  import { View, Text, StyleSheet } from "react-native";
  import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
  import { getStatusBarHeight } from "react-native-status-bar-height";
  import { colors } from "../../constants/colors";
  
  import { useUserContext } from "../../context/UserContext";

  export type PageHeaderProps = BottomTabHeaderProps & {
    leftView?: JSX.Element;
    rightView?: JSX.Element;
};

const PageHeaderBlack: FunctionComponent<PageHeaderProps> = (props) => {
    const userContext_array = useUserContext();

    return (
        <>
          <View style={pageHeaderStyle.headerStatusPadding} />
          <View style={pageHeaderStyle.header}>
            <View style={pageHeaderStyle.headerBtn}>{props?.leftView ?? null}</View>
    
            <Text style={pageHeaderStyle.headerTitle}>{props.options.title}</Text>
            <View style={pageHeaderStyle.headerBtn}>
              {props?.rightView ?? null}
            </View>
          </View>
        </>
      );
}

export default PageHeaderBlack;

const pageHeaderStyle = StyleSheet.create({
    headerStatusPadding: {
      height: getStatusBarHeight(),
      backgroundColor: colors.pageHeaderBackgroundColor,
    },
    header: {
      height: 60,
      backgroundColor: colors.pageHeaderBackgroundColor,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingLeft: 15,
      paddingRight: 15,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    headerTitle: { fontSize: 20, fontWeight: "bold", color: "#fff" },
    headerBtn: {
      height: 40,
      width: 40,
      justifyContent: "center",
      alignItems: "center",
    },
  });