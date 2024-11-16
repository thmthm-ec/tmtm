document.addEventListener("DOMContentLoaded", () => {
    let rates = {};

    async function fetchRates() {
        const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD?apikey=5cc63013abfcd5b317b8a4de';
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            rates = data.rates;

            // Update DZD rates
            document.getElementById("dzd-buy").textContent = data.rates.DZD.toFixed(2);
            document.getElementById("dzd-sell").textContent = (data.rates.DZD * 0.98).toFixed(2);
            document.getElementById("dzd-last-update").textContent = `Last update: ${new Date().toLocaleString()}`;

            // Update VND rates
            document.getElementById("vnd-buy").textContent = data.rates.VND.toFixed(2);
            document.getElementById("vnd-sell").textContent = (data.rates.VND * 0.98).toFixed(2);
            document.getElementById("vnd-last-update").textContent = `Last update: ${new Date().toLocaleString()}`;
        } catch (error) {
            console.error("Failed to fetch exchange rates:", error);
            alert("Could not load exchange rates. Please try again later.");
        }
    }

    // Calculator functionality
    document.getElementById("calculate-btn").addEventListener("click", () => {
        const amount = parseFloat(document.getElementById("amount").value);
        const fromCurrency = document.getElementById("from-currency").value;
        const toCurrency = document.getElementById("to-currency").value;
        
        if (isNaN(amount)) {
            alert("Please enter a valid amount");
            return;
        }

        let result;
        if (fromCurrency === "USD") {
            result = amount * rates[toCurrency];
        } else if (toCurrency === "USD") {
            result = amount / rates[fromCurrency];
        } else {
            const toUSD = amount / rates[fromCurrency];
            result = toUSD * rates[toCurrency];
        }

        document.getElementById("conversion-result").textContent = 
            `${amount.toFixed(2)} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
    });

    // Contact form handling
    document.getElementById("contact-form").addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Message sent successfully! We'll get back to you soon.");
        e.target.reset();
    });

    // Initial fetch and interval for refreshing every 60 seconds
    fetchRates();
    setInterval(fetchRates, 60000);
});
