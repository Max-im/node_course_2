const { ObjectID } = require("mongodb");
const request  = require("supertest");
const chai      = require("chai");
const expect    = chai.expect;

const { app }   = require("../app");
const { Todo }  = require("../models/todo");
const { User }  = require("../models/user");


// save db for clean the tests
const todosArr = [];
Todo.find().then(allTodos => allTodos.forEach(item => todosArr.push(item)));

// remove all db
beforeEach((done) => {
    Todo.remove({})
        .then(
            () => done(),
            error => console.log(error)
        );
});

describe("POST", () => {
    it("should create new todo", (done) => {
        var text = "test Text";
        request(app)
            .post("/todos")
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.text).to.be.a('string');
            })
            .end((err, res) => {
                if(err) return done(err)
                Todo.find().then(todos => {
                    expect(todos.length).to.equal(1); 
                    expect(todos[0]).to.deep.include({text});
                    done();
                }).catch(e => done(e));
            });
        
    });
    
    
    it("should not create todo with invalid body data", (done) => {
        request(app)
            .post("/todos")
            .send({})
            .expect(400)
            // .expect((res) => {
            //     expect(JSON.parse(res.text).message).to.equal("Todo validation failed: text: Path `text` is required.");
            // })
            .end((err, res) => {
                if(err) return done(err)
                Todo.find().then(todos => {
                    expect(todos.length).to.equal(0); 
                    done();
                }).catch(e => done(e));
            });
    });
});



// restore db
after(function() {
    Todo.insertMany(todosArr);
});


