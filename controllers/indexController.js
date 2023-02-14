const Proyecto = require("../models/proyectos");

exports.index = async (req, res) => {
    try {
        const arrayProyectos = await Proyecto.find();
        res.render('index', { tituloWeb: "Inicio de sesión", arrayProyectos: arrayProyectos, title: 'Inicio', usuario: req.session.cuenta });
    } catch (error) {
        console.log(error);
    }
};