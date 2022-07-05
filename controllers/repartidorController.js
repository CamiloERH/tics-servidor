const Repartidor = require("../models/Repartidor");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
require("dotenv").config({ path: "variables.env" });
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Entrega = require("../models/Entrega");

exports.obtenerRepartidores = async (req, res) => {
    try {
        const resultado = await Repartidor.find({}).select("-password");
        res.json({ resultado });
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
};

exports.crearRepartidor = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
        let repartidor = await Repartidor.findOne({ email });

        if (repartidor) {
            return res.status(400).json({ msg: "El repartidor ya existe" });
        }

        repartidor = new Repartidor(req.body);

        const salt = await bcryptjs.genSalt(10);
        repartidor.password = await bcryptjs.hash(password, salt);

        await repartidor.save();
        res.status(201).send("Repartidor creado con exito");
    } catch (error) {
        console.log("error", error);
        res.status(400).send("Hubo un error");
    }
};

exports.entregasCompletadas = async (req, res) => {
    let query = {};
    if (req.query.fecha) {
        console.log(req.query.fecha);
        query = { createdAt: { $gt: req.query.fecha } };
    }
    const entregas = await Entrega.find(query)
        .populate("idCliente")
        .limit(20)
        .sort("-createdAt");
    res.json({ entregas });
};

exports.asignarEntregaRepartidor = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const idRepartidor = mongoose.Types.ObjectId(req.params.id);

    const { idLegado, idCliente } = req.body;

    try {
        const repartidor = await Repartidor.findById(idRepartidor).select(
            "-password"
        );

        if (!repartidor) {
            return res.status(404).json({ msg: "No existe el repartidor" });
        }

        if (!repartidor.disponible) {
            return res.status(404).json({ msg: "Repartidor no disponible" });
        }
        const entrega = Entrega({ idLegado, idCliente });

        repartidor.entregas.push(entrega);
        // repartidor.disponible = false;
        repartidor.save();
        entrega.save();

        res.json({ repartidor });
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
};

//PARA REPARTIDORES
exports.obtenerEntregas = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const idRepartidor = mongoose.Types.ObjectId(req.params.id);
    try {
        const repartidor = await Repartidor.findById(idRepartidor).select(
            "-password"
        );
        if (!repartidor) {
            return res.status(404).json({ msg: "No existe el repartidor" });
        }
        let repartidorPopulate = await repartidor.populate(
            "entregas.idCliente"
        );
        let entregas = repartidorPopulate.entregas;
        res.json({ entregas });
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
};

exports.confirmarPedido = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { idRepartidor, idEntrega } = req.body;
        console.log(idRepartidor, idEntrega);
        idRepartidorObject = mongoose.Types.ObjectId(idRepartidor);
        idEntregaObject = mongoose.Types.ObjectId(idEntrega);
        const repartidor = await Repartidor.findById(idRepartidorObject).select(
            "-password"
        );
        if (!repartidor) {
            return res.status(404).json({ msg: "No existe el repartidor" });
        }

        let resultado = await Repartidor.findOneAndUpdate(
            { _id: idRepartidorObject },
            {
                $pull: {
                    entregas: { _id: idEntregaObject },
                },
            }
        ).select({ entregas: { $elemMatch: { _id: idEntregaObject } } });
        await Entrega.updateOne(
            { _id: idEntregaObject },
            { $set: { deliveredAt: new Date() } }
        );

        res.json({ resultado });
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
};
