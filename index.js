const express = require('express');
const fetch = require('node-fetch');
const cors = require("cors");

const port = process.env.PORT || 2020;

const app = express();
app.use(cors());

let vizDataGlobeData;
let topFiveCartographerDetails;
const mainURL = 'https://map-api-direct.foam.space/poi/filtered?swLng=-180&swLat=-90&neLng=180&neLat=90&limit=100000&offset=0&sort=oldest';
// const mainURL = 'https://jsonplaceholder.typicode.com/todos/1';
const allCartographerDetailAPI = 'https://api.blocklytics.org/foam/v0/cartographers?sort=points_on_map&key=AIzaSyAz1sT-EtRPbRlTpNAw3OHNYz463vyA-I0';

app.listen(port, function () {
  console.log("Server is running on " + port + " port");
});

async function fetchViz3Data() {
  try {
    const response = await fetch(mainURL, {
      timeout: 100000
    });
    const json = await response.text();
    return json;
  } catch (error) {
    console.log(error);
  }
}

async function fetchCartographerDetails() {
  try {
    const response = await fetch(allCartographerDetailAPI, {
      timeout: 100000
    });
    const json = await response.json();
    return json.slice(0, 5);
  } catch (error) {
    console.log(error);
  }
}

setInterval(() => {
  // console.log('Fetched new data')
  try {
    fetchViz3Data().then((allData) => {
      vizDataGlobeData = allData;
    });

    fetchCartographerDetails().then((data) => {
      topFiveCartographerDetails = data;
    });
  } catch (err) {
    reject(err)
  }
}, 1000 * 60 * 15)

app.get('/', function (req, res) {
  // console.log('data updated on server')
  res.json(vizDataGlobeData)
})

app.get('/top-cartographer-details', function (req, res) {
  // console.log('top-five-cartographer-details')
  res.json(topFiveCartographerDetails)
})