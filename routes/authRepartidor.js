const express =  require('express');
const router = express.Router(); 
const { check } = require('express-validator');
const authRepartidorController = require('../controllers/authRepartidorController');
const authRepartidor = require('../middleware/authRepartidor');

//Autenticación de repartidores
// /api/auth/repartidor es el endpoint

router.post('/', 
    [
        check('email', 'Agrega un email válido').isEmail()
    ],
    authRepartidorController.autenticarRepartidor
);

//Obtiene el usuario autenticado
router.get('/', 
    authRepartidor,
    authRepartidorController.repartidorAutenticado
);

module.exports = router;