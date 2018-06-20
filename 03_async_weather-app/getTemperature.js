const fetch     = require('node-fetch');

// key : '0fdd6a96e9870fc5cff15ad176d3696e',

function getTemperature(data) {

return fetch(`https://api.darksky.net/forecast/0fdd6a96e9870fc5cff15ad176d3696e/${data.lat},${data.lng}`)
  .then(res => res.text())
  .then(body => JSON.parse(body).currently.temperature)
  .catch(err => console.log(err.message));
}

module.exports.getTemperature = getTemperature;