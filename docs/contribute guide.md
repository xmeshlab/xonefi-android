# XOneFi App Contribute Guide

## Provider Desktop App Configuration using Raspberry Pi version 4

- 1.  Install Raspberry Pi OS
- 2.  Install RaspAP and reboot
- 3.  Install npm and Node.js
- 4.  In the root directory of OneFi repo run: `npm install`
- 5.  In the app directory of OneFi repo run: `npm install`
- 6.  In the api directory of OneFi repo run: `npm install`
- 7.  In the app directory of OneFi repo run: `npm start`
- 8.  In the OneFi window, click the Account tab and import the Hotspot account from documentation/notes-delme.txt Encrypt the account using the following password: seitlab123

## App development prerequisites

- 1. Install npm and Node.js
- 2. install android studio and development SDK
- 3. clone the source project and run npm
- 4. Recommended to use Webstorm to develop this application， you can also use VsCode

## Run App

- `cd project directory` and run `npm install` or `npm ci` to install all javascript dependencies
- run `npm run android`

## Debugging

### DeBugging React Native code

#### Accessing the In-App Developer Menu

You can access the developer menu by shaking your device or by selecting "Shake Gesture" inside the Hardware menu in the iOS Simulator. You can also use the ⌘D keyboard shortcut when your app is running in the iOS Simulator, or ⌘M when running in an Android emulator on macOS and Ctrl+M on Windows and Linux. Alternatively for Android, you can run the command adb shell input keyevent 82 to open the dev menu (82 being the Menu key code).

#### Enabling Fast Refresh

Fast Refresh is a React Native feature that allows you to get near-instant feedback for changes in your React components. While debugging, it can help to have Fast Refresh enabled. Fast Refresh is enabled by default, and you can toggle "Enable Fast Refresh" in the React Native developer menu. When enabled, most of your edits should be visible within a second or two.

#### Chrome Developer Tools

To debug the JavaScript code in Chrome, select "Debug JS Remotely" from the Developer Menu. This will open a new tab at http://localhost:8081/debugger-ui.

Select Tools → Developer Tools from the Chrome Menu to open the Developer Tools. You may also access the DevTools using keyboard shortcuts (⌘⌥I on macOS, Ctrl Shift I on Windows). You may also want to enable Pause On Caught Exceptions for a better debugging experience.

#### Facebook Flipper

Flipper is a platform for debugging iOS, Android and React Native apps. Visualize, inspect, and control your apps from a simple desktop interface. Use Flipper as is or extend it using the plugin API.https://fbflipper.com/,
https://fbflipper.com/docs/features/react-native/

### Debugging Android Native Code

- 1. In android studio, open the android directory
- 1. Click the debug button

### Remote Debugging Desktop Provider Daemon

- 1. Use VNC or SSH to connect your Raspberry Pi
- 2. `cd ${destopAppProjectDirectory}provider-daemon/`
- 3. Kill the provider daemon process
- 4. run

```bash
  node --insepect provider.js 'seitlab123!@'
```

- 5. run `ssh -L 9221:localhost:9229 pi@${your Raspberry Pi IP}` https://nodejs.org/en/docs/guides/debugging-getting-started/#enabling-remote-debugging-scenarios
- 5. Use Webstorm to open the desktop app project and open the provider-daemon/provider.js
- 6. click the debug menu and then click the Edit Configurations menu item ![img.png](docs/img.png)
- 7. In the popup dialog add the "+" button. and chose 'Attach to Nodejs/Chrome' ![WechatIMG41.png](docs/WechatIMG41.png)
- 8. click 'ok'
- 9. click 'debug' button now you can debugging the provider daemon from remote. ![img.png](docs/WechatIMG42.png)

### Build Android Apk local

- 1. Run

```bash
  eas build --profile production --platform android --local

  # will create a  `.aab` bundle
```

- 2. Run

```bash
java -jar ./buildetool.jar build-apks --mode=universal --bundle=./${the aab bundle your build}.aab --output=./apk.apks
```

- 3. Unzip this apks file

     ![img.png](docs/img_1.png)
