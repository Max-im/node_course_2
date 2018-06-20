const request = require("supertest");
const expect = require('chai').expect;
const app = require("./app").app;

describe('SUCCESS GROUP', () => {

    describe("Home page", () => {
        it('should return hello world response', (done) => {
        request(app)
            .get("/")
            .expect(200)
            .expect('hello world')
            .end(done)
        });
    });


    describe("Users page", () => {
        it('should return users array', (done) => {
            request(app)
            .get("/users")
                .expect(200)
                .expect( res => {
                    expect(res.body)
                    .to.be.a('array')
                    .to.deep.include({name: "Max", age: 32})
                    .to.deep.include({name: "Bob", age: 25})
                })
                .end(done)
        });
    });
});




describe('ERROR GROUP', () => {
    it('should return 404 error', (done) => {
   request(app)
    .get("/notFound")
        .expect(404)
        .expect( res => {
            expect(res.body)
                .to.be.a('object')
                .to.deep.include({error: "Page not found", name: "Mail admin"});
        })
        // .expect({
        //     error: "Page not found",
        //     name: "Mail admin"
        // })
        .end(done)
    });
});

