const express = require("express");
const router = express.Router();

// Require de los controladores de register
const problemController = require("../controllers/problemController");

// Comprueba que tiene iniciada sesión
router.get("/*", (req, res, next) => {
    req.session.cuenta = req.session.cuenta ? req.session.cuenta : false;
    if (!req.session.cuenta) {
        res.render("register", { tituloWeb: "Inicio de sesión", error: false, success: false });
    } else {
        next();
    }
});

// GET de la página problem
router.get("/", problemController.problem);

// POST de la página problem
router.post("/", problemController.problem_create_post);

module.exports = router;