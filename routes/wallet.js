var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render("wallet", { title: "Lista de Gastos" });
});

module.exports = router;
