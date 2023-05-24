import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";
//import "@testing-library/jest-dom";

import Provider from "../navigation/Components/Provider.jsx";

//function Provider({ProviderName,UsersConnectedNumber,TokenGenNumber,Status,}) 
test("Rendering the Provider Component", () => {
    const { getByText } = render(
        <Provider ProviderName={"Test Name"} UsersConnectedNumber={"Test Number"} TokenGenNumber={"Test"}/>
    );
  
    ProviderComponent = getByText("Test");
    expect(ProviderComponent).not.toBeNull();
  });