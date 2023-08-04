import { login_btn, logout_btn, setMywallet } from '../js/visibility.js';

/* Connecting to the backend server. */
const serverUrl = "Your server IP with port number.";
const appId = "Your app ID.";
Moralis.start({ serverUrl, appId});

let user = null;
let loggedUser = null;

/*Metamask login v2*/
export async function metaLogin() {
  await Moralis.enableWeb3({
    throwOnError: true,
    provider: "metamask",
});

const { account, chainId } = Moralis;


if (!account) {
    throw new Error("Connecting to chain failed, as no connected account was found");
}
if (!chainId) {
    throw new Error("Connecting to chain failed, as no connected chain was found");
}

const { message } = await Moralis.Cloud.run("requestMessage", {
    address: account,
    chain: parseInt(chainId, 16),
    network: "evm",
    signingMessage: "Opulent, the wallet checker."
});

user = await Moralis.authenticate({
    signingMessage: message,
    throwOnError: true,
}).then((user) => {
    afterLogin(user);
    loggedUser = user['attributes']['accounts'];
    console.log(user['attributes']['accounts']);
});

}


/*Old Metamask login v1
export async function metaLogin() {
   if (!user) {
      user = await Moralis.authenticate({
        signingMessage: "Opulent, the wallet checker.",
        chain: "0x38",
      })
      .then(function (user) {
        afterLogin(user);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
*/

/* Old Walletconnect login v1
export async function walletcLogin() {
  if (!user) {
      user = await Moralis.authenticate({
        provider: "walletconnect",
        signingMessage: "Opulent, the wallet checker."
      })
      .then(function (user) {
        afterLogin(user);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
*/

/*After login this is called*/
function afterLogin(user) {
  console.log('Logged in.');
  login_btn();
  setMywallet(user['attributes']['accounts']);
}



/* Sign out*/
export async function logout() {
  try {
    await Moralis.User.logOut();
    console.log("Logged out.");
    logout_btn();
  } catch (error) {
    console.log(error);
    login_btn();
  }
}

//Get logged in wallet's address
export function getUser() {
    let helper = loggedUser[0];
    console.log(helper);
    return helper;
}