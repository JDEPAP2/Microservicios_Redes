require('dotenv').config({ path: '../.env' });
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const notificacionesRoutes = require('./routes/notificacionesRoutes');

app.use(cors())
app.use(morgan('dev'));
app.use(express.json());

app.use('/notificaciones', notificacionesRoutes);

const PORT = process.env.DB_NOTIFICACIONES_PORT || 3003;
app.listen(PORT, () => {
  console.log(`Microservicio Notificaciones ejecutándose en el puerto ${PORT}`);
});
