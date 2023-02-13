const express = require("express");
const router = express.Router();
const Usuario = require("../models/user");

router.get("/", function (req, res) {
    res.render("login", { tituloWeb: "Inicio de sesión", error: false });
});

router.post("/", async function (req, res) {
    // Recuperación de los datos introducidos en el login mediante body-parser
    let body = req.body;
    console.log(body);
    try {
        let usuarioEncontrado = await Usuario.findOne({ nombre: `${body.nombre}`, password: `${body.password}` });
        console.log(usuarioEncontrado);
        if (usuarioEncontrado !== null) {
            res.redirect("/");
        } else {
            res.render("login", { tituloWeb: "Inicio de sesión", error: true });
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;