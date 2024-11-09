const paquetesModel = require('../models/paquetesModel');
const usuariosService = require('../services/usuariosService');
const notificacionesService = require('../services/notificacionesService');

const ESTADOS_PERMITIDOS = ['creado', 'en transito', 'entregado', 'devuelto'];

async function crearPaquete(req, res) {
  const { descripcion, id_usuario} = req.body;

  try {
    const paquete = await paquetesModel.crearPaquete(descripcion, id_usuario, "creado");
    var mensaje = "Paquete creado"

    try {
      await notificacionesService.enviarNotificacion({
        id_paquete: paquete.id_paquete,
        id_usuario,
        estado : "creado",
        fecha_hora: new Date()
      });

      mensaje += " y notificación enviada"
    } catch (error) {
      mensaje += ", pero error en la notificación"
    }

    res.status(201).json({ 
      id_paquete: paquete.id_paquete,
      mensaje });
  } catch (error) {
    console.error('Error al crear paquete:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async function obtenerPaquetesPorIdUsuario(req, res) {
  const id_usuario = req.params.id_usuario;

  try {
    const paquetes = await paquetesModel.obtenerPaquetesPorUsuario(id_usuario);

    if (paquetes.length > 0) {
      res.json(paquetes);
    } else {
      res.status(404).json({ mensaje: 'No se encontraron paquetes para el usuario' });
    }
  } catch (error) {
    console.error('Error al obtener paquetes por id de usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async function obtenerPaquetesPorNombreUsuario(req, res) {
  const nombre_usuario = req.params.nombre_usuario;

  try {
    const id_usuario = (await usuariosService.obtenerIdUsuarioPorNombre(nombre_usuario));
    const paquetes = await paquetesModel.obtenerPaquetesPorUsuario(id_usuario);

    if (paquetes.length > 0) {
      res.json(paquetes);
    } else {
      res.status(404).json({ mensaje: 'No se encontraron paquetes para el usuario' });
    }
  } catch (error) {
    res.status(404).json({ mensaje: 'No se encontraron paquetes para el usuario' });
    console.error('Error al obtener paquetes por nombre de usuario:', error);
  }
}

async function obtenerPaquetePorId(req, res) {
  const id_paquete = req.params.id_paquete;

  try {
    const paquete = await paquetesModel.obtenerPaquetePorId(id_paquete);

    var notificaciones = [];
    if (paquete) {
      try{
        notificaciones = await notificacionesService.obtenerNotificacionesPorPaquete(id_paquete);
      }catch (error){}
      res.json({paquete, notificaciones});
    } else {
      res.status(404).json({ mensaje: 'Paquete no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener paquete por id:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async function actualizarEstadoPaquete(req, res) {
  const { nuevo_estado, id_usuario, id_actualizador, id_paquete } = req.body;

  if (!ESTADOS_PERMITIDOS.includes(nuevo_estado)) {
    return res.status(400).json({ error: 'Estado no válido' });
  }

  try {
    const isRol = await usuariosService.validarUsuario(id_actualizador);
    if (!isRol) {
      return res.status(403).json({ error: 'Acceso denegado: se requiere rol de administrador' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error en la validación' });
  }

  try {
    const result = await paquetesModel.actualizarEstadoPaquete(id_paquete, nuevo_estado);
    var mensaje = 'Estado del paquete actualizado';
    if (result.affectedRows > 0) {
      const paquete = await paquetesModel.obtenerPaquetePorId(id_paquete);
      try {
        await notificacionesService.enviarNotificacion({
          id_paquete,
          id_usuario: paquete?.id_usuario,
          estado: nuevo_estado,
          fecha_hora: new Date()
        });
        mensaje += " y notificación enviada";
      } catch (error) {
        mensaje += ", pero error en la notificación";
      }
      res.json({ mensaje, paquete });
    } else {
      res.status(404).json({ mensaje: 'Paquete no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar estado del paquete:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = {
  crearPaquete,
  obtenerPaquetesPorIdUsuario,
  obtenerPaquetesPorNombreUsuario,
  obtenerPaquetePorId,
  actualizarEstadoPaquete
};