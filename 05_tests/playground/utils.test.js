const expect = require('chai').expect;
const utils = require("./utils");


describe("Sync tests", () => {
    
    it('should add two nubers', () => {
        var res = utils.add(33, 11);
        
        expect(res)
            .to.equal(44)
            .to.be.a('number')
        // if(res !== 44 ) {
        //     throw new Error(`Expected 44, but got ${res}.`);
        // }
    });
    
    
    it('should square number', () => {
        var res = utils.square(11);
        expect(res)
            .to.equal(121)
            .to.be.a('number')
    });
    
    
    
    it('should set first and last names', () => {
        var user = {age: 25};
        utils.setName(user, "Tom Soier");
        expect(user)
            .to.be.a('object')
            .to.deep.include({"firstName": "Tom", "lastName": "Soier"});
    });
    
});

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ASYNC
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

describe("Async tests", () => {

    it('should async add two numbers', (done) => {
        utils.asyncAdd(4,3, (sum) => {
            expect(sum)
                .to.equal(7) 
                .to.be.a('number');
            done();
        });
    });
    
    
    
    it('should async square number', (done) => {
        utils.asyncSquare(3, (square) => {
            expect(square).to.equal(9).to.be.a("number")
            done();
        });
    });
});