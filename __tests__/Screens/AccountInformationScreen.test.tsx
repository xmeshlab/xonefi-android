import React, {useContext} from "react";
import { describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

//import { userContext } from "../../src/MainContainer";

import AccountInformationScreen from "../../src/screens/AccountInformationScreen";

//(['', (value: string)=>{},{}, (value: string)=>{}]);

/*const userContextMock = {
    ["Test", (value: string)=>jest.fn(), {}, (value: string)=>jest.fn()]
  };*/
const userContext = React.createContext(['', (value: string)=>{},{}, (value: string)=>{}]);

it("renders", ()=>{
    const pushMock = jest.fn();

    const {getByText} = render(
        <userContext.Provider value={["Test", (value: string)=>jest.fn(), {}, (value: string)=>jest.fn()]}>
            <AccountInformationScreen navigation={{push: pushMock}}/>
        </userContext.Provider>)
})