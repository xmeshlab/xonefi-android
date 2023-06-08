import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import { userContext } from "../../src/MainContainer";

import AccountInformationScreen from "../../src/screens/AccountInformationScreen";

it("renders", ()=>{
    const pushMock = jest.fn();

    const {getByText} = render(<AccountInformationScreen navigation={{push: pushMock}} />)
})