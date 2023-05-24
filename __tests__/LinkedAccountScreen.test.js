import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";
//import "@testing-library/jest-dom";

import LinkedAccountScreen from "../navigation/screens/LinkedAccountsScreen";

it("renders", ()=>{
    render(<LinkedAccountScreen/>)
})