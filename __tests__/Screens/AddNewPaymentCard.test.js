import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import AddNewPaymentCard from "../../src/screens/AddNewPaymentCard";

it("renders", ()=>{
    render(<AddNewPaymentCard/>)
})