$(document).ready(function () {
    // DELETE USER
    const id = $("#editar").data("id");
    $("#delete").click(async function (e) {
        e.preventDefault();
        const data = await fetch(`/users/${id}`, {
            method: "delete"
        });
        const res = await data.json();
        if (res.estado) {
            window.location.href = "/users";
        } else {
            console.log(res);
        }
    });

    // PUT USER
    $("#edit").click(async function (e) {
        e.preventDefault();
        const formEditar = document.querySelector("#editar");
        const nombre = formEditar.elements["nombre"].value;
        const nombreReal = formEditar.elements["nombreReal"].value;
        const apellidos = formEditar.elements["apellidos"].value;
        const rol = formEditar.elements["rol"].value;
        const password = formEditar.elements["password"].value;
        try {
            const data = await fetch(`/users/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, nombreReal, apellidos, rol, password })
            })
            const res = await data.json();
            if (res.estado) {
                window.location.href = "/users";
            } else {
                console.log(res);
            }
        } catch (error) {
            console.log(error);
        }
    });
});