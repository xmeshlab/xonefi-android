import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import {PageHeaderProps, WithBackBtnPageHeader, TabPageHeader} from "../../src/Components/PageHeader/PageHeader";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";


it("Renders", () => {
    render(
        <WithBackBtnPageHeader route={{key:"key", 
        name:"Header"}} 
        rightView={<></>} leftView={<></>}/>
      );
 
});
