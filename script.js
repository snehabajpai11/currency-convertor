document.addEventListener("DOMContentLoaded", function () {
    const amountInput = document.getElementById("amount");
    const fromCurrencySelect = document.getElementById("fromCurrency");
    const toCurrencySelect = document.getElementById("toCurrency");
    const convertButton = document.getElementById("convert");
    const resultDiv = document.getElementById("result");

    // Fetch a list of available currencies from a currency API
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
        .then((response) => response.json())
        .then((data) => {
            const currencies = Object.keys(data.rates);

            currencies.forEach((currency) => {
                const option1 = document.createElement("option");
                const option2 = document.createElement("option");
                option1.value = currency;
                option2.value = currency;
                option1.textContent = currency;
                option2.textContent = currency;
                fromCurrencySelect.appendChild(option1);
                toCurrencySelect.appendChild(option2);
            });
        });

    convertButton.addEventListener("click", () => {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        // Fetch the exchange rate from the API
        fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
            .then((response) => response.json())
            .then((data) => {
                const exchangeRate = data.rates[toCurrency];
                if (exchangeRate) {
                    const convertedAmount = (amount * exchangeRate).toFixed(2);
                    resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
                } else {
                    resultDiv.textContent = "Invalid conversion.";
                }
            });
    });
});
