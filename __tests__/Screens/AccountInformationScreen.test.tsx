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
  const { getByText, getAllByText } = render(
    <AccountInformationScreen
      navigation={{ push: pushMock }}
      userContext_array={["Test", jest.fn(), {}, jest.fn()]}
    />
  );

  //There should be 3 View Buttons
  expect(getAllByText("View").length).toBe(3);

  expect(getByText("Legal")).not.toBeNull();
  expect(getAllByText("Legal").length).toBe(1);
  expect(getByText("Terms")).not.toBeNull();
  expect(getAllByText("Terms").length).toBe(1);
  expect(getByText("Privacy Policy")).not.toBeNull();
  expect(getAllByText("Privacy Policy").length).toBe(1);

  expect(getByText("Wallet Address")).not.toBeNull();
  expect(getAllByText("Wallet Address").length).toBe(1);
  expect(getByText("Address")).not.toBeNull();
  expect(getAllByText("Address").length).toBe(1);

  expect(getByText("App Information")).not.toBeNull();
  expect(getAllByText("App Information").length).toBe(1);
  expect(getByText("Current Version")).not.toBeNull();
  expect(getAllByText("Current Version").length).toBe(1);
});
