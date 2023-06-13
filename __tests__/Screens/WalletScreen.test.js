import React from "react";
import { describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import WalletScreen from "../../src/screens/WalletScreen";

it("renders", () => {
  const { getByText } = render(<WalletScreen />);

  default_json = {
    binancecoin: {
      usd: 306.36,
      usd_24h_change: -3.1936254367349934,
    },
    bitcoin: {
      usd: 26885,
      usd_24h_change: -3.6496973439437213,
    },
    ethereum: {
      usd: 1790.7,
      usd_24h_change: -3.7306858661681077,
    },
    "matic-network": {
      usd: 0.842185,
      usd_24h_change: -4.64440223078995,
    },
    solana: {
      usd: 20.04,
      usd_24h_change: -5.5707787222889635,
    },
  };

  fetch.mockResponseOnce(JSON.stringify(default_json));

  EthAsset = getByText("ETH Wallet");
  expect(EthAsset).not.toBeNull();
  BitcoinAsset = getByText("BTC Wallet");
  expect(BitcoinAsset).not.toBeNull();
});
