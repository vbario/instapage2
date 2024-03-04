console.log('Mighty Cart');
const API_ROOT = `http://localhost:5001/tap-in-7704f/us-central1`;
const getMyCartUrl = API_ROOT + `/getMyCart`;
const addToMyCartUrl = API_ROOT + `/addToMyCart`;
const JSONdata = {};


const page = document.querySelector("body");

let addToMyCart = (item) => {
    console.log('add')
    fetch(addToMyCartUrl, {
        method: 'POST',
        body: JSON.stringify({item: item})
    }).then(r => r.text()).then(result => {
        // Result now contains the response text, do what you want...
        console.log('addToMyCart result', result)
        cartText.textContent = Object.keys((JSON.parse(result) || {}).cart || {}).length
    })
}

let showBuyNow = (item) => {
    console.log('add')

    const buyNowWrapper = document.createElement("div");
    const buyNowBox = document.createElement("div");
    buyNowWrapper.classList.add("buy-now-wrapper");
    buyNowBox.classList.add("buy-now-box");
    buyNowWrapper.append(buyNowBox);
    page.append(buyNowWrapper);

    // fetch(addToMyCartUrl, {
    //     method: 'POST',
    //     body: JSON.stringify({item: item})
    // }).then(r => r.text()).then(result => {
    //     // Result now contains the response text, do what you want...
    //     console.log('addToMyCart result', result)
    //     cartText.textContent = Object.keys((JSON.parse(result) || {}).cart || {}).length
    // })
}

// let showCheckout (show) {
//     if (show) {
//         // populate the checkout screen
//         // show the checkout screen
//     } else {
//         // hide the checkout screen
//     }
// }

let found = [];

setInterval(() => {
    let elements = document.body.getElementsByTagName("*");
    let searchText = `http://localhost:8080/pay/`;
    let searchText2 = `$mybook`;
    // let searchText = `pshbl.com`;
    for (var i in elements) {
        if ((elements[i].textContent || '').toLowerCase().indexOf(searchText) > -1) {
            if (elements[i].innerHTML.includes(searchText)) {
                let index = elements[i].innerHTML.indexOf(searchText)
                let id = elements[i].innerHTML.substring(index + searchText.length, index + searchText.length + 8)
                console.log('id', id)
                // let replacement = document.createElement('a');
                // replacement .textContent = 'test';
                // elements[i].innerHTML = elements[i].innerHTML.replace(searchText + id, replacement);
                if (!elements[i].innerHTML.contains || elements[i].innerHTML.contains(searchText + id)) {
                    elements[i].innerHTML = elements[i].innerHTML.replace(searchText + id,`<a style="background-color: #38D5FF; border-radius: 4px; padding: 4px 8px; color: #fff;">Buy Now!</a>`);
                    elements[i].addEventListener("click", () => {
                        // addToMyCart(id)
                        showBuyNow(id)
                    });
                }
            }
        }
    }
    for (var i in elements) {
        if ((elements[i].textContent || '').toLowerCase().indexOf(searchText2) > -1) {
            if (elements[i].innerHTML.includes(searchText2)) {
                let index = elements[i].innerHTML.indexOf(searchText2)
                // let id = elements[i].innerHTML.substring(index + searchText2.length, index + searchText2.length)
                // let replacement = document.createElement('a');
                // replacement .textContent = 'test';
                // elements[i].innerHTML = elements[i].innerHTML.replace(searchText2 + id, replacement);
                if (!elements[i].innerHTML.contains || elements[i].innerHTML.contains(searchText2)) {
                    elements[i].innerHTML = elements[i].innerHTML.replace(searchText2,`<a style="background-color: #38D5FF; border-radius: 4px; padding: 4px 8px; color: #fff;">Buy Now!</a>`);
                    elements[i].addEventListener("click", () => {
                        // addToMyCart(id)
                        showBuyNow('id')
                    });
                }
            }
        }
    }
}, 1000)



const cartWrapper = document.createElement("div");
const cart = document.createElement("div");
const cartTextTag = document.createElement("p");
const cartText = document.createElement("p");

cartText.textContent = `0`;
cartTextTag.textContent = `Mighty Cart`;

cart.classList.add("mighty-cart");
cartWrapper.classList.add("mighty-cart-wrapper");
cartTextTag.classList.add("mighty-cart-text");
cartText.classList.add("mighty-cart-text");
cart.addEventListener("click", () => {addToMyCart('abcdefg')});

// cart.append(cartTextTag);
cart.append(cartText);
cartWrapper.append(cart);
// page.append(cartWrapper);

fetch(getMyCartUrl).then(r => r.text()).then(result => {
    // Result now contains the response text, do what you want...
    console.log('getMyCartUrl result', JSON.parse(result))
    console.log('getMyCartUrl result2', result.cart)
    console.log('---', Object.keys(result.cart || {}).length, result.cart)
    let cartSize = Object.keys(result.cart || {}).length
    cartText.textContent = Object.keys((JSON.parse(result) || {}).cart || {}).length
})






// chrome.runtime.sendMessage(
//     {
//         contentScriptQuery: "postData",
//         data: JSONdata,
//         url: ApiUrl
//     }, function (response) {
//         // debugger;
//         console.log('response', response)
//         // if (response != undefined && response != "") {
//         //     callback(response);
//         // }
//         // else {
//         //     debugger;
//         //     callback(null);
//         // }
//     });










