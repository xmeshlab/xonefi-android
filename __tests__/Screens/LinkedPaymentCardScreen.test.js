import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import LinkedPaymentCardScreen from "../../navigation/screens/LinkedPaymentCardScreen";

it("renders", ()=>{
    render(<LinkedPaymentCardScreen/>)
})