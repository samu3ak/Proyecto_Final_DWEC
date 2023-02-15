const express = require("express");
const router = express.Router();

// Require de los controladores de login
const loginController = require("../controllers/loginController");

// Comprueba que tiene iniciada sesión
router.get("/*", (req, res, next) => {
    req.session.cuenta = req.session.cuenta ? req.session.cuenta : false;
    if (!req.session.cuenta) {
        res.render("login", { tituloWeb: "Inicio de sesión", error: false });
    } else {
        next();
    }
});

// GET página login
router.get("/", loginController.login);

// POST request para loguear usuario
router.post("/", loginController.user_login_post);

module.exports = router;