import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import { WithMainBg } from "../../src/Components/WithMainBg";

it("Renders", () => {

  const { getByText, getAllByText, getByTestId } = render(
   <WithMainBg/>
  );

})
