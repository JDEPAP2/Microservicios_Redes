const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const userRoutes = require('./routes/usuariosRoutes');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/usuarios', userRoutes);

app.listen(3001, () => {
  console.log('Microservicio Usuarios ejecutándose en el puerto 3001');
});