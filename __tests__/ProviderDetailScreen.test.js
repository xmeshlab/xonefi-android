import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";
//import "@testing-library/jest-dom";

import ProviderDetailScreen from "../navigation/screens/ProviderDetailScreen";

it("renders", ()=>{
    render(<ProviderDetailScreen/>)
})