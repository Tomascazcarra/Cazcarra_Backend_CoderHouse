const form = document.getElementById("button_premium")

form.addEventListener("click", async (event) => {
    event.preventDefault();
    const userId = document.getElementById("userId").value;
    const response = await fetch(`/api/users/premium/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const responseData = await response.json();
    if (responseData.status === "success") {
        alert("Rol actualizado correctamente!")
    }
    else{
        alert("Atención: Todavía faltan documentos por cargar para actualizar su rol a premium.")
    }
})