import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import AssetGain from "../../assets/AssetGainLogo.png";
import RightArrow from "../../assets/RightArrowIcon.png";

import GreyButton from "../../src/Components/GreyButton";

it("Renders", () => {
  const mockButtonPress = jest.fn().mockReturnValue("Button Pressed");

  const {getByText, getAllByText, getByTestId} = render(
    <GreyButton
      imageSource={AssetGain}
      textInput={"Test"}
      onPressFunction={mockButtonPress}
    />
  );

  //Check that the correct outputs are displayed
  expect(getByText("Test")).not.toBeNull();
  //expect the text to only be displayed once
  expect(getAllByText("Test").length).toBe(1);

  //Press the button
  fireEvent.press(getByTestId("Grey Button"));
});

it("Renders with Different Text", () => {
  const mockButtonPress = jest.fn().mockReturnValue("Button Pressed");

  const {getByText, getAllByText, getByTestId} = render(
    <GreyButton
      imageSource={AssetGain}
      textInput={"Button Text"}
      onPressFunction={mockButtonPress}
    />
  );

  //Check that the correct outputs are displayed
  expect(getByText("Button Text")).not.toBeNull();
  //expect the text to only be displayed once
  expect(getAllByText("Button Text").length).toBe(1);

  //Press the button
  fireEvent.press(getByTestId("Grey Button"));
});

it("Renders with Different Image", () => {
  const mockButtonPress = jest.fn().mockReturnValue("Button Pressed");

  const {getByText, getAllByText, getByTestId} = render(
    <GreyButton
      imageSource={RightArrow}
      textInput={"Button Text"}
      onPressFunction={mockButtonPress}
    />
  );

  //Check that the correct outputs are displayed
  expect(getByText("Button Text")).not.toBeNull();
  //expect the text to only be displayed once
  expect(getAllByText("Button Text").length).toBe(1);

  //Press the button
  fireEvent.press(getByTestId("Grey Button"));
});