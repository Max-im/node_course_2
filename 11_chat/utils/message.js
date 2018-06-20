const moment = require("moment");

const generateMessage = (name, text) => {
    return {
        name,
        text,
        date: fromatDate()
    };
};


const generateLocationMessage = (name, lat, lon) => {
    return {
        name,
        url: `https://www.google.com/maps?q=${lat},${lon}`,
        date: fromatDate()
    };
};



function fromatDate() {
    return moment().valueOf();
}


module.exports = {generateMessage, generateLocationMessage};