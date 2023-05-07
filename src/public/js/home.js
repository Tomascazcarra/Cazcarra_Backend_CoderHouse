const socket = io();

socket.on("logs", data =>{ 
    logs.innerHTML=""
    data.forEach(element => {
        const li = document.createElement("li");
        const product = document.createTextNode(`${element.title} ${element.description} ${element.price} ${element.code} ${element.stock}`);
        li.appendChild(product);
        logs.appendChild(li)
    });
    
});