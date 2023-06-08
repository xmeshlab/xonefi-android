import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";


import AssetGain from "../../assets/AssetGainLogo.png";
import OneFiAsset from "../../src/Components/OneFiAsset.jsx";

//OneFiAsset({ AssetAmount, AssetPrice, AssetChange }) {
test("Rendering the OneFiAsset Component", () => {
    const { getByText } = render(
        <OneFiAsset AssetAmount={10} AssetPrice={12} AssetChange={AssetGain}/>
    );
  
    OneFiAssetComponent = getByText("12");
    expect(OneFiAssetComponent).not.toBeNull();
  });