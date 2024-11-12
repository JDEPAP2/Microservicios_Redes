const express = require('express');
const router = express.Router();
const paquetesController = require('../controllers/paquetesController');

router.post('/crear', paquetesController.crearPaquete);

router.get('/usuario/id/:id_usuario', paquetesController.obtenerPaquetesPorIdUsuario);

router.get('/usuario/:nombre_usuario', paquetesController.obtenerPaquetesPorNombreUsuario);

router.get('/:id_paquete', paquetesController.obtenerPaquetePorId);

router.put('/estado', paquetesController.actualizarEstadoPaquete);

module.exports = router;
