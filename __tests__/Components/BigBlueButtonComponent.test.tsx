import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import BigBlueButton from "../../src/Components/BigBlueButton";

it("Renders", () => {
  const mockButtonPress = jest.fn().mockReturnValue("Button Pressed");

  const {getByText, getAllByText, getByTestId} = render(<BigBlueButton text={"Testing"} onPressFunction={mockButtonPress}/>);

  //Check that the correct outputs are displayed
  expect(getByText("Testing")).not.toBeNull();
  //expect the text to only be displayed once
  expect(getAllByText("Testing").length).toBe(1);

  //Press the button
  fireEvent.press(getByTestId("Big Blue Button"));
});

it("Renders with Different Button Name", () => {
  const mockButtonPress = jest.fn().mockReturnValue("Button Pressed");

  const {getByText, getAllByText, getByTestId} = render(<BigBlueButton text={"Button that is blue"} onPressFunction={mockButtonPress}/>);

  //Check that the correct outputs are displayed
  expect(getByText("Button that is blue")).not.toBeNull();
  //expect the text to only be displayed once
  expect(getAllByText("Button that is blue").length).toBe(1);

  //Press the button
  fireEvent.press(getByTestId("Big Blue Button"));
});
