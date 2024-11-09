const connection = require('../config/database');

async function crearPaquete(descripcion, id_usuario, estado) {
  const [result] = await connection.query(
    'INSERT INTO paquetes (descripcion, id_usuario, estado) VALUES (?, ?, ?)',
    [descripcion, id_usuario, estado]
  );
  return {
    id_paquete: result.insertId,
    descripcion,
    id_usuario,
    estado
  };
}

async function obtenerPaquetesPorUsuario(id_usuario) {
  const [rows] = await connection.query(
    'SELECT * FROM paquetes WHERE id_usuario = ?',
    [id_usuario]
  );
  return rows;
}

async function obtenerPaquetePorId(id_paquete) {
  const [rows] = await connection.query(
    'SELECT * FROM paquetes WHERE id_paquete = ?',
    [id_paquete]
  );
  return rows.length ? rows[0] : null;
}

async function actualizarEstadoPaquete(id_paquete, nuevo_estado) {
  const [result] = await connection.query(
    'UPDATE paquetes SET estado = ? WHERE id_paquete = ?',
    [nuevo_estado, id_paquete]
  );
  return result;
}

module.exports = {
  crearPaquete,
  obtenerPaquetesPorUsuario,
  obtenerPaquetePorId,
  actualizarEstadoPaquete
};
