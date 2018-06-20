const socket = io();

socket.on("connect", () => {
    socket.emit("join", {} , (err) => {
        if(err) {
            alert(err)
            window.location.href = '/';
        }
        else {
            console.log("Welcome")
        }
    });
});



function scrollToBottom() {
    const msgs = $(".list");
    const clientHeight = msgs.prop('clientHeight');
    const scrollTop = msgs.prop('scrollTop');
    const scrollHeight = msgs.prop('scrollHeight');
    const newMsg = msgs.children("li:last-child");
    const newMsgHeight = newMsg.innerHeight();
    const lastMsgHeight = newMsg.prev().innerHeight();
  
    
    if(clientHeight + scrollTop + newMsgHeight + lastMsgHeight >= scrollHeight) {
        msgs.scrollTop(scrollHeight);
    }
}

$(".btn").on("click", (e) => {
    e.preventDefault();
    const msg = {};
    msg.text = document.querySelector(".text").value;
    document.querySelector(".text").value = "";
    socket.emit("createMsg", msg, () => console.log("callback"));
});

socket.on("newMsg", msg => {
    const tmpl = $("#msgTmpl").html();
    const html = Mustache.render(tmpl, {
        text: msg.text,
        date: dateFormat(msg.date),
        name: msg.name
    });
    $(".list").append(html);
    scrollToBottom();
});


$(".btn__location").on("click", (e) => {
    e.preventDefault();
    if(!navigator.geolocation) {
        return alert("geolocation is not supported by your browser");
    }
    navigator.geolocation.getCurrentPosition(
        position => {
            socket.emit("createLocationMsg", {
                lat: position.coords.latitude,
                lon: position.coords.longitude
            });
        },
        err => console.log(err)
    );
});

socket.on("newLocationMsg", coord => {
    const tmpl = $("#msgLocTmpl").html();
    const html = Mustache.render(tmpl, {
        url: coord.url, 
        date: dateFormat(coord.date),
        name: coord.name
    });
    $(".list").append(html);
    scrollToBottom();
});



function dateFormat(date) {
    const formatedDate = moment(date).format("h:mm a");
    return formatedDate;
}



socket.on("updateUserList", users => {
    const list = $("<ul></ul>")
    users.forEach(user => {
        list.append($("<li>"+user+"</li>"));
    });
    $(".userlistBlock").html(list);
})  