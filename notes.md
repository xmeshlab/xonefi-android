You have to use NativeWind now not tailwind

https://github.com/oblador/react-native-vector-icons/issues/544
- using vector icons

https://stackoverflow.com/questions/45329620/change-navigation-header-background-color
- changing header color

https://reactnavigation.org/docs/bottom-tab-navigator/
https://reactnavigation.org/docs/elements/#header 
https://reactnavigation.org/docs/headers/
- header into

https://github.com/react-navigation/react-navigation/issues/865 
- Get rid of top border

https://stackoverflow.com/questions/72798337/how-to-make-a-fetch-request-to-localhost-in-react-native-expo
- local host api errors

https://theboroer.github.io/localtunnel-www/
- local tunnel for running localhost api onweb -doesnt work but ngrok works

https://ngrok.com/docs/getting-started
- for running localhost api globally


Why do hackers use Ngrok?
Ngrok is a legitimate remote-access tool. It is regularly abused by attackers, who use its capabilities and reputation to maneuver while bypassing network protections.

https://reactnative.dev/docs/integration-with-existing-apps#test-your-integration
- apple blocks http loading


he padding of an object in Tailwind is the space that elements have inside. So if you add padding to an element, the elements within the elements get space. 

Margin is the space outside of elements. So while padding is inside (highlightet in red in the next screenshot) padding mt-8 is outside the element and simply moves it to the bottom.



Big Idea - The component in a bottom tab navigator can be a stack navigator and not just a screen. This way
You can combine BottomTab and Stack navigation

Ran into an error where I was importing the same library from two differet sources
- Just keep the latest one and the delete the other one from package.json

npx expo run:android --device
- command to run on physical device

https://stackoverflow.com/questions/54676966/push-method-in-react-hooks-usestate
- useState update value

https://stackoverflow.com/questions/53548361/react-native-touchableopacity-onpress-not-working-on-android
- import touchableOpacity from react native if you want it to work on android


https://stackoverflow.com/questions/52759220/importing-images-in-typescript-react-cannot-find-module 
- Importing images in typescript files

https://www.npmjs.com/package/react-native-svg 
- allows you to use svg files in react native

https://www.figma.com/community/plugin/749818562498396194/SVG-to-JSX 
- plugin for converting svg to jsx

https://www.youtube.com/watch?v=3WucRJ7B6h0
- Figma to Code

https://blog.logrocket.com/how-to-use-svgs-react-native-tutorial-with-examples/
-  there isn’t a built-in React Native component that can render SVGs directly
- react-native-svg provides SVG support to your React Native project on both Android and iOS platforms. 
  react-native-svg-transformer enables you to import local SVG files in your React Native project, 
  like how you would do in a Creact React App project on the web.

  https://stackoverflow.com/questions/60281224/how-to-use-svg-image-as-background-image-in-react-native
  - using SVG Background

  https://www.developerway.com/posts/react-component-as-prop-the-right-way
  - importing functions in props


- android native code
    - Used web3j in Android native development.
    - Used wifiUtils to manage Wi-Fi connections in android native(java) code. https://github.com/ThanosFisherman/WifiUtils

- build apk local
    - ```bash
        eas build --profile production --platform android --local
      ```