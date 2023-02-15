const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Declaración del modelo y sus datos
const newsSchema = new Schema({
    titulo: String,
    descripcion: String,
    fecha: String
});

// Creación del modelo
const Noticia = mongoose.model("Noticia", newsSchema, "noticia");

module.exports = Noticia;