const Repartidor = require('../models/Repartidor');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
require('dotenv').config({path: 'variables.env'});
const jwt = require('jsonwebtoken');


exports.autenticarRepartidor = async (req, res) => {
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({errors: errors.array()})
    }
    const { email, password } = req.body;

    try {
        let repartidor = await Repartidor.findOne({ email });
        if(!repartidor){
            return res.status(400).json({msg: 'El repartidor no existe'});
        }

        const passCorrecto = await bcryptjs.compare(password, repartidor.password);
        if(!passCorrecto){
            return res.status(400).json({msg: 'Password incorrecto'});
        } 

        const payload = {
            repartidor: {
                id: repartidor.id
            }
        };

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;
            res.json({ token });
        });

    } catch(error) {
        console.log(error);
    }
}

exports.repartidorAutenticado = async (req, res) => {
    try {
        const repartidor = await Repartidor.findById(req.repartidor.id).select('-password');
        res.json({repartidor});
    } catch(error){
        console.log(error);
        res.status(500).json({msg: 'Hubo un error'});
    }
}