const Usuario = require("../models/user");

exports.index = (req, res) => {
    res.render("register", { tituloWeb: "Registro de usuario", error: false, success: false });
};

exports.user_register_post = async (req, res) => {
    // Recuperamos los datos del formulario
    let body = req.body;
    try {
        // Validación de campos
        if (body.nombre != "" && body.apellidos != "" && body.password != "") {
            let nuevoUsuario = new Usuario(body);
            await nuevoUsuario.save();
            res.render("register", { tituloWeb: "Registro de usuario satisfactorio", error: false, success: true });
        } else {
            res.render("register", { tituloWeb: "Registro de usuario erróneo", error: true, success: false });
        }
    } catch (err) {
        console.log(err);
    }
};