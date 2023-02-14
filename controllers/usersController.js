const Usuario = require("../models/user");

exports.index = async (req, res) => {
    req.session.cuenta = req.session.cuenta ? req.session.cuenta : false;
    try {
        const arrayUsuarios = await Usuario.find();
        res.render("users", { title: "Lista de usuarios", arrayUsuarios: arrayUsuarios, usuario: req.session.cuenta });
    } catch (error) {
        console.log(error);
    }

    // res.render("users", { title: "Lista de usuarios" });
};