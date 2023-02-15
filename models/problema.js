const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Declaración del modelo y sus datos
const problemSchema = new Schema({
    asunto: String,
    descripcion: String,
    remitente: String
});

// Creación del modelo
const Problema = mongoose.model("Problema", problemSchema, "problema");

module.exports = Problema;