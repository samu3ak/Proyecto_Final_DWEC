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
router.get('/', newsController.news);

router.get('/crearNoticia', newsController.news_create_new);

router.get('/editarNoticia/:id', newsController.news_edit_news);

// POST Noticia
router.post("/crearNoticia", newsController.news_create_new_post);

// PUT Noticia
router.put("/editarNoticia/:id", newsController.news_edit_news_put);

// DELETE Noticia
router.delete("/editarNoticia/:id", newsController.news_edit_news_delete);

module.exports = router;
