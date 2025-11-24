const { Schema, model } = require("mongoose");

const ServicioSchema = new Schema({
    nombre: {
        type: String,
        require: true,
        unique: true
    },
    descripcion: String,
    precio: Number
});

module.exports = model("Servicio", ServicioSchema);