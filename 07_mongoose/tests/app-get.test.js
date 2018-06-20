const { ObjectID }  = require("mongodb");
const request       = require("supertest");
const chai          = require("chai");
const expect        = chai.expect;

const { app }       = require("../app");
const { Todo }      = require("../models/todo");
const { User }      = require("../models/user");


// save db for clean the tests
const todosArr = [];


// remove all db
before(done => {
    Todo.find()
        .then(
            allTodos => allTodos.forEach(item => todosArr.push(item)),
            error => console.log(error)
        )
        .then(() => 
            { Todo.remove()
                .then(
                    () => Todo.insertMany([{_id: new ObjectID(), "text":"111"},{_id: new ObjectID(), "text":"222"}]), 
                    error => console.log(error)
                )
            },
            error => console.log(error)
        )
        .then(done());
});


describe("get/todos", () => {
    it("should get all todos", (done) => {
        request(app)
            .get("/todos")
            .expect(200)
            .expect(res => {
                expect(res.body.todos.length).to.equal(2); 
            })
            .end(done)
    });
});



// restore db
after(function() {
    Todo.remove({}).then(() => Todo.insertMany(todosArr));
});