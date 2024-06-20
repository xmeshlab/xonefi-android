import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import AssetGain from "../../assets/AssetGainLogo.png";
import OneFiAsset from "../../src/Components/OneFiAsset/OneFiAsset.jsx";
import { UserContextProvider } from "../../src/context/UserContext";

//OneFiAsset({ AssetAmount, AssetPrice, AssetChange }) {
test("Rendering the OneFiAsset Component", () => {
  const { getByText } = render(
    <UserContextProvider>
      <OneFiAsset AssetAmount={10} AssetPrice={12} AssetChange={AssetGain} />
    </UserContextProvider>
  );

  OneFiAssetComponent = getByText("12");
  expect(OneFiAssetComponent).not.toBeNull();
});
