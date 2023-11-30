import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import Provider from "../../src/Components/Provider.jsx";
const navigationFunctionMock = jest.fn();

//function Provider({ProviderName,UsersConnectedNumber,TokenGenNumber,Status,})
test("Rendering the Provider Component", () => {
  const { getByText } = render(
    <Provider
      ProviderName={"Test Name"}
      Status={true}
      navigationFunction={navigationFunctionMock}
    />
  );

  ProviderComponent = getByText("Test Name");
  expect(ProviderComponent).not.toBeNull();
});
