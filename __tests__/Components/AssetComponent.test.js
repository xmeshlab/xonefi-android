import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Asset from "../../src/Components/Asset.jsx";

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

function EthLogoSVG(props) {
  return (
    <Svg
      width={39}
      height={39}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#prefix__clip0_111_1203)">
        <Circle cx={19.5} cy={19.5} r={19.5} fill="#7F6EE9" />
        <Path
          d="M19.932 4.917v.013c.014.07.014.153.014.236v9.982c-.014.055-.055.069-.097.097-.29.138-.567.263-.858.387-.402.18-.817.374-1.218.554l-1.454.665c-.402.18-.803.36-1.19.54-.471.221-.956.429-1.427.65-.401.18-.803.374-1.218.554-.332.152-.665.29-.983.443a.197.197 0 01-.083.028c-.014 0-.014 0-.028-.014l.374-.623c.72-1.19 1.426-2.367 2.146-3.558.761-1.274 1.537-2.548 2.298-3.821.706-1.177 1.426-2.354 2.132-3.53.512-.859 1.038-1.717 1.55-2.576.015-.027.029-.041.029-.069h.013c-.013.014 0 .028 0 .042z"
          fill="#F3F3F3"
        />
        <Path
          d="M28.432 19.052l.014.014-2.036 1.204-6.396 3.78a.301.301 0 00-.07.041c-.04 0-.04-.041-.04-.055v-8.681c0-.041 0-.097.013-.138.014-.056.055-.042.097-.028.18.083.374.166.554.25.54.249 1.08.498 1.62.733.47.208.927.43 1.398.637.47.208.942.43 1.412.637.402.18.817.374 1.218.554.402.18.817.373 1.219.553.318.139.637.291.955.43 0 .041.014.055.042.069z"
          fill="#8A8DA7"
        />
        <Path
          d="M19.931 32.69c0 .013-.014.027-.014.04h-.014c0-.027-.027-.04-.041-.069-.858-1.204-1.717-2.422-2.575-3.627-.872-1.232-1.758-2.478-2.63-3.71-.845-1.191-1.704-2.396-2.548-3.586-.222-.319-.443-.623-.665-.942-.014-.027-.027-.041-.055-.083.042 0 .07.028.083.042 1.205.706 2.395 1.412 3.6 2.118 1.384.817 2.755 1.634 4.14 2.45l.705.416c.028.028.028.055.028.083v6.673c0 .07 0 .139-.014.194z"
          fill="#F3F3F3"
        />
        <Path
          d="M11.375 19.08v-.014c.443-.194.872-.402 1.315-.596.568-.263 1.136-.512 1.703-.775.43-.194.872-.401 1.302-.595.636-.291 1.26-.568 1.896-.859.43-.194.859-.387 1.302-.595.304-.138.623-.277.927-.415.028-.014.07-.028.083-.056.014 0 .014.014 0 .028v8.791c0 .042-.013.084.014.111-.027.042-.055 0-.069-.014-.125-.069-.25-.138-.374-.221-2.672-1.579-5.358-3.17-8.03-4.749-.014-.014-.041-.028-.069-.041zM28.404 20.713h.014c0 .028-.028.056-.042.083-2.547 3.586-5.095 7.186-7.642 10.772-.263.373-.54.747-.803 1.121-.014-.014-.014-.028-.014-.041v-6.923c.582-.346 1.15-.678 1.73-1.024 2.244-1.33 4.487-2.645 6.716-3.974.013.014.027 0 .041-.014z"
          fill="#C5C8D9"
        />
        <Path
          d="M19.917 15.203V5.041c0-.042-.014-.07.014-.11 2.81 4.665 5.621 9.317 8.418 13.982.027.042.069.097.083.153-.194-.07-.374-.166-.554-.25-.221-.096-.457-.207-.678-.304-.139-.07-.291-.125-.43-.194-.235-.11-.47-.208-.706-.318a5.6 5.6 0 01-.415-.194l-.914-.416c-.152-.069-.304-.138-.47-.207l-.665-.291a5.6 5.6 0 01-.415-.194l-.914-.415c-.152-.07-.305-.139-.47-.208l-.665-.29c-.153-.07-.291-.139-.443-.208-.263-.125-.527-.25-.803-.36.041-.014.027-.014.027-.014z"
          fill="#C5C8D9"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_111_1203">
          <Path fill="#fff" d="M0 0h39v39H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

it("render", () => {
  const { getByText, getAllByText, getByTestId } = render(
    <Asset
      AssetName="Eth Wallet"
      AssetAmount="1.23 Eth"
      AssetPrice={"12"}
      AssetLogo={() => <EthLogoSVG />}
      AssetChange="10"
    />
  );

  //Check that the correct outputs are displayed
  expect(getByText("Eth Wallet")).not.toBeNull();
  expect(getByText("1.23 Eth")).not.toBeNull();
  expect(getByText("$12")).not.toBeNull();
  expect(getByText("10%")).not.toBeNull();
});

it("render test 2", () => {
  const { getByText, getAllByText, getByTestId } = render(
    <Asset
      AssetName="Eth Wallet"
      AssetAmount="77 Eth"
      AssetPrice={"85"}
      AssetLogo={() => <EthLogoSVG />}
      AssetChange="45"
    />
  );

  //Check that the correct outputs are displayed
  expect(getByText("Eth Wallet")).not.toBeNull();
  expect(getByText("77 Eth")).not.toBeNull();
  expect(getByText("$85")).not.toBeNull();
  expect(getByText("45%")).not.toBeNull();
});

it("render with 5 digit price", () => {
  const { getByText, getAllByText, getByTestId } = render(
    <Asset
      AssetName="Eth Wallet"
      AssetAmount="9 Eth"
      AssetPrice={"12345"}
      AssetLogo={() => <EthLogoSVG />}
      AssetChange="5.89"
    />
  );

  //Check that the correct outputs are displayed
  expect(getByText("Eth Wallet")).not.toBeNull();
  expect(getByText("9 Eth")).not.toBeNull();
  expect(getByText("$12,345")).not.toBeNull();
  expect(getByText("5.89%")).not.toBeNull();
});

it("render test with negative Asset Change", () => {
  const { getByText, getAllByText, getByTestId } = render(
    <Asset
      AssetName="Eth Wallet"
      AssetAmount="17 Eth"
      AssetPrice={"4345"}
      AssetLogo={() => <EthLogoSVG />}
      AssetChange="-5.66"
    />
  );

  //Check that the correct outputs are displayed
  expect(getByText("Eth Wallet")).not.toBeNull();
  expect(getByText("17 Eth")).not.toBeNull();
  expect(getByText("$4,345")).not.toBeNull();
  expect(getByText("-5.66%")).not.toBeNull();
});

it("render test with Different Asset Name", () => {
  const { getByText, getAllByText, getByTestId } = render(
    <Asset
      AssetName="Cryptocurrency"
      AssetAmount="80 Cryptocurrency"
      AssetPrice={"4345"}
      AssetLogo={() => <EthLogoSVG />}
      AssetChange="-5.66"
    />
  );

  //Check that the correct outputs are displayed
  expect(getByText("Cryptocurrency")).not.toBeNull();
  expect(getByText("80 Cryptocurrency")).not.toBeNull();
  expect(getByText("$4,345")).not.toBeNull();
  expect(getByText("-5.66%")).not.toBeNull();
});
