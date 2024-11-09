const usuariosModel = require('../models/usuariosModel');

async function login(req, res) {
  const { usuario, password } = req.body;
  try {
    const result = await usuariosModel.validarUsuario(usuario, password);
    if (result.length > 0) {
      res.json({ id_usuario: result[0].id_usuario, rol: result[0].rol });
    } else {
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error('Error al validar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async function obtenerUsuario(req, res) {
  const usuario = req.params.id;
  try {
    const result = await usuariosModel.obtenerUsuarioPorId(usuario);
    if (result.length > 0) {
      res.json({ id_usuario: result[0].id_usuario, rol: result[0].rol });
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async function obtenerUsuarioPorNombre(req, res) {
  const usuario = req.params.usuario;
  try {
    const result = await usuariosModel.obtenerUsuarioPorNombre(usuario);
    if (result.length > 0) {
      res.json({ id_usuario: result[0].id_usuario, rol: result[0].rol });
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async function crearUsuario(req, res) {
  const { nombre_completo, nuevo_usuario, nuevo_password, nuevo_rol } = req.body;
  try {
    const usuarioExistente = await usuariosModel.obtenerUsuarioPorNombre(nuevo_usuario);
    if (usuarioExistente.length > 0) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }
    await usuariosModel.crearUsuario(nombre_completo, nuevo_usuario, nuevo_password, nuevo_rol);
    res.status(201).json({ mensaje: 'Usuario creado exitosamente' });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = {
  login,
  obtenerUsuario,
  obtenerUsuarioPorNombre,
  crearUsuario,
};
