const mongoose = require("mongoose");
const { Schema } = mongoose;

const EntregaSchema = mongoose.Schema({
    idLegado: {
        type: String,
        required: true,
        trim: true,
    },
    idCliente: { type: Schema.Types.ObjectId, required: true, ref: "Cliente" },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    deliveredAt: {
        type: Date,
        default: null
    },
    valoracion: {
        type: Number,
        default: null
    },
    comentario: {
        type: String,
        trim: true,
        default: null
    },
});

module.exports = mongoose.model("Entrega", EntregaSchema);
