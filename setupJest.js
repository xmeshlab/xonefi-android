//import Web3 from "web3";

//we just directly override the global.fetch function, which is what our app leverages to make remote requests.
global.fetch = require("jest-fetch-mock");

//Mocking AsyncStorge
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock("react-native-device-info", () =>({
    getDeviceId: jest.fn().mockReturnValueOnce("1"),
}))

//mock the clipboard module
jest.mock('@react-native-clipboard/clipboard', () =>({
    setString: jest.fn(),
}));

//mock web3
/*jest.mock("web3");
Web3.mockImplementation((input)=>{
    return{

    }
})*/
/*jest.mock("web3", () =>({
    Web3: jest.fn().mockImplementation((input)=>{})
}));*/