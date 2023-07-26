import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import InitialLogInScreen from "../../src/screens/InitialLogInScreen";

it("renders", () => {
  const GoogleLoginMock = jest.fn();
  const FacebookLoginMock = jest.fn();
  const TwitterLoginMock = jest.fn();

  const { getByText, getAllByText, getByTestId } = render(
    <InitialLogInScreen
      logInFunction={GoogleLoginMock}
      loginFacebook={FacebookLoginMock}
      loginTwitter={TwitterLoginMock}
    />
  );

  //Only One place on the screen with the text LogIn
  expect(getAllByText("Login").length).toBe(1);
  expect(getByText("Login")).not.toBeNull();

  //Test that all the buttons are there
  expect(getByTestId("Google Login")).not.toBeNull();
  expect(getByTestId("Facebook Login")).not.toBeNull();
  expect(getByTestId("Twitter Login")).not.toBeNull();

  //Press all the buttons
  fireEvent.press(getByTestId("Google Login"));
  fireEvent.press(getByTestId("Facebook Login"));
  fireEvent.press(getByTestId("Twitter Login"));
});
