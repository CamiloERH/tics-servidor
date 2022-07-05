const mongoose = require('mongoose');
const Entrega = require("../models/Entrega");

const RepartidorSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true
    },
    disponible: {
        type: Boolean,
        required: true,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now    
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    entregas: {
        type: [ { type: Entrega.schema } ]
    }
});

module.exports = mongoose.model('Repartidor', RepartidorSchema);