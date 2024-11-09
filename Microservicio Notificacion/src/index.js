const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const notificacionesRoutes = require('./routes/notificacionesRoutes');

app.use(cors())
app.use(morgan('dev'));
app.use(express.json());

app.use('/notificaciones', notificacionesRoutes);

app.listen(3003, () => {
  console.log(`Microservicio Notificaciones ejecutándose en el puerto 3003`);
});
