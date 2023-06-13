import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import ProviderDetailScreen from "../../src/screens/ProviderDetailScreen";

it("renders", () => {
  render(<ProviderDetailScreen />);
});
