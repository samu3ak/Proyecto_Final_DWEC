const Proyecto = require("../models/proyectos");
const Mensaje = require("../models/mensaje");

exports.project_get = async (req, res) => {
    const id = req.params.id;
    try {
        const proyectoPagina = await Proyecto.findById(id);
        const arrayMensajes = await Mensaje.find({ proyectoId: id });
        if (proyectoPagina) {
            res.render("project", { tituloWeb: "Proyecto", title: "Hola", proyecto: proyectoPagina, arrayMensajes: arrayMensajes, usuario: req.session.cuenta });
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
            res.render("project", { tituloWeb: "Proyecto", title: "Hola", proyecto: proyectoPagina, arrayMensajes: arrayMensajes, usuario: req.session.cuenta });

        } else {
            const arrayMensajes = await Mensaje.find({ proyectoId: id });
            res.render("project", { tituloWeb: "Proyecto", title: "Hola", proyecto: proyectoPagina, arrayMensajes: arrayMensajes, usuario: req.session.cuenta, error: true });
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