const usuariosModel = require('../models/usuariosModel');

async function verificarAdministrador(req, res, next) {
  const { usuario, password } = req.body;

  try {
    const result = await usuariosModel.validarUsuario(usuario, password);
    if (result.length > 0 && result[0].rol === 'administrador') {
      next();
    } else {
      res.status(403).json({ error: 'Acceso denegado: se requiere rol de administrador' });
    }
  } catch (error) {
    console.error('Error al verificar rol de administrador:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = verificarAdministrador;
