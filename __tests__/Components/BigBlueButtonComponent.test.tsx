import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";
import BigBlueButton from "../../src/Components/BigBlueButton";

//function BigBlueButton({text, onPressFunction})
test("Rendering the Big Blue Button Component", () => {
  const mockButtonPress = jest.fn().mockReturnValue("Button Pressed");

  const { getByText, getByPlaceholderText, getByTestId } = render(
    <BigBlueButton text={"Testing"} onPressFunction={mockButtonPress} />
  );
  const BlueButton = getByText("Testing");
  expect(BlueButton).not.toBeNull();
});
