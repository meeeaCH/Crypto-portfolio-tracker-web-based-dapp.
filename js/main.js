import { metaLogin, logout, walletcLogin, getUser } from '../js/log_in_out.js';
import { getBalance, setNetwork, listHidden } from '../js/maketable.js';
import { changeDropdown } from '../js/visibility.js';



/*After the page is loaded we remove the preload class-t,
 By doing this the side menu wont show up before the page is loaded in.*/
window.addEventListener("load", () => {
  document.body.classList.remove("preload");
});

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");

  document.querySelector("#btn_Nav").addEventListener("click", () => {
    nav.classList.add("nav--open");
  });
  document.querySelector(".nav__overlay").addEventListener("click", () => {
    nav.classList.remove("nav--open");
  });



  //Sign in and out buttons.
  document.querySelector("#btn_meta").addEventListener("click", () => {
    metaLogin();
  });
  document.querySelector("#btn_walletc").addEventListener("click", () => {
    walletcLogin();
  });
  document.querySelector("#btn_logout").addEventListener("click", () => {
    logout();
    location.reload();
  });

  //Hidden crypto listing
  document.querySelector("#btn_listhidden").addEventListener("click", () => {
    listHidden();
  });
  //Delete the whole hidden list
  document.querySelector("#btn_clearhidden").addEventListener("click", () => {
    let choice = confirm("This will erase everything from the hidden list. Do you want to proside?");
    if(choice){
      localStorage.clear();
    }
  });
  //Listing the logged in wallet's cryptos
  document.querySelector("#btn_balance").addEventListener("click", () => {
    getBalance(getUser());
  });
  //Listing by given address.
  document.querySelector("#btn_fieldBalance").addEventListener("click", () => {
    let helper = document.getElementById('inputWAddress').value;
    getBalance(helper);
  });


  //dropdown menu blockchain network switch.
  document.querySelector("#btn_bsc").addEventListener("click", () => {
    setNetwork("bsc");
    changeDropdown("0x38");
  });
  document.querySelector("#btn_eth").addEventListener("click", () => {
    setNetwork("EvmChain.ETHEREUM");
    changeDropdown("0x1");
  });
  document.querySelector("#btn_matic").addEventListener("click", () => {
    setNetwork("matic");
    changeDropdown("0x89");
  });


});

