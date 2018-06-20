const fetch = require("node-fetch");
const key="ee5f5f51a112d507b9921d4b8d05eecb";

const getExchange = () => {
    return fetch(`http://data.fixer.io/api/latest?access_key=${key}`)
    .then(response => response.text())
    .then(str => JSON.parse(str))
    .catch(err => console.log("getExchange"));
}


const getCurrency = (cur) => {
    return fetch(`https://1restcountries.eu/rest/v2/currency/${cur}`)
    .then(response => response.text())
    .then(str => JSON.parse(str))
    .then(data => {
        return data.map(country => country.name)
    })
    .catch(err => console.log("getCurrency".err));
}


async function launch() {
    let a, b;
    try{
        let country;
        a = await getExchange().then(data => country=data.base);
        b = await getCurrency(country);
    }
    catch (err){
        throw new Error("err")
    }
    return b;
}


launch()
.then(data => console.log(data))
.catch(err => console.log("err"));