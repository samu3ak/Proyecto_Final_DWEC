const Usuario = require("../models/user");

exports.register = (req, res) => {
    res.render("register", { tituloWeb: "Registro de usuario", error: false, success: false });
};

exports.user_register_post = async (req, res) => {
    // Recuperamos los datos del formulario
    let body = req.body;
    try {
        const mismoNombre = await Usuario.findOne({ nombre: `${body.nombre}` });
        // Validación de campos
        if (mismoNombre === null && (body.nombre != "" && body.nombreReal != "" && body.apellidos != "" && body.password != "")) {
            let nuevoUsuario = new Usuario(body);
            await nuevoUsuario.save();
            res.render("register", { tituloWeb: "Registro de usuario satisfactorio", error: false, success: true });
            res.redirect("/");
        } else {
            res.render("register", { tituloWeb: "Registro de usuario erróneo", error: true, success: false });
        }
    } catch (err) {
        console.log(err);
    }
};