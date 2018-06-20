const express               = require("express");
const path                  = require("path");
const socketIO              = require("socket.io");
const http                  = require("http");
const bodyParser            = require("body-parser");

const app                   = express();
const server                = http.createServer(app);
const io                    = socketIO(server);
const {
    generateMessage, 
    generateLocationMessage} = require("./utils/message");
const { isItString }        = require("./utils/validations");
const { Users }             = require("./utils/users");
const users = new Users();

const state = {};

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
// app.set('views', __dirname + '/public');

io.on("connection", socket => {
    // MESSAGE
    
    // for all users
    socket.on("createMsg", (msg, callback) => {
        const user = users.getUser(socket.id);
        if(user && isItString(msg.text)) {
            io.to(user.room).emit("newMsg", generateMessage(user.name, msg.text));
            callback();
        }
    });
    
    
    // LOCATION
    socket.on("createLocationMsg", coords => {
        const user = users.getUser(socket.id);
        if(user) {
            io.to(user.room).emit("newLocationMsg", generateLocationMessage(user.name, coords.lat, coords.lon));
        }
    });
    
    
    // JOIN ROOM
    socket.on("join", (data, callback) => {
        if(!isItString(state.user) || !isItString(state.room)) {
            return callback("name and room are required");
        }
        
        socket.join(state.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, state.user, state.room);
        io.to(state.room).emit("updateUserList", users.getUserList(state.room));
        
        // only for the user
        socket.emit("newMsg", generateMessage("Admin", `Welcome, ${state.user}`));
        
        // for all users accept emiter
        socket.broadcast.to(state.room).emit("newMsg", generateMessage("Admin", state.user + " just joined"));
        
        socket.on("disconnect", ()=> {
            const user = users.removeUser(socket.id);
            if(user) {
                io.to(user.room).emit('updateUserList', users.getUserList(user.room));
                io.to(user.room).emit("newMsg", generateMessage("Admin", `${user.name} has left`));
            }
        });
        
        callback();
        
    });
    
    
});



// ROUTING
app.get("/", (req, res) => {
    res.render("index");
})

app.get("/chat", (req, res) => {
    state.user = req.query.user;
    state.room = req.query.room;
    res.render("chat", {room:req.query.room});
});



server.listen(process.env.PORT, process.env.IP, () => console.log("server run"));