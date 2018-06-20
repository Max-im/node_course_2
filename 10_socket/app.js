const express       = require("express");
const path          = require("path");
const http          = require("http");
const bodyParser    = require("body-parser");
const socketIO      = require("socket.io");

const app           = express();
const server        = http.createServer(app);
const io            = socketIO(server);


// SETTINGS
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));


// SOCKET
io.on("connection", (socket) => {
    console.log("new user connection")
    
    socket.on("disconnect", () => console.log("disconnect"));
    
    // socket.emit("newEmail", {
    //     from: "example@gmail.com",
    //     text: "lorem",
    //     createAt: "05.06.18"
    // });
    
    // socket.on("createEmail", (email) => {
    //     console.log("email", email)
    // });
    
    socket.on("createMessage", msg => {
       socket.emit("newMessage", msg);
    });
});


// ROUTES




// LISTEN
server.listen(process.env.PORT, process.env.IP, () => console.log("server run"));


// TESTING
module.exports = {app};