import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import PaymentCardScreen from "../../src/screens/Currently Not in User Flow/PaymentCardScreen";

it("renders", () => {
  render(<PaymentCardScreen />);
});
