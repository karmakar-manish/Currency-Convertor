/* 

https://2024-03-06.currency-api.pages.dev/v1/currencies/inr.json
*/

const baseUrl = "https://2024-03-06.currency-api.pages.dev/v1/currencies/"

//selecting all the elements of the select
const dropdowns = document.querySelectorAll(".dropdown select");     

//give the exchange rate on first time opening the page
window.addEventListener("load", ()=>{
    updataExchangeRate();
})

//putting all the country codes in the dropdown options


for(let select of dropdowns)
{
    for(currCode in countryList)
    {
        let newOption = document.createElement("option")    //creating a new html element -> option
        //changing the value of option based on the country codes from the countryList
        newOption.innerText = currCode;
        newOption.value = currCode;

        //setting the default value
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }

        //appending all the country codes in the option field
        select.append(newOption)
    }


    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target); //target means where the change has occured
    })
}

//function to update flag
function updateFlag(element){
    //if the option is changed, we will get the entire element
    // console.log(element);

    let currencyCode = element.value;
    console.log(currencyCode);

    //get the country code based on the currency code
    let countryCode = countryList[currencyCode];
    console.log(countryCode);

    //getting the new country image from the link
    let newCountryImg = `https://flagsapi.com/${countryCode}/flat/64.png`

    //now change the country image
    let img = element.parentElement.querySelector("img")
    img.src = newCountryImg
}

//now get the exchange rate
const btn = document.querySelector("button")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")


btn.addEventListener("click",  (evt)=>{
    evt.preventDefault();   //dont let the form do default action
    updataExchangeRate(evt)
})

const updataExchangeRate = async(evt)=>{

    let amount = document.querySelector("form input")
    let amountVal = amount.value;

    console.log("Amount : ", amountVal);

    if(amountVal < 1)
    {
        amount.value = "1"
        amountVal = 1;
    }

    console.log("from curr val : ", fromCurr.value);
    console.log("to curr val : ", toCurr.value);
    //https://2024-03-06.currency-api.pages.dev/v1/currencies/usd.json
    const URL = `${baseUrl}/${fromCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    let data = await response.json();
    console.log(data);  

    const fromCurrency = fromCurr.value.toLowerCase();
    const toCurrency = toCurr.value.toLowerCase();

    let exchangeRate = data[fromCurrency][toCurrency];
    exchangeRate = parseFloat(exchangeRate).toFixed(2);
    console.log(exchangeRate);

    // let rate = data[toCurr.value.toLowerCase()] //getting the exchange rate

    let finalAmount = amountVal * exchangeRate;

    //printing the message
    document.querySelector(".msg").innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`

}