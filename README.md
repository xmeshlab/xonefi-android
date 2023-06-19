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

# Project Design

The design for this Mobile Application is based off of a Figma File provided by Professor Yan

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



# Screens 



# icons


