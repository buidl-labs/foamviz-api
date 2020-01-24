const express = require('express');
const fetch = require('node-fetch');
const cors = require("cors");

const port = process.env.PORT || 2020;

const app = express();
app.use(cors());

let vizDataGlobeData;
const mainURL = 'https://map-api-direct.foam.space/poi/filtered?swLng=-180&swLat=-90&neLng=180&neLat=90&limit=100000&offset=0&sort=oldest';
// const mainURL = 'https://jsonplaceholder.typicode.com/todos/1';

app.listen(port, function () {
  console.log("Server is running on " + port + " port");
});

async function fetchViz3Data() {
  // const res = await fetch(mainURL).then((res) => res.json().catch((err) => console.log('error', err)));
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

setInterval(() => {
  console.log('Fetch data for Viz 3')
  try {
    fetchViz3Data().then((allData) => {
      vizDataGlobeData = allData;
    });
  } catch (err) {
    reject(err)
  }
}, 1000 * 60)

app.get('/', function (req, res) {
  console.log('data updated on server')
  res.json(vizDataGlobeData)
})