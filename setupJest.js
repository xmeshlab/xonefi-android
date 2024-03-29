//import Web3 from "web3";

const { Input } = require("postcss");

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

//    Web3: jest.fn().mockImplementation((input)=>{}),
//mock web3.eth.accounts.privateKeyToAccount(context_array[0]).address
jest.mock("web3", () =>{
    // Returns a function
    return jest.fn().mockImplementation(() => ({
        someMethod: () => {},
        eth: {
            accounts: {
                privateKeyToAccount: jest.fn().mockReturnValueOnce({
                    address: 1
                }),
            }
        }
    }))
});

/*jest.mock("@react-native-community/netinfo", ()=>{
    fetch: jest.fn().mockReturnValueOnce({
        details:{
            linkSpeed: 0
        }
    })
})*/

//jest.mock('web3');



//mock web3
/*jest.mock("web3");
Web3.mockImplementation((input)=>{
    return{

    }
})*/
/*jest.mock("web3", () =>({
    Web3: jest.fn().mockImplementation((input)=>{})
}));*/

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});
//async (setIsLoading, setWifiList) => { }
/*jest.mock("./src/hooks/getOnefiRouters", ()=>{
    return jest.fn()
})*/

/*jest.mock("react-native-wifi-reborn", () =>{
    // Returns a function
    return jest.fn().mockImplementation(() => ({
        reScanAndLoadWifiList: jest.fn().mockReturnValueOnce({})
    }))
});*/


/*jest.mock('react-native-wifi-reborn', () =>({
    WifiManager: jest.fn().mockImplementation(() => ({
        reScanAndLoadWifiList: jest.fn().mockReturnValueOnce({})
    }))
}));*/
