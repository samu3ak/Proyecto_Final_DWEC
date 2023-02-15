var express = require('express');
var router = express.Router();

// Require de los controladores de users
const newsController = require("../controllers/newsController");

// Comprueba que tiene iniciada sesión
router.get("/*", (req, res, next) => {
  req.session.cuenta = req.session.cuenta ? req.session.cuenta : false;
  if (!req.session.cuenta) {
    res.render("login", { tituloWeb: "Inicio de sesión", error: false });
  } else {
    next();
  }
});

/* GET users listing. */
router.get('/', newsController.index);

module.exports = router;
