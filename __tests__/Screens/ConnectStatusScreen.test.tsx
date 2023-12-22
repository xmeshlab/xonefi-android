import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import ConnectStatusScreen from "../../src/screens/ConnectStatusScreen";

const mockedCanGoBack = jest.fn().mockReturnValue(true);

const mockedGoBack = jest.fn();

const mockedNavigation = {
    canGoBack: mockedCanGoBack,
    goBack: mockedGoBack,
}
it("renders", () => {
  render(<ConnectStatusScreen route={{key:"key", 
  name:"Status"}} 
  navigation={
      mockedNavigation
  } />);
});
