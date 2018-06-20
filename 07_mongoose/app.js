const express       = require("express");
const bodyParser    = require("body-parser");

const { mongoose }  = require("./db/mongoose");
const { Todo }      = require('./models/todo');
const { User }      = require("./models/user");

const app           = express();


// MIDDLEWARES
app.use(bodyParser.json());

// ROUTES
// todos
app.get("/todos", (req, res) => {
    Todo.find().then(
        todos => res.send({todos}),
        error => res.status(400).send(error)
    )
});


app.post("/todos", (req, res) => {
    var todo = new Todo({
       text: req.body.text
    });
    
    todo.save()
    .then(
        doc   => res.send("document saved" + doc),
        error => res.status(400).send(error)
    );
});


// users
app.post("/users", (req, res) => {
    var user = new User({ email: req.body.email });
    
    user.save()
    .then(
        newUser => res.send("user saved" + newUser),
        error   => res.status(400).send(error)
    );
});

// SERVER RUN
app.listen(process.env.PORT, process.env.IP, () => console.log("server run"));

module.exports = { app };