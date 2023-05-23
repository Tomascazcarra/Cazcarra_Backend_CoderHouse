const socket = io({
    autoConnect:false
});

const chatBox = document.getElementById("chatBox");
let user;

Swal.fire({
    title:"Identificate.",
    text:"Para ingresar al chat, elegir un username.",
    icon:"question",
    input:"text",
    inputValidator: (value) =>{
        return !value && "¡Necesitas elegir un username para poder ingresar!"
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
}).then(result=>{
    user = result.value;
    socket.connect();
    socket.emit("chat:newParticipant", user)
})

chatBox.addEventListener("keyup", evt=>{
    console.log(evt)
    if(evt.key==="Enter"){
        if(chatBox.value.trim().length>0){
            socket.emit("chat:message", {user,message:chatBox.value.trim()})
        }
    }
});

socket.on("chat:messageLogs",data=>{
    const logs = document.getElementById("logs")
    let message = "";
    data.forEach(log => {
        message+= `${log.user} dice: ${log.message} </br>`
    });
    logs.innerHTML = message;
})

socket.on("chat:newConnection", data=>{
    if(!user) return;
    Swal.fire({
        toast:true,
        position:"top-end",
        showConfirmButton:false,
        timer:2000,
        title: `${data} se unio al chat`,
        icon:"success"
    }) 
})