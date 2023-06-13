import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import PaymentCardScreen from "../../src/screens/PaymentCardScreen";

it("renders", () => {
  render(<PaymentCardScreen />);
});
