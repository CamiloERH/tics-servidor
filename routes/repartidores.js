//Rutas para crear repartidores
const express = require("express");
const router = express.Router();
const repartidorController = require("../controllers/repartidorController");
const { check } = require("express-validator");

//Crea un usuario
// api/repartidores es el endpoint

router.get("/", repartidorController.obtenerRepartidores);

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("apellido", "El apellido es obligatorio").not().isEmpty(),
        check("email", "Agrega un email válido").isEmail(),
        check("numero", "Número no valido").isLength({ min: 9 }),
    ],
    repartidorController.crearRepartidor
);

router.put(
    "/:id",
    [
        check("idLegado", "El id es obligatorio").not().isEmpty(),
        check("idCliente", "El id es obligatorio").not().isEmpty(),
    ],
    repartidorController.asignarEntregaRepartidor
);

router.get("/entregas/:id", repartidorController.obtenerEntregas);

router.get("/entregas-completadas", repartidorController.entregasCompletadas);

router.post(
    "/entrega",
    [
        check("idEntrega", "El id es obligatorio").not().isEmpty(),
    ],
    repartidorController.confirmarPedido
);

module.exports = router;
