const text = document.getElementById("message")
const form = document.getElementById("restoreRequestForm")

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => (obj[key] = value));
    const response = await fetch("/api/sessions/restoreRequest", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const responseData = await response.json();
    if (responseData.status === "success") {
        text.innerHTML = "Se ha enviado un correo de verificación"
    }
    else {
        text.innerHTML = responseData.error
    }

})