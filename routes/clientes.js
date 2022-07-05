//Rutas para crear repartidores
const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const { check } = require("express-validator");

// api/clientes es el endpoint

router.get("/", clienteController.obtenerClientes);

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("apellido", "El apellido es obligatorio").not().isEmpty(),
        check("email", "Agrega un email válido").isEmail(),
        check("direccion", "La dirección es obligatoria").not().isEmpty(),
        check("numero", "Número no valido").isLength({ min: 9 }),
    ],
    clienteController.crearCliente
);

module.exports = router;
