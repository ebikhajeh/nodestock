const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
const axios = require('axios');

const PORT = process.env.PORT || 8080;

// Set the path to the views directory
app.set('views', path.join(__dirname, 'views'));

// Set the view engine to 'hbs'
app.set('view engine', 'hbs');

// Set the path to the layouts directory
hbs.registerPartials(path.join(__dirname, 'layouts'));

// Set the default layout
app.set('view options', { layout: 'layouts/main' });

// Define a route that fetches data from an API and renders it
app.get('/', async (req, res) => {
  try {
    // Fetch Bitcoin price from the CoinGecko API
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    const data = response.data;
    const bitcoinPrice = data.bitcoin.usd;

    // Render the view and pass the Bitcoin price to it
    res.render('home', { bitcoinPrice });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.render('error');
  }
});

// Set the static folder
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => console.log('Server is listening on port ' + PORT));
