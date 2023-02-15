var express = require('express');
var router = express.Router();

// Require de los controladores de users
const walletController = require("../controllers/walletController");

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
router.get('/', walletController.wallet);

router.get('/crearGasto', walletController.wallet_create_spent);

router.get('/editarGasto/:id', walletController.wallet_edit_spent);

// POST Gasto
router.post('/crearGasto', walletController.wallet_create_spent_post);

// PUT Gasto
router.put("/editarGasto/:id", walletController.wallet_edit_spent_put);

// Delete Gasto
router.delete("/editarGasto/:id", walletController.wallet_spent_delete);

module.exports = router;
