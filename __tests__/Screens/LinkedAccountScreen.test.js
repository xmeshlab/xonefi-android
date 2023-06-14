import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import LinkedAccountScreen from "../../src/screens/LinkedAccountsScreen";

it("renders", () => {
  render(<LinkedAccountScreen />);
});
