const BASE_URL =
  "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_ecXEY529IEJQbb53LT3YmQu5f81QsNVOkJf0nuCd&";
const dropdowns = document.querySelectorAll("select");
const btn = document.querySelector("button");
let fromCurrency = "USD";
let toCurrency = "INR";

for (dropdown of dropdowns) {
  for (countries in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = countries;
    newOption.value = countries;
    if (dropdown.name === "fromLang" && countries === "USD") {
      newOption.selected = "selected";
    }
    if (dropdown.name === "toLang" && countries === "INR") {
      newOption.selected = "selected";
    }
    dropdown.append(newOption);
  }
  dropdown.addEventListener("change", (event) => {
    document.querySelector(".convertedValue").innerText = "";
    document.querySelector(".errorvalue").innerText = "";
    if (event.target.name === "fromLang") {
      updateFlag(event.target.value, 0);
      fromCurrency = event.target.value;
    } else {
      updateFlag(event.target.value, 1);
      toCurrency = event.target.value;
    }
  });
}

const updateFlag = (element, index) => {
  let countryCode = countryList[element];
  let newSource = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let flags = document.querySelectorAll("img");
  flags[index].src = newSource;
};

btn.addEventListener("click", async (event) => {
  event.preventDefault();
  let amount = document.querySelector(".Amount input").value;
  const URL = `${BASE_URL}currencies=${toCurrency}&base_currency=${fromCurrency}`;
  console.log(amount, URL);
  let response = await fetch(URL);
  console.log("qwrtt", response);
  if (response.status === 200) {
    let data = await response.json();
    let rate = data.data[toCurrency];
    console.log("abcd", response, data, rate);
    let final = rate * amount;
    document.querySelector(
      ".convertedValue"
    ).innerText = `The Coverted Value is : ${final}`;
  } else {
    document.querySelector(
      ".errorvalue"
    ).innerText = `The Covertion rate is not available right now`;
  }
});
