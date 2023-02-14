var express = require('express');
var router = express.Router();

// Require de los controladores de users
const indexController = require("../controllers/indexController");

// Comprueba que tiene iniciada sesión
router.get("/", (req, res, next) => {
  req.session.cuenta = req.session.cuenta ? req.session.cuenta : false;
  if (!req.session.cuenta) {
    res.render("login", { tituloWeb: "Inicio de sesión", error: false });
  } else {
    next();
  }
});

/* GET home page. */
router.get('/', indexController.index);

router.get('/crearProyecto', indexController.index_create_project);

router.post('/crearProyecto', indexController.index_create_project_post);

router.get("/editarProyecto/:id", indexController.index_edit_project);

router.put("/editarProyecto/:id", indexController.index_edit_project_put);

module.exports = router;
