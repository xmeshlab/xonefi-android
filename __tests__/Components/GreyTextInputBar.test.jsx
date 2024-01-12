import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import {GreyTextInputBar, GreyTextInputBarNoMargin} from "../../src/Components/GreyTextInputBar";

it("Renders", () => {
  const mockStateFunction = jest.fn().mockReturnValue("State Function");

  const {
    getByText,
    getAllByText,
    getByTestId,
    getAllByPlaceholderText,
    getByPlaceholderText,
  } = render(
    <GreyTextInputBar
      placeholder_text={"Testing"}
      state_function={mockStateFunction}
    />
  );

  //expect the text to only be displayed once
  expect(getAllByPlaceholderText("Testing").length).toBe(1);

  //Check that the correct outputs are displayed
  expect(getByPlaceholderText("Testing")).not.toBeNull();

});


it("Change input", () => {
  const mockStateFunction = jest.fn().mockReturnValue("State Function");

  const {
    getByText,
    getAllByText,
    getByTestId,
    getByLabelText,
    getAllByPlaceholderText,
    getByPlaceholderText,
  } = render(
    <GreyTextInputBar
      placeholder_text={"Testing"}
      state_function={mockStateFunction}
    />
  );

  //expect the text to only be displayed once
  expect(getAllByPlaceholderText("Testing").length).toBe(1);

  //Check that the correct outputs are displayed
  const input = getByTestId("Text Input")
  expect(input).not.toBeNull();

  //Change the text - will trigger the state_function prop
  fireEvent.changeText(input, 'Change Text');
  expect(mockStateFunction).toHaveBeenCalled();

  fireEvent.changeText(input, '12345');
  expect(mockStateFunction).toHaveBeenCalled();
});


it("Renders No Margin", () => {
  const mockStateFunction = jest.fn().mockReturnValue("State Function");

  const {
    getByText,
    getAllByText,
    getByTestId,
    getAllByPlaceholderText,
    getByPlaceholderText,
  } = render(
    <GreyTextInputBarNoMargin
      placeholder_text={"Testing"}
      state_function={mockStateFunction}
    />
  );

  //expect the text to only be displayed once
  expect(getAllByPlaceholderText("Testing").length).toBe(1);

  //Check that the correct outputs are displayed
  expect(getByPlaceholderText("Testing")).not.toBeNull();

});


it("Change input No Margin", () => {
  const mockStateFunction = jest.fn().mockReturnValue("State Function");

  const {
    getByText,
    getAllByText,
    getByTestId,
    getByLabelText,
    getAllByPlaceholderText,
    getByPlaceholderText,
  } = render(
    <GreyTextInputBarNoMargin
      placeholder_text={"Testing"}
      state_function={mockStateFunction}
    />
  );

  //expect the text to only be displayed once
  expect(getAllByPlaceholderText("Testing").length).toBe(1);

  //Check that the correct outputs are displayed
  const input = getByTestId("Text Input")
  expect(input).not.toBeNull();

  //Change the text - will trigger the state_function prop
  fireEvent.changeText(input, 'Change Text');
  expect(mockStateFunction).toHaveBeenCalled();

  fireEvent.changeText(input, '12345');
  expect(mockStateFunction).toHaveBeenCalled();
});

