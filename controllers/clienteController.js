const Cliente = require("../models/Cliente");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
require("dotenv").config({ path: "variables.env" });
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

exports.crearCliente = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email } = req.body;

    try {
        let cliente = await Cliente.findOne({ email });

        if (cliente) {
            return res.status(400).json({ msg: "El Cliente ya existe" });
        }

        cliente = new Cliente(req.body);

        await cliente.save();
        res.status(201).send("Cliente creado con exito");
    } catch (error) {
        console.log("error", error);
        res.status(400).send("Hubo un error");
    }
};

exports.obtenerClientes = async (req, res) => {
    try {
        let resultado = await Cliente.find({});
        res.json({ resultado });
    } catch (error) {
        console.log("error", error);
        res.status(400).send("Hubo un error");
    }
};
