const axios = require('axios');

async function enviarNotificacion(notificacionData) {
  try {
    const response = await axios.post(`http://localhost:3003/notificaciones/`, notificacionData);
    return response.data;
  } catch (error) {
    console.error('Error al enviar notificación:', error?.message);
    throw error;
  }
}


async function obtenerNotificacionesPorPaquete(paqueteId) {
  try {
    const response = await axios.get(`http://localhost:3003/notificaciones/paquete/${paqueteId}`);
    return response.data;
  } catch (error) {
    console.error('Error al recibir notificaciónes', error?.message);
    throw error;
  }
}

module.exports = { enviarNotificacion, obtenerNotificacionesPorPaquete };