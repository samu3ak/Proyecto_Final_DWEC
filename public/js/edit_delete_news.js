const formEditar = document.querySelector('#editar');
// Editar noticia
const btnEditar = document.querySelector("#edit");
btnEditar.addEventListener("click", async (e) => {
    e.preventDefault();
    const titulo = formEditar.elements["titulo"].value;
    const descripcion = formEditar.elements["descripcion"].value;
    const id = formEditar.dataset.id;
    try {
        const data = await fetch(`/news/editarNoticia/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ titulo, descripcion })
        })
        const res = await data.json();
        if (res.estado) {
            window.location.href = `/news`;
        } else {
            console.log(res);
        }
    } catch (error) {
        console.log(error);
    }
});

// Eliminar noticia
const btnEliminar = document.querySelector("#delete");
btnEliminar.addEventListener("click", async (e) => {
    const id = formEditar.dataset.id;
    e.preventDefault();
    try {
        const data = await fetch(`/news/editarNoticia/${id}`, {
            method: "DELETE"
        })
        const res = await data.json();
        if (res.estado) {
            window.location.href = "/news";
        } else {
            console.log(res);
        }
    } catch (error) {
        console.log(error);
    }
});