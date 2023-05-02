const socket = io();

const inputCrearProducto = document.getElementById("crearProducto")
const logs = document.getElementById("logs")
inputCrearProducto.addEventListener("submit", evt =>{
    
    evt.preventDefault();
    const inputName = document.getElementById("name").value
    const inputQuantity = document.getElementById("quantity").value
    let data = {name: inputName, quantity: inputQuantity};
    socket.emit("message", data );
});

const inputBorrarProducto = document.getElementById("borrarProducto")
inputBorrarProducto.addEventListener("submit", evt =>{
    logs.innerHTML=""
    evt.preventDefault();
    const inputName = document.getElementById("name_delete").value
    let data = {name: inputName}
    socket.emit("delete", data );
});


socket.on("logs", data =>{
    logs.innerHTML=""
    data.forEach(element => {
        const li = document.createElement("li");
        const product = document.createTextNode(`${element.name} ${element.quantity}`);
        li.appendChild(product);
        logs.appendChild(li)
    });
    
});