import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import AccountAddCrptoPaymentCard from "../../src/screens/Account_AddCryptoPaymentCard";

it("renders", ()=>{
    render(<AccountAddCrptoPaymentCard key={"Test"} name={"Test"}/>)
})