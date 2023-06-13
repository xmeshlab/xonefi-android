import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import GreyTextInputBar from "../../src/Components/GreyTextInputBar";

it("Renders", () => {
  const mockButtonPress = jest.fn().mockReturnValue("State Function");

  const {getByText, getAllByText, getByTestId, getAllByPlaceholderText, getByPlaceholderText} = render(
    <GreyTextInputBar placeholder_text={"Testing"} state_function={mockButtonPress} />
  );

  //Check that the correct outputs are displayed
  expect(getByPlaceholderText("Testing")).not.toBeNull();
  //expect the text to only be displayed once
  expect(getAllByPlaceholderText("Testing").length).toBe(1);

  //Change the text
  //fireEvent.changeText(getByTestId("Text Input"), "Text has been changed");
  //expect(getByText("Text has been changed")).not.toBeNull();
  //expect(getAllByText("Text has been changed").length).toBe(1);
});
