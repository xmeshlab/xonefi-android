import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import LinkedAccountScreen from "../../src/screens/LinkedAccountsScreen";

it("renders", ()=>{
    render(<LinkedAccountScreen/>)
})