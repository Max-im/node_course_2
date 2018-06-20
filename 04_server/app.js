var express     = require("express");
var bodyParser  = require("body-parser");
var fs          = require("fs");
var app         = express();

// Middlewares
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.use((req, res, next) => {
    var log = `${new Date().toString()}: ${req.method} ${req.url} \n`
    fs.appendFile("server.log", log, err => err ? console.log("log error") : '');
    next();
});


// Routes
app.get("/", (req, res) => {
    res.render("home", {title: "HomePage"});
});

app.get("/about", (req, res) => {
    res.render("about", {title: "AboutPage"});
});


// Listen 
app.listen(process.env.PORT, process.env.IP, ()=> console.log("server run"));