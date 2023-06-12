import React, { useContext } from "react";
import { describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

//import { userContext } from "../../src/MainContainer";

import { AccountInformationScreen } from "../../src/screens/AccountInformationScreen";

//(['', (value: string)=>{},{}, (value: string)=>{}]);

/*const userContextMock = {
    ["Test", (value: string)=>jest.fn(), {}, (value: string)=>jest.fn()]
  };*/
//const userContext = React.createContext(['', (value: string)=>{},{}, (value: string)=>{}]);

//Mock the call to import context
jest.mock("../../src/MainContainer");

it("renders", () => {
  const pushMock = jest.fn();
  jest.mock("../../src/MainContainer");
  jest.mock("../MainContainer");
  const { getByText } = render(
    <AccountInformationScreen
      navigation={{ push: pushMock }}
      userContext_array={["Test", jest.fn(), {}, jest.fn()]}
    />
  );
});
