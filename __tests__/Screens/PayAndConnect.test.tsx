import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";
import { RouteProp } from "@react-navigation/native";
import { UserContextProvider } from "../../src/context/UserContext";
import { useUserContext } from "../../src/context/UserContext";
import PayAndConnect from "../../src/screens/PayAndConnect";
import { GlobalRoute } from "../../src/MainContainer";
const params = {
    BSSID: "BSSID",
    SSID: "SSID",
    frequency: "frequency",
}

const mockedCanGoBack = jest.fn().mockReturnValue(true);

const mockedGoBack = jest.fn();

const mockedNavigation = {
    canGoBack: mockedCanGoBack,
    goBack: mockedGoBack,
}
it("renders", () => {
  render(
    <UserContextProvider>
        <PayAndConnect route={{key:"key", 
        name:"PayAndConnect",
        params: {
            BSSID: "BSSID",
            SSID: "SSID",
            frequency: 0,
        }}} navigation={
            mockedNavigation
        }/>
</UserContextProvider>)
});
