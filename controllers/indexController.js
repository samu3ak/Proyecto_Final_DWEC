const Proyecto = require("../models/proyectos");
const Usuario = require("../models/user");

exports.index = async (req, res) => {
    try {
        const arrayProyectos = await Proyecto.find();
        res.render('index', { tituloWeb: "Inicio de sesión", arrayProyectos: arrayProyectos, title: 'Inicio', usuario: req.session.cuenta });
    } catch (error) {
        console.log(error);
    }
};

exports.index_create_project = (req, res) => {
    res.render("addproject", { tituloWeb: "Crear nuevo proyecto", error: false, success: false });
};

exports.index_create_project_post = async (req, res) => {// Recuperamos los datos del formulario
    const body = req.body;
    try {
        // Recuperación de datos del responsable del proyecto
        const usuarioResponsable = await Usuario.findOne({ nombre: body.responsable });
        const mismoNombre = await Proyecto.findOne({ nombre: `${body.nombre}` });
        // Validación de campos
        if (mismoNombre === null && usuarioResponsable != null && (body.nombre != "" && body.tipo != "" && body.horas != "")) {
            const nuevoProyecto = new Proyecto({
                nombre: body.nombre,
                responsable: {
                    id: usuarioResponsable._id,
                    nombre: usuarioResponsable.nombre
                },
                tipo: body.tipo,
                horas: body.horas
            });
            await nuevoProyecto.save();
            res.render("addproject", { tituloWeb: "Crear nuevo proyecto", error: false, success: true });
        } else {
            res.render("addproject", { tituloWeb: "Crear nuevo proyecto", error: true, success: false });
        }
    } catch (err) {
        console.log(err);
    }
};

exports.index_edit_project = async (req, res) => {
    const id = req.params.id;

    try {
        const proyectoEditar = await Proyecto.findById(id);
        res.render("editproject", { tituloWeb: "Editar proyecto existente", proyectoEditar: proyectoEditar, error: false, success: false });
    } catch (error) {
        console.log(error);
    }
};

exports.index_edit_project_put = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        // Recuperación de datos del responsable del proyecto
        const usuarioResponsable = await Usuario.findOne({ nombre: body.responsable });
        var mismoNombre = await Proyecto.findOne({ nombre: `${body.nombre}` });
        if (mismoNombre !== null && mismoNombre.nombre == body.nombre) {
            mismoNombre = null;
        }
        if (mismoNombre === null && usuarioResponsable != null && (body.nombre != "" && body.tipo != "" && body.horas != "")) {
            const proyectoEditar = await Proyecto.findByIdAndUpdate(
                id, {
                nombre: body.nombre,
                responsable: {
                    id: usuarioResponsable._id,
                    nombre: usuarioResponsable.nombre
                },
                tipo: body.tipo,
                horas: body.horas
            }, { useFindAndModify: false }
            );
            res.json({
                estado: true,
                mensaje: 'Proyecto editado'
            })
        } else {
            res.json({
                estado: false,
                mensaje: 'Problema al editar el proyecto'
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el proyecto'
        })
    }
};