import {
  read_default_config,
  write_default_config,
} from "../../xonefi-api-client/config";

//web3 auth code
import * as WebBrowser from "@toruslabs/react-native-web-browser";
import Web3Auth, {
  LOGIN_PROVIDER,
  OPENLOGIN_NETWORK,
} from "@web3auth/react-native-sdk";

//web3Auth Code
const scheme = "web3authrnexample"; // Or your desired app redirection scheme
const resolvedRedirectUrl = `${scheme}://openlogin`;

const clientId =
  "BHU5wO49Ul-c13pLy6HT84KINj4fcQ20W_3H7dZWj5AP3LRWIE69ZjVVWZ3B0u_TkJx8TbPK6iFeK0gzf5is5Oo";

const web3auth = new Web3Auth(WebBrowser, {
  clientId,
  network: OPENLOGIN_NETWORK.TESTNET, // or other networks
});

export const loginWithWeb3Auth = async (setKey, setUserInfo) => { 
  console.log("Loggin in with Web3Auth");
  try {
    console.log("Loggin in with Web3Auth");
    //setConsole("Logging in");
    const web3auth = new Web3Auth(WebBrowser, {
      clientId,
      network: OPENLOGIN_NETWORK.TESTNET, // or other networks
    });
    console.log("web3auth object");
    console.log(web3auth);
    const info = await web3auth.login({
      loginProvider: LOGIN_PROVIDER.GOOGLE,
      redirectUrl: resolvedRedirectUrl,
    });
    console.log("info returned from web3 Auth");
    console.log(info);

    setUserInfo(info);
    setKey(info.privKey);

    read_default_config((config_json2) => {
      config_json2.account.dpk = info.privKey;
      config_json2.account_set = true;
      let Web3 = require("web3");
      let web3 = new Web3();
      let account = web3.eth.accounts.privateKeyToAccount(info.privKey);
      config_json2.account.address = account.address;

      console.log(`info acct: ${JSON.stringify(info)}`);
      console.log(`config_json2: ${JSON.stringify(config_json2)}`);
      write_default_config(config_json2, () => {
        console.log("XLOG: Config is successfully initialized (2).");
      });
    });

    //uiConsole("Logged In");
  } catch (e) {
    console.error(e);
  }
};

export const loginWithWeb3AuthFacebook = async (setKey, setUserInfo) => {
  console.log("Loggin in with Web3Auth");
  try {
    console.log("Loggin in with Web3Auth");
    //setConsole("Logging in");
    const web3auth = new Web3Auth(WebBrowser, {
      clientId,
      network: OPENLOGIN_NETWORK.TESTNET, // or other networks
    });
    console.log("web3auth object");
    console.log(web3auth);
    const info = await web3auth.login({
      loginProvider: LOGIN_PROVIDER.FACEBOOK,
      redirectUrl: resolvedRedirectUrl,
    });
    console.log("info returned from web3 Auth");
    console.log(info);

    setUserInfo(info);
    setKey(info.privKey);
    //uiConsole("Logged In");
  } catch (e) {
    console.error(e);
  }
};

export const loginWithWeb3AuthWECHAT = async (setKey, setUserInfo) => {
  console.log("Loggin in with Web3Auth");
  try {
    console.log("Loggin in with Web3Auth");
    //setConsole("Logging in");
    const web3auth = new Web3Auth(WebBrowser, {
      clientId,
      network: OPENLOGIN_NETWORK.TESTNET, // or other networks
    });
    console.log("web3auth object");
    console.log(web3auth);
    const info = await web3auth.login({
      loginProvider: LOGIN_PROVIDER.WECHAT,
      redirectUrl: resolvedRedirectUrl,
    });
    console.log("info returned from web3 Auth");
    console.log(info);

    setUserInfo(info);
    setKey(info.privKey);
    //uiConsole("Logged In");
  } catch (e) {
    console.error(e);
  }
};

export const loginWithWeb3AuthTwitter = async (setKey, setUserInfo) => {
  console.log("Loggin in with Web3Auth");
  try {
    console.log("Loggin in with Web3Auth");
    //setConsole("Logging in");
    const web3auth = new Web3Auth(WebBrowser, {
      clientId,
      network: OPENLOGIN_NETWORK.TESTNET, // or other networks
    });
    console.log("web3auth object");
    console.log(web3auth);
    const info = await web3auth.login({
      loginProvider: LOGIN_PROVIDER.TWITTER,
      redirectUrl: resolvedRedirectUrl,
    });
    console.log("info returned from web3 Auth");
    console.log(info);

    setUserInfo(info);
    setKey(info.privKey);
    //uiConsole("Logged In");
  } catch (e) {
    console.error(e);
  }
};