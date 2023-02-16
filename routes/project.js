const express = require("express");
const router = express.Router();

// Require de los controladores de register
const projectController = require("../controllers/projectController");

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
router.get("/:id", projectController.project_get);

// POST mensaje de la página
router.post("/:id", projectController.project_message_post);

// DELETE mensajes de la página
router.delete("/:id", projectController.project_message_delete);

module.exports = router;