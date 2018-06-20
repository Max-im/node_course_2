const yargs           = require('yargs');
const geoFetch        = require('./geofetch').geofetch;
const getTemperature  = require('./getTemperature').getTemperature;

// yargs settings
const argv = yargs.options({
  a: {
    demand: true,
    alias: "address",
    describe: "Search address",
    string: true
  }
})
.help() 
.alias("help", "h")
.argv;
    
// 1   
const coord = geoFetch(argv.a)
  .then(data => getTemperature(data))
  .then(temperature => console.log(temperature))
  .catch(err => console.log(err));


// 2
// new Promise((res, rej) => geoFetch(argv.a, res, rej))
//   .then(data => getTemperature(data))
//   .catch(err => console.log(err));


// 3
// return new Promise from each function