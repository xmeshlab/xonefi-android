import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";

import LinkedAccountScreen from "../../src/screens/LinkedAccountsScreen";
import { UserContextProvider } from "../../src/context/UserContext";
//import storePrivteKey from "../../src/hooks/StorePrivateKey";
//jest.mock("../../src/hooks/StorePrivateKey", ()=>({storePrivteKey: jest.fn()}));
//jest.mock("../../src/hooks/StorePrivateKey")

it("renders", () => {
  //const storePrivateKeySpy = jest.spyOn(storePrivteKey, 'storePrivteKey').mockResolvedValue()
  //storePrivteKey.storePrivteKey.mockResolvedValue(0)
  //storePrivteKey.mockImplementation(() => 42)

  const { getByText, getAllByText, getByTestId } = render(
    <UserContextProvider>
      <LinkedAccountScreen />
    </UserContextProvider>
  );

  //need to mock storePrivateKey
  

  //Check that the correct outputs are displayed
  expect(getByText("Linked Payment Card")).not.toBeNull();
  expect(getAllByText("Linked Payment Card").length).toBe(1);
  expect(getByText("Account Information")).not.toBeNull();
  expect(getAllByText("Account Information").length).toBe(1);
  expect(getByText("Logout")).not.toBeNull();
  expect(getAllByText("Logout").length).toBe(1);

  //storePrivateKeySpy.mockRestore();
});

//Navigation is not defined
/*it("Testing Navigation", async () => {
  render(<LinkedAccountScreen />);
  const toClick = await screen.findByText('Linked Payment Card');
  fireEvent(toClick, 'press');

  const newScreenText = await screen.findByText('Add New Payment Card');
  expect(newScreenText).toBeOnTheScreen();
});*/
