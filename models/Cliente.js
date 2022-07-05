const mongoose = require('mongoose');

const ClienteSchema = mongoose.Schema({
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
    direccion: {
        type: String,
        required: true
    }, 
    numero: {
        type: String,
        required: true
    } 
});

module.exports = mongoose.model('Cliente', ClienteSchema);