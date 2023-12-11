import React from "react";
import { useState } from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ProviderPasswordScreen from "../../src/screens/ProviderPasswordScreen";

//Mocking the setState for checking if the correct password was provided
const mockSetValidPasswordProvided = jest.fn().mockReturnValue();
it("renders", () => {
  render(<ProviderPasswordScreen setValidPasswordProvided={mockSetValidPasswordProvided}/>);
});
