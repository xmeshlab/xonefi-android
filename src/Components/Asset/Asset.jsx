import * as React from "react";
import { useUserContext } from "../../context/UserContext";

import AssetBlackBackground from "./AssetBlackBackground";
import AssetWhiteBackground from "./AssetWhiteBackground";

/**
 * This component is used to display the various cryptocurrencies on the WalletScreen
 */
export default function Asset({
  AssetName,
  AssetAmount,
  AssetLogo,
  AssetPrice,
  AssetChange,
}) {
  const icon = AssetLogo();
  const userContext_array = useUserContext();

  //check background color variable in the userContext to determine which background to render
  if(userContext_array[4] == "black"){
  return (
    <AssetBlackBackground {...props}/>
  );
  }else{
    //white background
    return (
      <AssetWhiteBackground {...props}/>
    );

  }
}
