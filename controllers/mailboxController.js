const Problema = require("../models/problema");

exports.index = async (req, res) => {
    try {
        const arrayProblemas = await Problema.find();
        res.render("mailbox", { title: "Lista de Mensajes", usuario: req.session.cuenta, arrayProblemas: arrayProblemas });
    } catch (error) {
        console.log(error);
    }
};

exports.index_mail_delete = async (req, res) => {
    const id = req.params.id;
    try {
        const borrarMail = await Problema.findByIdAndDelete(id);
        if (borrarMail) {
            res.json({
                estado: true,
                mensaje: "Mail borrado"
            });
        } else {
            res.json({
                estado: false,
                mensaje: "No se ha podido borrar el mail"
            });
        }
    } catch (error) {
        console.log(error);
    }
};