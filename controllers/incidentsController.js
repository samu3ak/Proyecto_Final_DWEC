const Incidencia = require("../models/incidencia");

exports.incidents = async (req, res) => {
    try {
        const arrayIncidencias = await Incidencia.find();
        res.render("incidents", { title: "Lista de Incidencias", arrayIncidencias: arrayIncidencias, usuario: req.session.cuenta });
    } catch (error) {
        console.log(error);
    }
};

exports.incidents_create_incident = (req, res) => {
    res.render("addincident", { tituloWeb: "Añadir nueva incidencia", usuario: req.session.cuenta, error: false, success: false });
};

exports.incidents_create_incident_post = async (req, res) => {
    const body = req.body;
    // Conseguir la fecha de creación
    const date = new Date();
    body.fecha = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    try {
        if (body.asunto != "" && body.descripcion != "") {
            const nuevaIncidencia = new Incidencia(body);
            await nuevaIncidencia.save();
            res.render("addincident", { tituloWeb: "Añadir nueva incidencia", usuario: req.session.cuenta, error: false, success: true });
        } else {
            res.render("addincident", { tituloWeb: "Añadir nueva incidencia", usuario: req.session.cuenta, error: true, success: false });
        }
    } catch (error) {
        console.log(error);
    }
};

exports.incidents_incident_delete = async (req, res) => {
    const id = req.params.id;
    try {
        const borrarIncidencia = await Incidencia.findByIdAndDelete(id);
        if (borrarIncidencia) {
            res.json({
                estado: true,
                mensaje: "Incidencia borrada"
            });
        } else {
            res.json({
                estado: false,
                mensaje: "No se ha podido borrar la incidencia"
            });
        }
    } catch (error) {
        console.log(error);
    }
};