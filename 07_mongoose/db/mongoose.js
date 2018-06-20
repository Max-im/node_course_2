const mongoose = require("mongoose");
const { envSetup }  = require("../config");

envSetup();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL);

module.exports = { mongoose }