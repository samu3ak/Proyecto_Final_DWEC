const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Declaración del modelo y sus datos
const messageSchema = new Schema({
    autor: String,
    fecha: String,
    mensaje: String,
    proyectoId: String
});

// Creación del modelo
const Mensaje = mongoose.model("Mensaje", messageSchema, "mensaje");

module.exports = Mensaje;