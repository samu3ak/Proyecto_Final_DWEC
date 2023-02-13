const express = require("express");
const router = express.Router();

// Require de los controladores de login
const loginController = require("../controllers/loginController");

// GET página login
router.get("/", loginController.index);

// POST request para loguear usuario
router.post("/", loginController.user_login_post);

module.exports = router;