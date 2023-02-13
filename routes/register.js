const express = require("express");
const router = express.Router();

// Require de los controladores de register
const registerController = require("../controllers/registerController");

// GET de la página register
router.get("/", registerController.index);

// POST request para registrar un nuevo usuario
router.post("/", registerController.user_register_post);

module.exports = router;