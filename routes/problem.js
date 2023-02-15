const express = require("express");
const router = express.Router();

// Require de los controladores de register
const registerController = require("../controllers/registerController");

// Comprueba que tiene iniciada sesión
router.get("/*", (req, res, next) => {
    req.session.cuenta = req.session.cuenta ? req.session.cuenta : false;
    if (!req.session.cuenta) {
        res.render("register", { tituloWeb: "Inicio de sesión", error: false, success: false });
    } else {
        next();
    }
});

// GET de la página register
router.get("/", registerController.index);

// POST request para registrar un nuevo usuario
router.post("/", registerController.user_register_post);

module.exports = router;