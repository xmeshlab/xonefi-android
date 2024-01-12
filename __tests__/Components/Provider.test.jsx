import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import Provider from "../../src/Components/Provider.jsx";
const navigationFunctionMock = jest.fn().mockReturnValueOnce("Provider Pressed");

it("Rendering the Provider Component", () => {
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

it("Checking Button Press", () => {
  const { getByText, getByTestId } = render(
    <Provider
      ProviderName={"Test Name"}
      Status={true}
      navigationFunction={navigationFunctionMock}
    />
  );

  ProviderComponent = getByText("Test Name");
  expect(ProviderComponent).not.toBeNull();

  //Press all the buttons
  expect(fireEvent.press(getByTestId("Provider Button"))).toBe("Provider Pressed");
});
