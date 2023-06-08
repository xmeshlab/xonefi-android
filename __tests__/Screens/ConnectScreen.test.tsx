import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import {
    RouteComponent,
  } from "../../types/global";
import ConnectScreen from "../../src/screens/ConnectScreen";

it("renders", ()=>{
    const pushMock = jest.fn();
    
    RouteComponent instance = new RouteComponet
    interface GlobalRoute{
        Connect : "Connect"

    }
    const {getByText} = render(<ConnectScreen navigation={{push: pushMock}}  route={RouteProp<GlobalRoute, "Connect">}/>)
})