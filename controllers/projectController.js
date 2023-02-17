const Proyecto = require("../models/proyectos");
const Mensaje = require("../models/mensaje");
const Tarea = require("../models/tarea");

exports.project_get = async (req, res) => {
    const id = req.params.id;
    try {
        const proyectoPagina = await Proyecto.findById(id);
        const arrayMensajes = await Mensaje.find({ proyectoId: id });
        const arrayTareas = await Tarea.find({ proyectoId: id });
        if (proyectoPagina) {
            res.render("project", { tituloWeb: "Proyecto", title: "Hola", arrayTareas: arrayTareas, proyecto: proyectoPagina, arrayMensajes: arrayMensajes, usuario: req.session.cuenta });
        }
    } catch (error) {
        console.log(error);
    }
};

exports.project_message_post = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    body.autor = req.session.cuenta.nombre;
    const date = new Date();
    body.fecha = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    try {
        const proyectoPagina = await Proyecto.findById(id);
        if (body.mensaje != "") {

            const nuevoMensaje = new Mensaje({
                autor: body.autor,
                fecha: body.fecha,
                mensaje: body.mensaje,
                proyectoId: id
            });
            await nuevoMensaje.save();
            const arrayMensajes = await Mensaje.find({ proyectoId: id });
            const arrayTareas = await Tarea.find({ proyectoId: id });
            res.render("project", { tituloWeb: "Proyecto", title: "Hola", arrayTareas: arrayTareas, proyecto: proyectoPagina, arrayMensajes: arrayMensajes, usuario: req.session.cuenta });

        } else {
            const arrayMensajes = await Mensaje.find({ proyectoId: id });
            const arrayTareas = await Tarea.find({ proyectoId: id });
            res.render("project", { tituloWeb: "Proyecto", title: "Hola", proyecto: proyectoPagina, arrayTareas: arrayTareas, arrayMensajes: arrayMensajes, usuario: req.session.cuenta, error: true });
        }
    } catch (error) {
        console.log(error);
    }
};

exports.project_message_delete = async (req, res) => {
    const id = req.params.id;
    try {
        const borrarMensajes = await Mensaje.deleteMany({ proyectoId: id });
        if (borrarMensajes) {
            res.json({
                estado: true,
                mensaje: "Mensajes eliminados satisfactoriamente"
            });
        } else {
            res.json({
                estado: false,
                mensaje: "No se han podido eliminar los mensajes"
            });
        }
    } catch (error) {
        console.log(error);
    }
};

exports.project_task_get = async (req, res) => {
    const id = req.params.id;
    try {
        const proyectoPagina = await Proyecto.findById(id);
        res.render("addtask", { tituloWeb: "Añadir nueva tarea", proyecto: proyectoPagina });
    } catch (error) {
        console.log(error);
    }
};

exports.project_task_post = async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    try {
        const proyectoPagina = await Proyecto.findById(id);
        if (body.titulo != "" && body.texto != "") {
            const nuevaTarea = new Tarea({
                titulo: body.titulo,
                texto: body.texto,
                usuario: req.session.cuenta.nombre,
                estado: "Pendiente",
                proyectoId: id
            });
            await nuevaTarea.save();
            res.render("addtask", { tituloWeb: "Añadir nueva tarea", proyecto: proyectoPagina, success: true });
        } else {
            res.render("addtask", { tituloWeb: "Añadir nueva tarea", proyecto: proyectoPagina, error: true });
        }
    } catch (error) {
        console.log(error);
    }
};

exports.project_task_put = async (req, res) => {
    const body = req.body;
    try {
        const tareaEditar = await Tarea.findByIdAndUpdate(
            body.id, {
            estado: body.newStatus
        }, { useFindAndModify: false }
        );
        res.json({
            estado: true,
            mensaje: 'Tarea editada'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar la tarea'
        })
    }
};

exports.project_task_delete = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const tareaEliminar = await Tarea.findByIdAndDelete(id);
        if (!tareaEliminar) {
            res.json({
                estado: false,
                mensaje: 'No se puede eliminar la tarea'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Tarea eliminada'
            })
        }
    } catch (error) {
        console.log(error);
    }
};