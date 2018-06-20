require("./config");
const express       = require("express");
const bodyParser    = require("body-parser");
const { ObjectID }  = require("mongodb");
const _             = require("lodash");

const { mongoose }  = require("./db/db");
const { User }      = require("./models/user");


// SETTINGS
const app = express();
app.use(bodyParser.json())



// ROUTES
app.post("/auth", (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);
    
    user.save().then(
        () => user.generateAuthToken()
    ).then(
        token => {res.header('x-auth', token).send(user);}
    ).catch(e => res.status(400).send(e));
});



// LISTEN
app.listen(process.env.PORT, process.env.IP, () => console.log("server run"));


// EXPORT FOR TEST
module.exports = {app};