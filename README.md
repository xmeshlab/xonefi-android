# xonefi-mobile

This is the Mobile App for XOneFi

# How to Run

To run this program first clone the repository and run npm install.
Then use the terminal to run expo start. This will start an expo app for the mobile app.

# Project Structure

App.js is the main starting point of the application. It renders a component called <MainContainer/>. The code for this component can be found in the Navigation folder

The assets folder contains all of the images and other assets used in the program. For example the image for the splash screen is in this folder.

The Navigation folder contains the vast majority of the code for the application. It may have to be renamed since it now contains code that is unrelated to navigation as well

----- Inside the Navigation folder -----

The Components Folder contains the Components utalized in this mobile application.
The screens folder contains all the screens that are used in this application.
The icons folder contains all the icons used for the Bottom Tab Navigator
The MainContainer.js has most of the Navigation code. It imports all of the screens and puts them together to handle the navigation. This is where the BottomTabNavigator and the various stack navigators are put together.

# Important Details Concerning Project Structure

The tailwind.config.js file contains all the paths which utalize NativeWind for styling. If an additional directory is created which contains files that utalize NativeWind for styling, the new path must be appended in this file.

notes.txt is just a file that I have been using to keep notes. Most of the time if I run into a bug I will write down how I was able to resolve the bug and links containing useful information for fixing the bug. This usually helps me develop faster because I am able to not spend time debugging bugs which I have already encountered. This file may be ignored.

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
