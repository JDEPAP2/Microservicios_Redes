const notificacionesModel = require('../models/notificacionesModel');

async function crearNotificacion(req, res) {
  const { id_paquete, id_usuario, estado, fecha_hora } = req.body;

  try {
    const result = await notificacionesModel.crearNotificacion(id_paquete, id_usuario, estado, fecha_hora);
    res.status(201).json({ mensaje: 'Notificación creada exitosamente', result });
  } catch (error) {
    console.error('Error al crear notificación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async function obtenerNotificacionesPorUsuario(req, res) {
  const id_usuario = req.params.id_usuario;

  try {
    const notificaciones = await notificacionesModel.obtenerNotificacionesPorUsuario(id_usuario);
    if (notificaciones.length > 0) {
      res.json(notificaciones);
    } else {
      res.status(404).json({ mensaje: 'No se encontraron notificaciones para el usuario' });
    }
  } catch (error) {
    console.error('Error al obtener notificaciones por usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async function obtenerNotificacionPorId(req, res) {
  const id_notificacion = req.params.id_notificacion;

  try {
    const notificacion = await notificacionesModel.obtenerNotificacionPorId(id_notificacion);
    if (notificacion) {
      res.json(notificacion);
    } else {
      res.status(404).json({ mensaje: 'Notificación no encontrada' });
    }
  } catch (error) {
    console.error('Error al obtener notificación por id:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async function obtenerNotificacionesPorPaquete(req, res) {
  const id_paquete = req.params.id_paquete;

  try {
    const notificaciones = await notificacionesModel.obtenerNotificacionesPorPaquete(id_paquete);
    if (notificaciones.length > 0) {
      res.json(notificaciones);
    } else {
      res.status(404).json({ mensaje: 'No se encontraron notificaciones para el paquete' });
    }
  } catch (error) {
    console.error('Error al obtener notificaciones por paquete:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = {
  crearNotificacion,
  obtenerNotificacionesPorUsuario,
  obtenerNotificacionPorId,
  obtenerNotificacionesPorPaquete
};
