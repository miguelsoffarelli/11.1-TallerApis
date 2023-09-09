const currency1 = document.querySelector(".from select");
const currency2 = document.querySelector(".to select");
const btn = document.querySelector("form button");
const exIcon = document.querySelector("form .reverse");
const amount = document.querySelector("form input");
const conversion = document.querySelector("form .result");


[currency1, currency2].forEach((select, i) => {
    for (let curCode in Country_List) {
        const selected = (i === 0 && curCode === "UYU") || (i === 1 && curCode === "USD") ? "selected" : "";
        select.insertAdjacentHTML("beforeend", `<option value="${curCode}" ${selected}>${curCode}</option>`);
    }
    select.addEventListener("change", () => {
        const code = select.value;
        const imgTag = select.parentElement.querySelector("img");
        imgTag.src = `https://flagcdn.com/48x36/${Country_List[code].toLowerCase()}.png`;
    });
});

async function getExchangeRate(){
    const amountValue = amount.value || 1;
    conversion.innerText = "Buscando tasa de cambio...";
    try{
        const response = await fetch(`https://v6.exchangerate-api.com/v6/445de39cdf1d2d575d767200/latest/${currency1.value}`);
        const result = await response.json();
        const exchangeRate = result.conversion_rates[currency2.value];
        const totalExchangeRate = (amountValue * exchangeRate).toFixed(2);
        conversion.innerText = `${amountValue} ${currency1.value} = ${totalExchangeRate} ${currency2.value}`;
    }catch (error){
        conversion.innerText = "Algo salió mal...";
    }
}

window.addEventListener("load", getExchangeRate);

btn.addEventListener('click', (e) => {
    e.preventDefault();
    getExchangeRate();
});

exIcon.addEventListener('click', () => {
    [currency1.value, currency2.value] = [currency2.value, currency1.value];
    [currency1, currency2].forEach((select) => {
        const code = select.value;
        const imgTag = select.parentElement.querySelector("img");
        imgTag.src = `https://flagcdn.com/48x36/${Country_List[code].toLowerCase()}.png`;
    });
    getExchangeRate();
});
