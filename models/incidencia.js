const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Declaración del modelo y sus datos
const incidentSchema = new Schema({
    asunto: String,
    descripcion: String,
    fecha: String,
    autor: String
});

// Creación del modelo
const Incidencia = mongoose.model("Incidencia", incidentSchema, "incidencia");

module.exports = Incidencia;