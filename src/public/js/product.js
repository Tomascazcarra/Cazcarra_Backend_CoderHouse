const button = document.getElementById("boton_logout")
button.addEventListener("click", async (event) =>{
    event.preventDefault();
    const response = await fetch("/logout",{
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        }
    })
    const responseData = await response.json();
    if(responseData.status==="success"){
        window.location.replace("/login")
    }
})