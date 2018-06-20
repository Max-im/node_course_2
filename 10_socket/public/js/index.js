const socket = io();
socket.on("connect", () => {
    console.log("connected on the server");
    
    // socket.emit("createEmail", {
    //     to: "back@gmail.com",
    //     text: "lalala"
    // })
});

// socket.on("newEmail", function(email) {
//     console.log("new email", email);
// });
        
    
        
document.querySelector(".btn").addEventListener("click", () => {
    const text = document.querySelector(".text").value;
    socket.emit("createMessage", {text});
});

socket.on("newMessage", (msg) => {
    const li = document.createElement("li");
    li.innerHTML = msg.text;
    document.querySelector(".list").appendChild(li);
    document.querySelector(".text").value = "";
});