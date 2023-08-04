import { tableVis } from '../js/visibility.js';

let walletBalance = new Array;
let tokenAdr = new Array;
let rowCount = null;
let row = null;
let rowID = null;
let network = "0x38"; //Default BSC network

//Crating a dinamic table
function addRow(balance) {
    let table = null;
    table = document.getElementById("WalletTable");
    rowCount = balance.length;
    //delete tr part of table preventing duplacating
    $('#WalletTable tr').remove();
    //Read data from browser storage.
    let hidden = localStorage.getItem('cAdr');
    let empty = null;
    //Check if get any data.
    if (hidden == null) {
        empty = true;
    } else {
        empty = false;
    }
    //Based on the data we make a table.
    switch (empty) {
        case true:
            for (let i = 0; i < rowCount; i++) {
                row = table.insertRow(table.rows.length);
                row.insertCell(0).innerHTML = `<button id="${i}" class="btn_hide btn_delete" type="button"> Hide</button>`;
                row.insertCell(1).innerHTML = balance[i]["name"];
                row.insertCell(2).innerHTML = numberFormat(balance[i]['balance'], balance[i]['decimals']);
                row.insertCell(3).innerHTML = balance[i]["symbol"];
                row.insertCell(4).innerHTML = balance[i]["token_address"];
                row.insertCell(5).innerHTML = "";
                row.insertCell(6).innerHTML = `<button class="btn_value" type="button">Get Value</button>`;

                tokenAdr[i] = balance[i]["token_address"];
                if (network == "bsc") {
                    row.insertCell(7).innerHTML = `<a href="https://bscscan.com/token/${tokenAdr[i]}" target="_blank"><img src="../assets/BscScan_logo.png" alt="BSC Link" style="width:32px;height:32px;"></a>`;
                }
                else if (network == "eth") {
                    row.insertCell(7).innerHTML = `<a href="https://etherscan.io/token/${tokenAdr[i]}" target="_blank"><img src="../assets/eth_logo.png" alt="BSC Link" style="width:32px;height:32px;"></a>`;
                }
                else if (network == "matic") {
                    row.insertCell(7).innerHTML = `<a href="https://polygonscan.com/token/${tokenAdr[i]}" target="_blank"><img src="../assets/poly_logo.png" alt="Matic Link" style="width:32px;height:32px;"></a>`;
                }
            }
            document.getElementById('wTable_header').style.boxShadow = '0px 10px 10px black';
            break;
        case false:

            for (let i = 0; i < rowCount; i++) {
                if (hidden.includes(balance[i]["token_address"])) {
                } else {
                    //console.log(number);
                    row = table.insertRow(table.rows.length);
                    row.insertCell(0).innerHTML = `<button id="${i}" class="btn_hide btn_delete" type="button">Hide</button>`;
                    row.insertCell(1).innerHTML = balance[i]["name"];
                    row.insertCell(2).innerHTML = numberFormat(balance[i]['balance'], balance[i]['decimals']);
                    row.insertCell(3).innerHTML = balance[i]["symbol"];
                    row.insertCell(4).innerHTML = balance[i]["token_address"];
                    row.insertCell(5).innerHTML = "";
                    row.insertCell(6).innerHTML = `<button class="btn_value" type="button">Get Value</button>`;

                    tokenAdr[i] = balance[i]["token_address"];
                    if (network == "bsc") {
                        row.insertCell(7).innerHTML = `<a href="https://bscscan.com/token/${tokenAdr[i]}" target="_blank"><img src="../assets/BscScan_logo.png" alt="BSC Link" style="width:32px;height:32px;"></a>`;
                    }
                    else if (network == "eth") {
                        row.insertCell(7).innerHTML = `<a href="https://etherscan.io/token/${tokenAdr[i]}" target="_blank"><img src="../assets/eth_logo.png" alt="BSC Link" style="width:32px;height:32px;"></a>`;
                    }
                    else if (network == "matic") {
                        row.insertCell(7).innerHTML = `<a href="https://polygonscan.com/token/${tokenAdr[i]}" target="_blank"><img src="../assets/poly_logo.png" alt="Matic Link" style="width:32px;height:32px;"></a>`;
                    }
                }
            }
            document.getElementById('wTable_header').style.boxShadow = '0px 5px 5px black';
            break;
    }
    hidden = null;
}

