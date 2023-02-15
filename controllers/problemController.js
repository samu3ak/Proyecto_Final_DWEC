const Problema = require("../models/problema");

exports.problem = (req, res) => {
    res.render("problem", { tituloWeb: "Problema", usuario: req.session.cuenta, error: false, success: false });
};

exports.problem_create_post = async (req, res) => {
    const body = req.body;

    // Fecha de creación
    const date = new Date();
    body.fecha = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    try {
        if (body.asunto != "" && body.descripcion != "") {
            let nuevoProblema = new Problema(body);
            await nuevoProblema.save();
            res.render("problem", { tituloWeb: "Problemas", usuario: req.session.cuenta, error: false, success: true });
        } else {
            res.render("problem", { tituloWeb: "Problemas", usuario: req.session.cuenta, error: true, success: false });
        }
    } catch (error) {
        console.log(error);
    }
};