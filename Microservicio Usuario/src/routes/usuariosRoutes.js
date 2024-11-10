const { Router } = require('express');
const router = Router();
const usuariosController = require('../controllers/usuariosController'); // Importa el controlador
const verificarAdministrador = require('../middlewares/verificarAdministrador'); // Importa el middleware

router.post('/login', usuariosController.login);
router.get('/id/:id', usuariosController.obtenerUsuario);
router.get('/:usuario', usuariosController.obtenerUsuarioPorNombre);
router.get('/', usuariosController.obtenerUsuarios);
router.post('/', verificarAdministrador, usuariosController.crearUsuario);

module.exports = router;