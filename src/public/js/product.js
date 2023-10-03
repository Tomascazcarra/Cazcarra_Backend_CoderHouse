const button = document.getElementById("boton_logout")
const carritoButton = document.getElementById("boton_ir_a_carrito")
const addProductToCartButtons = document.querySelectorAll("#addProductToCart")

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

addProductToCartButtons.forEach(button => {
    button.addEventListener("click", async (event) => {
        event.preventDefault();
        const productId = button.getAttribute('data-arg1');
        const cartId = button.getAttribute('data-arg2');
        const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const responseData = await response.json();
        if(responseData.status==="success"){
            window.location.replace(`/carts/${cartId}`)
        }
        else{
            alert(responseData.error)
        }

    });
});