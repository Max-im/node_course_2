const chai = require('chai');
const expect = chai.expect;
const {Users} = require("./users.js");


describe("Users block", () => {
    var users;
    
    beforeEach(() => {
        users = new Users();
        users.users = [
            { id: "1", name: "Max", room: "roomer"},
            { id: "2", name: "Bob", room: "react"},
            { id: "3", name: "Lee", room: "node"}
        ];    
    });
    
    
   it("should add a new user", () => {
        const users = new Users();
        const user = {id: "1q2w3e", name: "Max", room: "roomer"};
        const response = users.addUser(user.id, user.name, user.room);
        expect(users.users).to.deep.equal([user]);
   });
   
   it("should return names of node room", () => {
        const usersList = users.getUserList("node");
        expect(usersList).to.deep.equal(["Lee"]);
   });
   
   
   it("should return names of react room", () => {
        const usersList = users.getUserList("react");
        expect(usersList).to.deep.equal(["Bob"]);
   });
   
   
   it("should remove the user", () => {
        const usersList = users.removeUser("2");
        expect(usersList).to.deep.equal([
            { id: "1", name: "Max", room: "roomer"},
            { id: "3", name: "Lee", room: "node"}
        ]);
   });
   
   it("should not remove the user", () => {
        const usersList = users.removeUser("4");
        expect(usersList).to.deep.equal([
            { id: "1", name: "Max", room: "roomer"},
            { id: "2", name: "Bob", room: "react"},
            { id: "3", name: "Lee", room: "node"}
        ]);
   });
   
   
   it("should find the user", () => {
        const usersList = users.getUser("2");
        expect(usersList).to.deep.equal([
            { id: "2", name: "Bob", room: "react"}
        ]);
   });
   
   it("should not find the user", () => {
        const usersList = users.getUser("4");
        expect( ).to.deep.equal([]);
   });
   
   
});