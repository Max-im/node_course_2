const chai = require('chai');
const expect = chai.expect;
const {isItString} = require("./validations.js");

describe("Validations block", () => {
   it("should reject non-string values", () => {
       expect(isItString(444)).to.equal(false);
   });
   
   it("should reject string with only spaces", () => {
       expect(isItString("   ")).to.equal(false);
   });
   
   it("should allow string with non-space characters", () => {
       expect(isItString("test")).to.equal(true);
   });
});