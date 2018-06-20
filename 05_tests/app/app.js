const express = require("express");
const app = express();

app.get("/", (req, res) => {
   res.send("hello world");
});


app.get("/notFound", (req, res) => {
   res.status(404).send({
       error: "Page not found",
       name: "Mail admin"
   });
});


app.get("/users", (req, res) => {
    res.send([
        {name: "Max", age: 32},
        {name: "Bob", age: 25},
        {name: "Joe", age: 41}
    ]);
})

app.listen(process.env.PORT, process.env.IP, () => console.log("server is runing"));


module.exports.app = app;