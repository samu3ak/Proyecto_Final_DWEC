var express = require('express');
var router = express.Router();

// Require de los controladores de users
const usersController = require("../controllers/usersController");

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
router.get('/', usersController.users);

router.get("/:id", usersController.users_edit_get);

// PUT Users
router.put("/:id", usersController.users_edit_put);

// DELETE Users
router.delete("/:id", usersController.users_edit_delete);

module.exports = router;
