import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import AccountAddBankCard from "../../src/screens/Currently Not in User Flow/Account_AddBankCard";

it("renders", () => {
  render(<AccountAddBankCard key={"Test"} name={"Test"} />);
});
