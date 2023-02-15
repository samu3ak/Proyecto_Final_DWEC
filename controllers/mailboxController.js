const Problema = require("../models/problema");

exports.index = async (req, res) => {
    try {
        const arrayProblemas = await Problema.find();
        res.render("mailbox", { title: "Lista de Mensajes", usuario: req.session.cuenta, arrayProblemas: arrayProblemas });
    } catch (error) {
        console.log(error);
    }
};