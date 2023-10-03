const button = document.getElementById("boton_cart")
const deleteProductButtons = document.querySelectorAll('#delete-product');
const quantityElements = document.querySelectorAll('.quantity');
const increaseButtons = document.querySelectorAll('#increase-quantity');
const decreaseButtons = document.querySelectorAll('#decrease-quantity');

button.addEventListener("click", async (event) => {
    event.preventDefault();
    const cartId = button.getAttribute('data-arg1');
    const response = await fetch(`/api/carts/${cartId}/purchase`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const responseData = await response.json();
    if (responseData.status === "success") {
        window.location.replace(`/products`)
    }
})

deleteProductButtons.forEach(button => {
    button.addEventListener("click", async (event) => {
        event.preventDefault();
        const productId = button.getAttribute('data-arg1');
        const cartId = button.getAttribute('data-arg2');

        const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const responseData = await response.json();
        if (responseData.status === "success") {
            window.location.replace(`/carts/${cartId}`)
        }
        else {
            alert(responseData.error)
        }

    });
});

increaseButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
        event.preventDefault();
        const productId = button.getAttribute('data-arg1');
        const cartId = button.getAttribute('data-arg2');

        const quantityElement = event.target.previousElementSibling;
        const currentQuantity = parseInt(quantityElement.textContent);
        const newQuantity = currentQuantity + 1;
        quantityElement.textContent = newQuantity;

        const data = {
            quantity: quantityElement.textContent
        };
        await fetch(`/api/carts/${cartId}/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    });
});

decreaseButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
        event.preventDefault();
        const productId = button.getAttribute('data-arg1');
        const cartId = button.getAttribute('data-arg2');

        const quantityElement = event.target.previousElementSibling.previousElementSibling;
        const currentQuantity = parseInt(quantityElement.textContent);
        if (currentQuantity > 1) {
            const newQuantity = currentQuantity - 1;
            quantityElement.textContent = newQuantity;

            const data = {
                quantity: quantityElement.textContent
            };
            await fetch(`/api/carts/${cartId}/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        }
    });
});