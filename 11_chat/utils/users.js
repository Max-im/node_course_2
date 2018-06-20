class Users {
    constructor() {
        this.users = [];
    }
    
    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user
    }
    
    removeUser (id) {
        const user = this.users.filter(user =>  user.id === id)[0];
        this.users = this.users.filter(user =>  user.id !== id);
        return user;
    }
    
    getUser (id) {
        return this.users.filter(user =>  user.id === id)[0];
    }
    
    getUserList (room) {
        const usersInRoom = this.users.filter(user =>  user.room === room);
        const namesList = usersInRoom.map(user => user.name);
        return namesList;
    }
    
}

module.exports = {Users};