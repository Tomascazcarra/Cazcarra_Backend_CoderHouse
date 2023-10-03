const deleteButtons = document.querySelectorAll('#delete_button');
const updateRoleButtons = document.querySelectorAll('#update_role_button');

deleteButtons.forEach(button => {
    button.addEventListener("click", async (event) => {
        event.preventDefault();
        const userId = button.getAttribute('data-arg1');
        const response = await fetch(`/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const responseData = await response.json();
        if (responseData.status === "success") {
            window.location.replace("/deleteusers")
        }
        else {
            alert(responseData.error)
        }

    });
});

updateRoleButtons.forEach(button => {
    button.addEventListener("click", async (event) => {
        event.preventDefault();
        const userId = button.getAttribute('data-arg1');

        const response = await fetch(`/api/users/premium/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const responseData = await response.json();
        if (responseData.status === "success") {
            window.location.replace("/deleteusers")
        }
        else {
            alert(responseData.error)
        }

    });
});