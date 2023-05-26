import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import PaymentCardScreen from "../../navigation/screens/PaymentCardScreen";

it("renders", ()=>{
    render(<PaymentCardScreen/>)
})