const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Declaración del modelo y sus datos
const taskSchema = new Schema({
    titulo: String,
    texto: String,
    usuario: String,
    estado: String,
    proyectoId: String
});

// Creación del modelo
const Tarea = mongoose.model("Tarea", taskSchema, "tarea");

module.exports = Tarea;
