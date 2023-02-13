const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Declaración del modelo y sus datos
const userSchema = new Schema({
    nombre: String,
    apellidos: String,
    password: String,
    rol: {
        type: String,
        enum: ["Alumno", "Profesor"],
    },
});

// Creación del modelo
const Usuario = mongoose.model("Usuario", userSchema, "usuario");

module.exports = Usuario;
