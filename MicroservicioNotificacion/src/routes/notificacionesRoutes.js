const express = require('express');
const router = express.Router();
const notificacionesController = require('../controllers/notificacionesController');

router.post('/', notificacionesController.crearNotificacion);

router.get('/usuario/:id_usuario', notificacionesController.obtenerNotificacionesPorUsuario);

router.get('/:id_notificacion', notificacionesController.obtenerNotificacionPorId);

router.get('/paquete/:id_paquete', notificacionesController.obtenerNotificacionesPorPaquete);

module.exports = router;