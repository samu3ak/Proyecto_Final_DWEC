const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Declaración del modelo y sus datos
const spentSchema = new Schema({
    nombre: String,
    cantidad: String
});

// Creación del modelo
const Gasto = mongoose.model("Gasto", spentSchema, "gasto");

module.exports = Gasto;