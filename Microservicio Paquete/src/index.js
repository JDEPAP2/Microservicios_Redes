const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const paquetesRoutes = require('./routes/paquetesRoutes');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/paquetes', paquetesRoutes);

app.listen(3002, () => {
  console.log(`Microservicio Paquetes ejecutándose en el puerto 3002`);
});
