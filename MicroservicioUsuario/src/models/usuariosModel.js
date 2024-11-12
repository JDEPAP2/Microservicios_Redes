const mysql = require('mysql2/promise');
const connection = require('../config/database');

async function validarUsuario(usuario, password) {
  const [rows] = await connection.query(
    'SELECT id_usuario, rol FROM usuarios WHERE usuario = ? AND password = ?',
    [usuario, password]
  );
  return rows;
}

async function obtenerUsuarios() {
  const [rows] = await connection.query(
    'SELECT * FROM usuarios');
  return rows;
}

async function obtenerUsuarioPorId(id) {
  const [rows] = await connection.query(
    'SELECT id_usuario, rol FROM usuarios WHERE id_usuario = ?',
    [id]
  );
  return rows;
}

async function obtenerUsuarioPorNombre(usuario) {
  const [rows] = await connection.query(
    'SELECT id_usuario, rol FROM usuarios WHERE usuario = ?',
    [usuario]
  );
  return rows;
}

async function crearUsuario(nombre_completo, usuario, password, rol) {
  await connection.query(
    'INSERT INTO usuarios (nombre_completo, usuario, password, rol) VALUES (?, ?, ?, ?)',
    [nombre_completo, usuario, password, rol]
  );
  return (await obtenerUsuarioPorNombre(usuario))[0].id_usuario
}

module.exports = {
  validarUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  obtenerUsuarioPorNombre,
  crearUsuario
};
