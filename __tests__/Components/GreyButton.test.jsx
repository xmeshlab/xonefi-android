import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import AssetGain from "../../assets/AssetGainLogo.png";
import GreyButton from "../../src/Components/GreyButton";

//const GreyButton = ({ imageSource, textInput, onPressFunction }) => {
test("Rendering the GreyButton Component", () => {
  const { getByText } = render(
    <GreyButton
      imageSource={AssetGain}
      textInput={"Test"}
      onPressFunction={() => {
        alert("Test");
      }}
    />
  );

  GreyButtonComponent = getByText("Test");
  expect(GreyButtonComponent).not.toBeNull();
});
