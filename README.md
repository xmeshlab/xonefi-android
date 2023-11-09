# xonefi-android

This document provides an overview of the Android version of the XOneFi application.

# How to Run

To set up the project locally, start by installing the necessary packages:

```shell
yarn install
```

After installing the packages, use Android Studio to further configure and initiate the Android project.

# Project Structure

This project consists of several main sections:

- The `App.tsx` file serves as the entry point of the application.
- The `assets` folder includes all images and other assets used in the program.
- The `src` folder encompasses the application's source code.
- The `android` folder is the React Native Android folder. Inside android/app/src/main/java/com/onefi/XOneFi  you will find custom native code written for this application

#### Within the `src` folder, we have:

- The `Components` folder, which includes all the components for the mobile application.
- The `screens` folder, which contains all the screen components used in the application.
- The `icons` folder, which comprises all iconography used throughout the application.
- The `constants` folder, which contains the constant values used throughout our application.
- The `context` folder, which contains the react native context values and functionaily for our application. 
- The `hooks` folder, which contains javascript functions which are used throughout our application. 
- The `types` folder, which contains the typescript types required throughout our application. 
- The `MainContainer.tsx` file, which manages the application's navigation, importing all screen components and integrating them to facilitate navigation.

# Important Details Concerning Project Structure

The `tailwind.config.js` file houses paths that employ NativeWind for styling. When creating an additional directory containing files that use NativeWind for styling, ensure to append the new path in this file.

# Technologies

The XOneFi Android application is built utilizing React Native, Expo, NativeWind CSS, and React Navigation.

- NativeWind CSS - NativeWind, an implementation of Tailwind for React Native, provides the styling for this mobile application. Visit the [NativeWind](https://www.nativewind.dev/) website for more information.

- React Navigation - React Navigation facilitates the mobile application's navigation. More about [React Navigation](https://reactnavigation.org/) can be found on their official website.

- The navigation strategy combines Stack and BottomTabNavigation. [BottomTabNavigation](https://reactnavigation.org/docs/bottom-tab-navigator/) controls the Bottom Navigation Buttons. At the same time, the [Stack Navigator](https://reactnavigation.org/docs/stack-navigator/#api-definition) is employed when the application navigates from one screen to another, which is not one of the main home screens, upon pressing a button on a specific screen. Documentation on [how to use the two navigators in conjunction](https://reactnavigation.org/docs/nesting-navigators/) is available.

# Source Directory `src`

**`MainContainer.tsx`**
This file dictates whether to display the Login Screen. If the key state variable in the UserContext is an empty string (""), the login screen appears; otherwise, the application will proceed. This file also manages the application's navigation.

# Components

Below is a brief overview of several critical components within the `Components` folder.

**`Asset.jsx`**\
This componentdDisplays the various crypto assets found under the **Wallet** page.

The component takes in the following props:

- **AssetName** : The name of the crypto asset.
- **AssetAmount** : The amount of the crypto asset the user posseses.
- **AssetLogo** : The logo of the crypto asset.
- **AssetPrice** : The current price of the crypto asset.
- **AssetChange** : The 24 hour percent change in the crypto asset.

**`BigBlueButton.tsx`**\
This component is used to display the rectangular dark blue buttons found throughout the application.

The component takes in the following props :

- **text** : The text to display on the button
- **onPressFunction** : The function to call once the button has been pressed.

**`BlurModal.tsx`**\
This component provides blur mode.

**`GreyBackgroundBar.jsx`**\
This component is used to display the grey layout bars found throughout the application.

The component takes in the following props :

- \*\*RightSideComponent : Component to display on the right side of the bar
- **LeftText** : text to display on the left side of the bar

**`GreyBackgroundBox.jsx`**\
This component is used to display the rectangualar grey boxes found throughout the application.
The main purpose of this application is to help standardize the styling found throughout the applicaiton.

The component takes in the following props :

- **titleText** : The text to show at the top of the box
- **children** : The components to display inside the box

**`GreyButton.jsx`**\
This component is used to display the grey buttons found throughout the application.

The component takes in the following props :

- **imageSource** : The source of the image to display for the button
- **textInput** : The text to display for the button
- **onPressFunction** : The function to run when the button is pressed

**`GreyTextInputBar.jsx`**\
This component is used to display the grey text inputs found throughout the application.

The component takes in the following props :

- **placeholder_text** : The default text to show on the input bar
- **state_function** : The function that is used to change a state variable.

**`OneFiAsset.jsx`**\ 
This component is used to display a user's onefi balance. 

**`PageHeader.tsx`**\
This component displays the header shown throughout the application.

**`PrimaryBtn.tsx`**\
This component displays the blue buttons found throughout the application. The BigBlueButton component is built using this component. 

**`Provider.jsx`**\
This component is used to display the avaialbe providers on the ProviderScreen. When pressed, the component navigates the user to the ProviderDetails screen for the appropriate provider. 

**`ViewButton.jsx`**\
This component is used to display the View Buuttons found throughout the application.

The component takes in the following props :

- **OnPressFunction** : The function to call when the button is pressed

**`WithMainBg.tsx`**\
This is the component responsible for the background Image displayed throughout the application

For more details about these components, please refer to the comments in the respective component files.

# Screens

The `screens` folder contains the various screens used in the application. Each screen serves a specific purpose and houses particular features.

**`LinkedAccountScreen.js`**\
This screen is handles various functionalities regarding the Users Account.
On this screen the user can view information regarding their acount, logout of their account, and view their payment card.

**`AccountInformationScreen.js`**\
This screen displays various information regarding a user's account.

**`InitialLogInScreen.jsx`**\
This screen is the login screen for the application. The application currently uses web3Auth to handle user onboarding.

**`ConnectScreen.tsx`**\
This screen is where users can go to connect to XOneFi Providers.

**`WalletScreen.js`**\
This screen allows users to view the various cryptocurrencies which they own.

**`PayAndConnect.tsx`**\
This screen handles the functionality of allowing the user to either connect or disconnect from an XOneFi Provider

**`ConnectStatusScreen.tsx`**\
This screen offers connection status.

**`ProviderScreen`**\
This Screen displays all the avaialble Providers in the area

**`ProviderDetailScreen`**\
This screen displays information regarding a speficic provider. This screen also allows the configuration of a Provider. The user is routed to this page after clicking on an avaialble provider on the ProviderScreen. 

# icons

The `icons` folder contains a multitude of icons used throughout the application. Many of these icons are SVG assets generated using Figma's SVG to JSX plugin.

**`sign_in_icon.jsx`**\
This folder contains the svg assets used to display the various social media logos on the initial sign in page.

**`crypto_icon.tsx`**\
This folder contains the svg assets for the various cryptocurrency logos found throughout the XOneFi application.

# constants

This folder contains the constant values utilized across the XOneFi application.

**`colors.ts`**\
This file standardizes the colors that are used throughout the XOneFi application.

**`globalStyle.ts`**\
This file contains the global styles that are used throughout the XOneFi application.

# hooks
This folder contains the custom hooks found within the XOneFi application.

**`GetConnectedSSID.js`**\

**`GetLinkSpeed.js`**\

**`getOnefiRouter.tsx`**\

**`is_onefi_ssid.tsx`**\

**`isClientConnectedToXOneFi`**\

**`LoginWithWeb3Auth.js`**\

**`useAsync.tsx`**\

## 👨‍⚖️📃 Legal
Xmesh - Xmesh is a blockchain technology provider
Copyright (C) 2023 Benjamin Yan

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
