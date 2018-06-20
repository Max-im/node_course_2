const fetch     = require('node-fetch');

function geofetch(rawAddress) {
  const address = encodeURIComponent(rawAddress);
  return fetch(`http://maps.googleapis.com/maps/api/geocode/json?address=${address}`)
    .then(res => res.text())
    .then(body => JSON.parse(body))
    .then(obj => {
        if(!obj.results[0]) return("errorrrr");
        else return {lat:obj.results[0].geometry.location.lat, lng: obj.results[0].geometry.location.lng}
    })
    .catch(err => console.log(err.message));
}

module.exports.geofetch = geofetch;



