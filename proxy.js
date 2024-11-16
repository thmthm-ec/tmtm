const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/api/rates', async (req, res) => {
    try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD?apikey=5cc63013abfcd5b317b8a4de');
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
