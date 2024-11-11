require('dotenv').config({ path: '../.env' });
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const paquetesRoutes = require('./routes/paquetesRoutes');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/paquetes', paquetesRoutes);

const PORT = process.env.DB_PAQUETES_PORT || 3002;
app.listen(PORT, () => {
  console.log(`Microservicio Paquetes ejecutándose en el puerto ${PORT}`);
});
