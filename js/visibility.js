//Sing in and out buttons shown or hidden.
export function login_btn() {
    document.getElementById("btn_meta").style.visibility = "hidden";
    document.getElementById("btn_walletc").style.visibility = "hidden";
    document.getElementById("btn_logout").style.visibility = "visible";
}
export function logout_btn() {
    document.getElementById("btn_meta").style.visibility = "visible";
    document.getElementById("btn_walletc").style.visibility = "visible";
    document.getElementById("btn_logout").style.visibility = "hidden";
}

//Shows the table.
export function tableVis() {
    document.getElementById("Balance_Table").style.visibility = "visible";
}

//Shows the logged in wallet's address.
export function setMywallet(user) {
    document.getElementById("myWallet").innerHTML = user[0];
    document.getElementById('myWallet').style.visibility = 'visible';
}



//Shows the chosen network.
export function changeDropdown(network) {
    let helper = document.getElementById("btn_drop");
    
    switch (network) {
        case "bsc":
            helper.firstChild.data= "network: bsc";
            console.log("bsc");
            break;
        case "eth":
            helper.firstChild.data= "network: eth";
            console.log("eth");
            break;
        case "matic":
            helper.firstChild.data = "network: matic";
            console.log("matic");
            break;
        default:
            helper.value = "network: bsc";
            break;

    }



}