//Show balance in readable format
function numberFormat(balance, decimals) {
    if (balance.length <= decimals) {
        return Number(Moralis.Units.FromWei(balance,decimals));

    } else {
        return Number(Moralis.Units.FromWei(balance,decimals)).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

//Call the wallet's cryptos and call the table make method.
export async function getBalance(wAddress) {
    console.log(wAddress);
    walletBalance = await Moralis.Web3API.account.getTokenBalances({
        chain: network,
        address: wAddress
    });
    console.log(walletBalance);
    addRow(walletBalance);
    tableVis();
}

//Delte table rows  || Get cryptos' value  ||  Delete hidden list's rows
$(document).ready(function ($) {
    $(document).on('click', '.btn_delete', function () {
        let rowID = event.target;
        let hide = new Array;
        $(this).closest('tr').remove();
        let helper = localStorage.getItem('cAdr');
        if (helper == null) {
            hide.push(tokenAdr[rowID['id']]);
            localStorage.setItem("cAdr", hide);
        } else {
            hide = helper.split(',');
            hide.push(tokenAdr[rowID['id']]);
            localStorage.clear();
            localStorage.setItem("cAdr", hide);
        }

    })
    //Call method to get crypto's value
    $(document).on('click', '.btn_value', function () {
        rowID = $(this).closest('tr');
        getPrice(rowID.find('td:eq(4)').text(), rowID.find('td:eq(2)').text().replaceAll(',', ''));
    })

    //Delete gidden list's rows
    $(document).on('click', '.btn_unhide', function () {
        rowID = $(this).closest('tr');
        unhide(rowID.find('td:eq(2)').text());
    })

})
//Get crypto's value and show it.
async function getPrice(cAdr, tokenBalance) {
    try {
        let price = await Moralis.Web3API.token.getTokenPrice({
            chain: network,
            address: cAdr
        });
        console.log(price);
        rowID.find('td:eq(5)').text((tokenBalance * price['usdPrice']).toFixed(2) + "$");
    } catch (err) {
        console.log(err);
    }
}

//Set blockchain network
export function setNetwork(chains) {
    network = chains;
}

//Hidden tokens listing
export function listHidden() {
    let helper = localStorage.getItem("cAdr");
    let hidden = new Array;
    let table = null;
    if (helper == null) {
        alert("You didn't hide anything yet.");
    } else {
        tableVis();
        $('#WalletTable tr').remove();
        hidden = helper.split(',');
        table = document.getElementById("WalletTable");
        for (let i = 0; i < walletBalance.length; i++) {
            if (hidden.includes(walletBalance[i]["token_address"])) {
                row = table.insertRow(table.rows.length);
                row.insertCell(0).innerHTML = `<button id="${i}" class="btn_unhide btn_delete" type="button">Unhide</button>`;
                row.insertCell(1).innerHTML = walletBalance[i]['name'];
                row.insertCell(2).innerHTML = walletBalance[i]['token_address'];
            }
        }
        hidden = null;
        helper = null;
    }
}

//Delete the individual tokens from the hidden list
function unhide(cAdr) {
    let helper = localStorage.getItem("cAdr");
    let hidden = new Array;
    hidden = helper.split(',');

    for (let i = 0; i < hidden.length; i++) {
        if (hidden[i] == cAdr) {
            delete hidden[i];
        }
    }
    localStorage.clear();
    localStorage.setItem('cAdr', hidden);
    helper = null;
    hidden = null;
} 