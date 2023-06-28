# xonefi-mobile

This is the Mobile App for XOneFi

# How to Run

To run this program first clone the repository and run yarn install.
Then use the terminal to run npm run android. This will start the mobile application.

# Project Structure

App.tsx is the main starting point of the application. It renders a component called <MainContainer/>. The code for this component can be found in the src folder

The assets folder contains all of the images and other assets used in the program. For example the image for the splash screen is in this folder.

The src folder contains the vast majority of the code for the application.

----- Inside the src folder -----

The Components Folder contains the Components utalized in this mobile application.
The screens folder contains all the screens that are used in this application.
The icons folder contains all the icons used throughout the application.
The MainContainer.tsx has most of the Navigation code. It imports all of the screens and puts them together to handle the navigation. This is where the BottomTabNavigator and the various stack navigators are put together.

# Important Details Concerning Project Structure

The tailwind.config.js file contains all the paths which utalize NativeWind for styling. If an additional directory is created which contains files that utalize NativeWind for styling, the new path must be appended in this file.


# Technologies Used

The application is built using React Native, Expo, NativeWind CSS, and React Navigation.

NativeWind CSS - NativeWind is used to style this mobile application rather than plain CSS
NativeWind is an implenetation of Tailwind for React Native
https://www.nativewind.dev/

React Navigation - React Navigation is used for the Navigation of this mobile application.
https://reactnavigation.org/
A combination of Stack and BottomTabNavigation is used. The BottomTabNavigation is used for the Bottom Navigation Buttons and the Stack Navigator is used in certain situations when a button is pressed on a particular screens where the application navigates to another screen which is not one of the main home screens.
Bottom Tab Navigator - https://reactnavigation.org/docs/bottom-tab-navigator/
Stack Navigator - https://reactnavigation.org/docs/stack-navigator/#api-definition
Documentation for using the two navigators together - https://reactnavigation.org/docs/nesting-navigators/

# src
**MainContainer.tsx**
This file handles the logic for if the Login Screen should be displayed or not. If the 
key state variable in the UserContext is an empty string (""), the login screen will be displayed, if not the
rest of the application will be displayed

This file also handles the navigation for our application. 

# Components 

**Asset.jsx**\
This component is used to display the various crypto assets shown under the Wallet page. 

The component takes in the following props : 
  AssetName : The name of the crypto asset.
  AssetAmount : The amount of the crypto asset the user posseses. 
  AssetLogo : The logo of the crypto asset. 
  AssetPrice : The current price of the crypto asset.
  AssetChange : The 24 hour percent change in the crypto asset. 

**BigBlueButton.tsx**\
This component is used to display the rectangualr dark blue buttons found throughout the application. 

The component takes in the following props : 
 text : The text to display on the button
 onPressFunction : The function to call once the button has been pressed. 

**BlurModall.tsx**\

 **GreyBackgroundBar.jsx**\
This component is used to display the grey layout bars found throughout the application.

The component takes in the following props : 
 RightSideComponent : Component to display on the right side of the bar
 LeftText : text to display on the left side of the bar

**GreyBackgroundBox.jsx**\
This component is used to display the rectangualar grey boxes found throughout the application. 
The main purpose of this application is to help standardize the styling found throughout the applicaiton. 

The component takes in the following props : 
 titleText : The text to show at the top of the box
 children : The components to display inside the box

**GreyButton.jsx**\
This component is used to display the grey buttons found throughout the application.

The component takes in the following props : 
 imageSource : The source of the image to display for the button
 textInput : The text to display for the button  
 onPressFunction : The function to run when the button is pressed

**GreyTextInputBar.jsx**\
This component is used to display the grey text inputs found throughout the application.

The component takes in the following props : 
 placeholder_text : The default text to show on the input bar
 state_function : The function that is used to change a state variable. 

**ViewButton.jsx**\
This component is used to display the View Buuttons found throughout the application.

The component takes in the following props : 
 OnPressFunction : The function to call when the button is pressed

**WithMainBg.tsx**\
This is the component responsible for the background Image displayed throughout our application



# Screens 

**LinkedAccountScreen.js**\
This screen is handles various functionalities regarding the Users Account. 
On this screen the user can view information regarding their acount, logout of their account, and view their payment card. 

**AccountInformationScreen.js**\
This screen displays various information regarding a user's account.

**InitialLogInScreen.jsx**\
This screen is the login screen for our application. The application utalizes web3Auth to handle user authentication. 

**ConnectScreen.tsx**\
This screen is where users can go to connect to XOneFi Providers.

**WalletScreen.js**\
This screen allows users to view the various cryptocurrencies which they own. 




# icons
The Icons folder contains many of the icons used through out our application. Many of these icons are svg assets generated using
Figma's SVG to JSX plugin.

**sign_in_icon.jsx**\
This folder contains the svg assets used to display the various social media logos on the initial sign in page.

**crypto_icon.tsx**\
This folder contains the svg assets for the various cryptocurrency logos found throughout the application.



# constants
This folder contains the constant values that are used throughout our application. 

**colors.ts**\
This file standardizes the colors that are used throughout our application. 

**dimension.ts**\
This file standardizes certain dimensions that are found throughout our application. For example,
the height of header is set in this file.

**globalStyle.ts**\
This file contains the global styles that are used throughout our application.


# hooks
This folder contains many of the custom hooks found within our application







