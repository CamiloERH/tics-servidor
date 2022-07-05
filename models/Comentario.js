const mongoose = require('mongoose');

const ComentarioSchema = mongoose.Schema({
    idUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario',
    },
    idAlbum: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Album',
    },
    comentario: {
        type: String,
        required: true,
        trim: true
    },
    puntuacion: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now    
    }
});

module.exports = mongoose.model('Comentario', ComentarioSchema);