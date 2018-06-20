const chai = require('chai');
const expect = chai.expect;
const {
    generateMessage, 
    generateLocationMessage} = require("./message");

describe("generateMessage", () => {
    it("should geneage correct message object", () => {
        const name = "fromAddress";
        const text = "textItem";
        const res = generateMessage(name, text);
        expect(res).to.own.include({name, text});
        expect(res.name).to.be.a('string');
        expect(res.text).to.be.a('string');
        expect(res.date).to.be.a('number');
    });  
});


describe("generateLocationMessage", () => {
    it("should geneage correct location message object", () => {
        const name = "fromAddress";
        const lat = 55;
        const lon = 100;
        const url = `https://www.google.com/maps?q=${lat},${lon}`
        const res = generateLocationMessage(name, lat, lon);
        expect(res).to.own.include({name, url});
        expect(res.name).to.be.a('string');
        expect(res.url).to.be.a('string').to.equal(url);
        expect(res.date).to.be.a('number');
    });  
});