import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import LinkedPaymentCardScreen from "../../src/screens/LinkedPaymentCardScreen";

it("renders", () => {
  const { getByText, getAllByText, getByTestId } = render(
    <LinkedPaymentCardScreen />
  );

  //Check that the correct outputs are displayed
  expect(getByText("Add New Payment Card")).not.toBeNull();
  expect(getAllByText("Add New Payment Card").length).toBe(1);

  expect(getByText("Card Holder")).not.toBeNull();
  expect(getAllByText("Card Holder").length).toBe(1);

  expect(getByText("Card Number")).not.toBeNull();
  expect(getAllByText("Card Number").length).toBe(1);

  expect(getByText("CSV")).not.toBeNull();
  expect(getAllByText("CSV").length).toBe(1);

  expect(getByText("EXP")).not.toBeNull();
  expect(getAllByText("EXP").length).toBe(1);
});
