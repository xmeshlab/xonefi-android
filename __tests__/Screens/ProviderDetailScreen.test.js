import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import ProviderDetailScreen from "../../src/screens/ProviderDetailScreen";

//Provider Detail Screen Renders. Need more tests now. Test the password input
it("renders", () => {
  render(<ProviderDetailScreen route={{params: "SSID"}}/>);
});
