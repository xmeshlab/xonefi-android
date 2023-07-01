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
    usd: 0,
    usd_24h_change: 0,
  },
  bitcoin: {
    usd: 0,
    usd_24h_change: 0,
  },
  ethereum: {
    usd: 0,
    usd_24h_change: 0,
  },
  "matic-network": {
    usd: 0,
    usd_24h_change: 0,
  },
  solana: {
    usd: 0,
    usd_24h_change: 0,
  },
};

export default function WalletScreen({ navigation }) {
  const [priceJson, setPriceJson] = useState(default_json);

  //API call to coingecko to get prices of eth and bitcoin and binance coin
  //bitcoin,ethereum,binancecoin,solana,matic-network,
  //        //"https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cbinancecoin%2Csolana%2Cmatic-network&vs_currencies=usd" - just prices
  useEffect(() => {
    let interval = setInterval(() => {
      fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cbinancecoin%2Csolana%2Cmatic-network&vs_currencies=usd&include_24hr_change=true"
      )
        //the res.json() seems to be doing all of the parsing for us
        .then((res) => res.json())
        .then((resJSON) => {
          console.log(resJSON);
          setPriceJson(resJSON);
        });
        setTimeout(function(){
          document.getElementsByTagName("Text")[0].style.color = "#cccccc";
      },3000);

    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View className="flex-1">
      <React.Fragment>
        <OneFiAsset
          AssetAmount="1,000,000"
          AssetChange={"0.00%"}
          AssetPrice="$0.00 USD"
        />
        <ScrollView style={{ backgroundColor: "transparent" }}>
          <Asset
            AssetName="ETH Wallet"
            AssetAmount="0 ETH"
            AssetPrice={priceJson.ethereum.usd}
            AssetLogo={() => <EthLogoSVG />}
            AssetChange={Number(priceJson.ethereum.usd_24h_change).toFixed(2)}
          />
          <Asset
            AssetName="BTC Wallet"
            AssetAmount={"0 BTC"}
            AssetPrice={priceJson.bitcoin.usd}
            AssetLogo={() => <BitcoinLogoSVG />}
            AssetChange={Number(priceJson.bitcoin.usd_24h_change).toFixed(2)}
          />
          <Asset
            AssetName="Cash (USD)"
            AssetAmount={0.0}
            AssetPrice={1}
            AssetLogo={() => <CashLogoSVG />}
            AssetChange={0}
          />
          <Asset
            AssetName="Binance Wallet"
            AssetAmount="0 BNB"
            AssetPrice={priceJson.binancecoin.usd}
            AssetLogo={() => <BianaceLogoSVG />}
            AssetChange={Number(priceJson.binancecoin.usd_24h_change).toFixed(
              2
            )}
          />
          <Asset
            AssetName="Neo Wallet"
            AssetAmount="0 NEO"
            AssetPrice={38.91}
            AssetLogo={() => <NeoLogoSVG />}
            AssetChange={7.0}
          />
          <Asset
            AssetName="Solana Wallet"
            AssetAmount="0 SOL"
            AssetPrice={priceJson.solana.usd}
            AssetLogo={() => <SolanaLogoSVG />}
            AssetChange={Number(priceJson.solana.usd_24h_change).toFixed(2)}
          />
          <Asset
            AssetName="Matic Wallet"
            AssetAmount="0 MATIC"
            AssetPrice={priceJson["matic-network"].usd}
            AssetLogo={() => <MaticLogoSVG />}
            AssetChange={Number(
              priceJson["matic-network"].usd_24h_change
            ).toFixed(2)}
          />
        </ScrollView>
      </React.Fragment>
    </View>
  );
}
