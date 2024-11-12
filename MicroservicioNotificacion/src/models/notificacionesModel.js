const connection = require('../config/database');

async function crearNotificacion(id_paquete, id_usuario, estado, fecha_hora) {
  const [result] = await connection.query(
    'INSERT INTO notificaciones (id_paquete, id_usuario, estado, fecha_hora) VALUES (?, ?, ?, ?)',
    [id_paquete, id_usuario, estado, fecha_hora]
  );
  return result;
}

async function obtenerNotificacionesPorUsuario(id_usuario) {
  const [rows] = await connection.query(
    'SELECT * FROM notificaciones WHERE id_usuario = ? ORDER BY fecha_hora DESC',
    [id_usuario]
  );
  return rows;
}

async function obtenerNotificacionPorId(id_notificacion) {
  const [rows] = await connection.query(
    'SELECT * FROM notificaciones WHERE id_notificacion = ?',
    [id_notificacion]
  );
  return rows.length ? rows[0] : null;
}

async function obtenerNotificacionesPorPaquete(id_paquete) {
  const [rows] = await connection.query(
    'SELECT * FROM notificaciones WHERE id_paquete = ? ORDER BY fecha_hora DESC',
    [id_paquete]
  );
  return rows;
}

module.exports = {
  crearNotificacion,
  obtenerNotificacionesPorUsuario,
  obtenerNotificacionPorId,
  obtenerNotificacionesPorPaquete
};
