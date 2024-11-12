require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const userRoutes = require('./routes/usuariosRoutes');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/usuarios', userRoutes);

const PORT = process.env.DB_USUARIOS_PORT || 3001;
app.listen(PORT, () => {
  console.log(`Microservicio Usuarios ejecutándose en el puerto ${PORT}`);
});