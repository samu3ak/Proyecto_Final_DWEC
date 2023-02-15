const formEditar = document.querySelector('#editar');
// Editar gasto
const btnEditar = document.querySelector("#edit");
btnEditar.addEventListener("click", async (e) => {
    e.preventDefault();
    const nombre = formEditar.elements["nombre"].value;
    const cantidad = formEditar.elements["cantidad"].value;
    const id = formEditar.dataset.id;
    try {
        const data = await fetch(`/wallet/editarGasto/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, cantidad })
        })
        const res = await data.json();
        if (res.estado) {
            window.location.href = `/wallet`;
        } else {
            console.log(res);
        }
    } catch (error) {
        console.log(error);
    }
});

// Eliminar gasto
const btnEliminar = document.querySelector("#delete");
btnEliminar.addEventListener("click", async (e) => {
    const id = formEditar.dataset.id;
    e.preventDefault();
    try {
        const data = await fetch(`/wallet/editarGasto/${id}`, {
            method: "DELETE"
        })
        const res = await data.json();
        if (res.estado) {
            window.location.href = "/wallet";
        } else {
            console.log(res);
        }
    } catch (error) {
        console.log(error);
    }
});