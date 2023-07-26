import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import AccountAddCrptoPaymentCard from "../../src/screens/Currently Not in User Flow/Account_AddCryptoPaymentCard";

it("renders", () => {
  render(<AccountAddCrptoPaymentCard key={"Test"} name={"Test"} />);
});
