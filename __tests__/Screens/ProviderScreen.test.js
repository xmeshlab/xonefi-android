import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import ProviderScreen from "../../src/screens/ProviderScreen";

it("renders", ()=>{
    render(<ProviderScreen/>)
})