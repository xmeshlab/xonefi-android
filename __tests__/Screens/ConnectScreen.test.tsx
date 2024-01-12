import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";
import ConnectScreen from "../../src/screens/ConnectScreen";
import * as getOnefiRouters from "../../src/hooks/getOnefiRouters";

jest.spyOn(getOnefiRouters, 'getOneFiRouterList').mockResolvedValue();

it("renders", ()=>{
    render(<ConnectScreen route={{key:"Key", name:"Connect"}} navigation={{}}/>)
})