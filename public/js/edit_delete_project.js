const formEditar = document.querySelector('#editar');
// Editar proyecto
const btnEditar = document.querySelector("#edit");
btnEditar.addEventListener("click", async (e) => {
    e.preventDefault();
    const nombre = formEditar.elements["nombre"].value;
    const responsable = formEditar.elements["responsable"].value;
    const tipo = formEditar.elements["tipo"].value;
    const horas = formEditar.elements["horas"].value;
    const id = formEditar.dataset.id;
    try {
        const data = await fetch(`/editarProyecto/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, responsable, tipo, horas })
        })
        const res = await data.json();
        if (res.estado) {
            window.location.href = "/";
        } else {
            console.log(res);
        }
    } catch (error) {
        console.log(error);
    }
});

// Eliminar proyecto
const btnEliminar = document.querySelector("#delete");
btnEliminar.addEventListener("click", async (e) => {
    const id = formEditar.dataset.id;
    e.preventDefault();
    try {
        const data = await fetch(`/editarProyecto/${id}`, {
            method: "delete"
        })
        const res = await data.json();
        if (res.estado) {
            window.location.href = "/";
        } else {
            console.log(res);
        }
    } catch (error) {
        console.log(error);
    }
});