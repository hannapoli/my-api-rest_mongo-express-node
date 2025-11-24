const { Schema, model } = require("mongoose");

const ServicioSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: String,
    precio: {
        type: Number,
        required: true
    }
});

module.exports = model("Servicio", ServicioSchema);