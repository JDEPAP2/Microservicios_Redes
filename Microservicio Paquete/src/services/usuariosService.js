const axios = require('axios');

async function obtenerIdUsuarioPorNombre(nombre_usuario) {
  try {
    const response = await axios.get(`http://localhost:3001/usuarios/${nombre_usuario}`);
    return response.data.id_usuario;
  } catch (error) {
    throw new Error('No se pudo obtener el id_usuario');
  }
}

async function validarUsuario(id_usuario) {
  try {
    const response = await axios.get(`http://localhost:3001/usuarios/id/${id_usuario}`);
    return response.data?.rol == "administrador";
  } catch (error) {
    throw new Error('No se pudo obtener el usuario');
  }
}

module.exports = { obtenerIdUsuarioPorNombre, validarUsuario };
