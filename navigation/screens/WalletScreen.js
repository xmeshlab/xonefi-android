import * as React from "react";
import { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import Svg, {
  G,
  Circle,
  Path,
  Defs,
  ClipPath,
  LinearGradient,
  Pattern,
  Use,
  Image,
  Stop,
} from "react-native-svg";

import Asset from "../Components/Asset";
import OneFiAsset from "../Components/OneFiAsset";

import { EthLogoSVG } from "../icons/crypto_icons";
import { BitcoinLogoSVG } from "../icons/crypto_icons";
import { CashLogoSVG } from "../icons/crypto_icons";
import { BianaceLogoSVG } from "../icons/crypto_icons";
import { NeoLogoSVG } from "../icons/crypto_icons";
import { SolanaLogoSVG } from "../icons/crypto_icons";
import { MaticLogoSVG } from "../icons/crypto_icons";

default_json = {
  binancecoin: {
    usd: 283.15,
  },
  bitcoin: {
    usd: 20960,
  },
  ethereum: {
    usd: 1502.01,
  },
  "matic-network": {
    usd: 1.035,
  },
  solana: {
    usd: 17.78,
  },
};

export default function WalletScreen({ navigation }) {
  const [priceJson, setPriceJson] = useState(default_json);

  //API call to coingecko to get prices of eth and bitcoin and binance coin
  //bitcoin,ethereum,binancecoin,solana,matic-network,
  useEffect(() => {
    let interval = setInterval(() => {
      fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cbinancecoin%2Csolana%2Cmatic-network&vs_currencies=usd"
      )
        //the res.json() seems to be doing all of the parsing for us
        .then((res) => res.json())
        .then((resJSON) => {
          console.log(resJSON);
          setPriceJson(resJSON);
        });
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View className="flex-1">
      <React.Fragment>
        <OneFiAsset
          AssetAmount="144.56"
          AssetChange={"4.06%"}
          AssetPrice="$47.24 USD"
        />
        <ScrollView style={{ backgroundColor: "transparent" }}>
          <Asset
            AssetName="Eth Wallet"
            AssetAmount="1.23 Eth"
            AssetPrice={"$" + priceJson.ethereum.usd}
            AssetLogo={() => <EthLogoSVG />}
            AssetChange="4.06%"
          />
          <Asset
            AssetName="BTC Wallet"
            AssetAmount={"0.32 BTC"}
            AssetPrice={"$" + priceJson.bitcoin.usd}
            AssetLogo={() => <BitcoinLogoSVG />}
            AssetChange="4.06%"
          />
          <Asset
            AssetName="Cash (USD)"
            AssetAmount="$1,722.2"
            AssetPrice="$1,722.2"
            AssetLogo={() => <CashLogoSVG />}
            AssetChange="4.06%"
          />
          <Asset
            AssetName="Binance Wallet"
            AssetAmount="0.4188 BNB"
            AssetPrice={"$" + priceJson.binancecoin.usd}
            AssetLogo={() => <BianaceLogoSVG />}
            AssetChange="3.38%"
          />
          <Asset
            AssetName="Neo Wallet"
            AssetAmount="28.9371 NEO"
            AssetPrice="$38.91"
            AssetLogo={() => <NeoLogoSVG />}
            AssetChange="0.56%"
          />
          <Asset
            AssetName="Solana Wallet"
            AssetAmount="4.5 SOL"
            AssetPrice={"$" + priceJson.solana.usd}
            AssetLogo={() => <SolanaLogoSVG />}
            AssetChange="0.56%"
          />
          <Asset
            AssetName="Matic Wallet"
            AssetAmount="3.6 MATIC"
            AssetPrice={"$" + priceJson["matic-network"].usd}
            AssetLogo={() => <MaticLogoSVG />}
            AssetChange="0.56%"
          />
        </ScrollView>
      </React.Fragment>
    </View>
  );
}
