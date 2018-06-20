const chai = require("chai");
const spies = require('chai-spies');
const should = chai.should();
const expect = chai.expect;
const auth = require("./auth").signup;
const rewire = require("rewire");

const app = rewire("./auth");

chai.use(spies);

describe("SPIES", () => {
   var db = {
      saveUser: chai.spy()
   }
   app.__set__('db', db)
   
   it('should called SPY correctly', () => {
      const spy = chai.spy(auth);
      spy("Max", "password");
      expect(spy).to.have.been.called.with('Max', 'password');
   });
   
   
   it('should call signup with user object', () => {
      var email = 'example@gmail.com';
      var password = "password";
      app.signup(email, password);
      expect(db.saveUser).to.have.been.called.with({email, password});
   });
});