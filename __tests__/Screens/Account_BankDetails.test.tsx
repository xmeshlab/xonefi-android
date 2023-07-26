import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import AccountBankDetails from "../../src/screens/Currently Not in User Flow/Account_BankDetails";

it("renders", () => {
  render(<AccountBankDetails key={"Test"} name={"Test"} />);
});
