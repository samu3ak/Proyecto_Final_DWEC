const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Declaración del modelo y sus datos
const projectSchema = new Schema({
    nombre: String,
    responsable: {
        id: String,
        nombre: String
    },
    tipo: String,
});

// Creación del modelo
const Proyecto = mongoose.model("Proyecto", projectSchema, "proyecto");

module.exports = Proyecto;