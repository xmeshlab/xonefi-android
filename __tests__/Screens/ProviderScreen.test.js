import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, act, fireEvent } from "@testing-library/react-native";
import * as getOnefiRouters from "../../src/hooks/getOnefiRouters";
import ProviderScreen from "../../src/screens/ProviderScreen";

//Correctly using jest.spy on to mock the return value of our hook function which uses native code
//1) Import the module
//2) spy on the module and the function we want to mock the return value with
jest.spyOn(getOnefiRouters, 'getOneFiRouterList').mockReturnValue({});

it("renders", () => {
    render(<ProviderScreen/>);
});
