import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import LinkedAccountScreen from "../../src/screens/LinkedAccountsScreen";

it("renders", () => {
  const {getByText, getAllByText, getByTestId} = render(<LinkedAccountScreen />);

    //Check that the correct outputs are displayed
    expect(getByText("Linked Payment Card")).not.toBeNull();
    expect(getAllByText("Linked Payment Card").length).toBe(1);
    expect(getByText("Account Information")).not.toBeNull();
    expect(getAllByText("Account Information").length).toBe(1);
    expect(getByText("Logout")).not.toBeNull();
    expect(getAllByText("Logout").length).toBe(1);

    //Now add the code for testing navigation
});
