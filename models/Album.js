const mongoose = require('mongoose');

const AlbumSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    artista: {
        type: String,
        required: true,
        trim: true
    },
    imagen: {
        type: String,
        required: true,
        trim: true 
    },
    puntuacion: {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model('Album', AlbumSchema);